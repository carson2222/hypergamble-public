import { Response, Router } from "express";
import { CustomRequest } from "../../app.js";
import getSessionData from "../../db/querries/getSessionData.js";
import getUserData from "../../db/querries/getUserData.js";
import { User } from "../../types/tables.js";
import getWalletData from "../../db/querries/getWalletData.js";
import transferUSD from "../../lib/hyperlq/transferUSD.js";
import transferAnySPOT from "../../lib/hyperlq/transferAnySPOT.js";
import { gameTypes } from "../../types/games.js";
import getUserPendingGames from "../../db/querries/getUserPendingGames.js";
import endGameValidation from "../../lib/games/endGameValidation.js";
import randomizeWinning from "../../lib/games/randomizeWinning.js";
import calcWonAmount from "../../lib/games/calcWonAmount.js";
import updateGameStatus from "../../db/querries/updateGameStatus.js";
import { finalizeGamePrompt } from "../../lib/games/finalizeGamePrompt.js";
import endPendingGame from "../../db/querries/endPendingGame.js";
import dotenv from "dotenv";
dotenv.config();

async function endGame(req: CustomRequest, res: Response): Promise<Response> {
  console.log("START: endGame");
  const { session, userInput } = req.body;

  // Basic validation
  const dataValidation = endGameValidation(session, userInput);
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
  if (pendingGames.length <= 0)
    return res.status(400).json({ status: false, error: "User doesn't has an active game" });
  const thisGame = pendingGames[0];

  // Load wallet data
  const { rows: walletRows } = await getWalletData(req.pool, sessionRows[0].user_id);
  const pubkey = walletRows[0]?.public_key || null;
  if (!pubkey) return res.status(400).json({ status: false, error: "Failed to load wallet data" });

  const multiplier = gameTypes.find((game) => game.name === thisGame.game_type).multiplier;
  if (!multiplier || multiplier <= 1) return res.status(400).json({ status: false, error: "Invalid game type" });

  const didUserWon = randomizeWinning(multiplier);
  const vaultPrivKey = process.env.VAULT_PRIV_KEY;

  // Withdraw balance from vault to user
  if (didUserWon) {
    if (thisGame.token_type === "perp" && thisGame.token_name === "USDC") {
      const transferRes = await transferUSD(vaultPrivKey, pubkey, calcWonAmount(thisGame.amount, multiplier));

      if (!transferRes.data?.status || transferRes.data?.status === "err") {
        const errMessage = transferRes.data.response || "Failed to transfer withdraw perp balance from Vault";
        throw new Error(errMessage);
      }
    } else if (thisGame.token_type === "spot") {
      const transferRes = await transferAnySPOT(
        vaultPrivKey,
        pubkey,
        calcWonAmount(thisGame.amount, multiplier),
        thisGame.token_name
      );
      if (!transferRes.data?.status || transferRes.data?.status === "err") {
        const errMessage = transferRes.data.response || "Failed to transfer withdraw spot balance from Vault";
        throw new Error(errMessage);
      }
    } else {
      return res.status(400).json({ status: false, error: "Invalid token type" });
    }
    console.log("SUCCESSFUL: transfer balance from vault to user");
  }

  await updateGameStatus(req.pool, thisGame.id, didUserWon ? "won" : "lost");

  // Finalize game
  const { finalMessage, finalImg } = await finalizeGamePrompt(
    thisGame.game_type,
    thisGame.bot_msg1,
    userInput,
    didUserWon
  );

  const { rows } = await endPendingGame(req.pool, thisGame.id, userInput, finalMessage, finalImg);

  if (rows.length === 0) {
    throw new Error("Failed to finalize");
  }

  console.log("END: endGame");
  return res.json(rows[0]);
}

export function endGameRoute(router: Router): void {
  router.post("/endGame", async (req, res) => {
    try {
      await endGame(req as CustomRequest, res);
    } catch (error) {
      console.error("error.message", error.message);
      res.status(500).json({ status: false, error: error?.message || error });
    }
  });
}
