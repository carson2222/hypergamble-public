import { Response, Router } from "express";
import { CustomRequest } from "../../app.js";
import { VAULT } from "../../data/constants.js";
import startGameValidation from "../../lib/games/startGameValidation.js";
import getSessionData from "../../db/querries/getSessionData.js";
import getUserData from "../../db/querries/getUserData.js";
import { User } from "../../types/tables.js";
import getWalletBalance from "../../lib/hyperlq/getWalletBalance.js";
import getWalletData from "../../db/querries/getWalletData.js";
import transferUSD from "../../lib/hyperlq/transferUSD.js";
import transferAnySPOT from "../../lib/hyperlq/transferAnySPOT.js";
import { gameTypes } from "../../types/games.js";
import addNewGame from "../../db/querries/addNewGame.js";
import getUserPendingGames from "../../db/querries/getUserPendingGames.js";
import { initializeGamePrompt } from "../../lib/games/initializeGamePrompt.js";

async function startGame(req: CustomRequest, res: Response): Promise<Response> {
  console.log("START: startGame");
  let { type, amount, session, tokenType, tokenName } = req.body;
  tokenType = tokenType?.toLowerCase();

  // Basic validation
  const dataValidation = startGameValidation(type, amount, session, tokenType, tokenName);
  if (dataValidation) return res.status(400).json({ status: false, error: dataValidation });

  // Session validation
  const { rows: sessionRows } = await getSessionData(req.pool, session as string);
  const sessionData = sessionRows[0];
  if (sessionRows.length === 0 || !sessionData.is_valid || sessionData.expires_at < new Date()) {
    return res.status(400).json({ status: false, error: "Invalid session token" });
  }

  // Load user data
  const { rows: userRows } = await getUserData(req.pool, sessionRows[0].user_id);
  const userData = userRows[0] as User;
  if (userRows.length === 0) {
    return res.status(400).json({ status: false, error: "Failed to load user data" });
  }

  // Check if user has an active game
  const { rows: pendingGames } = await getUserPendingGames(req.pool, userData.id);
  if (pendingGames.length > 0) return res.status(400).json({ status: false, error: "User has an active game" });

  // Load wallet data
  const { rows: walletRows } = await getWalletData(req.pool, sessionRows[0].user_id);
  const pubkey = walletRows[0]?.public_key || null;
  const privkey = walletRows[0]?.private_key || null;
  if (!pubkey || !privkey) return res.status(400).json({ status: false, error: "Failed to load wallet data" });

  // Load wallet balance
  const walletBalance = await getWalletBalance(pubkey);

  // Check if user can afford the bet
  const chosenTokenBalance = walletBalance.find((token) => token.name === tokenName && token.type === tokenType);
  if (!chosenTokenBalance || chosenTokenBalance.amount < amount) {
    return res.status(400).json({ status: false, error: "Not enough balance" });
  }

  // Transfer balance to vault
  if (tokenType === "perp" && tokenName === "USDC") {
    const transferRes = await transferUSD(privkey, VAULT, amount);

    if (!transferRes.data?.status || transferRes.data?.status === "err") {
      throw new Error("Failed to transfer perp balance to vault");
    }
  } else if (tokenType === "spot") {
    const transferRes = await transferAnySPOT(privkey, VAULT, amount, tokenName);
    if (!transferRes.data?.status || transferRes.data?.status === "err") {
      throw new Error("Failed to transfer spot balance to vault");
    }
  } else {
    return res.status(400).json({ status: false, error: "Invalid token type" });
  }
  console.log("SUCCESSFUL: transfer balance to vault");

  const thisGameType = gameTypes.find((game) => game.name === type);
  if (!thisGameType) return res.status(400).json({ status: false, error: "Game type not found" });

  // Create game
  const { initMessage, initImg } = await initializeGamePrompt(thisGameType);

  const { rows } = await addNewGame(
    req.pool,
    sessionData.user_id,
    amount,
    tokenType,
    tokenName,
    type,
    initMessage,
    initImg,
    thisGameType.multiplier
  );

  if (rows.length === 0) {
    throw new Error("Failed to create game");
  }

  console.log("END: startGame");
  return res.json(rows[0]);
}

export function startGameRoute(router: Router): void {
  router.post("/startGame", async (req, res) => {
    try {
      await startGame(req as CustomRequest, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error });
    }
  });
}
