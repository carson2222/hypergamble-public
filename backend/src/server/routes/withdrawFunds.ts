import { Response, Router } from "express";
import getSessionData from "../../db/querries/getSessionData.js";
import { CustomRequest } from "../../app.js";
import getUserData from "../../db/querries/getUserData.js";
import getWalletBalance from "../../lib/hyperlq/getWalletBalance.js";
import getWalletData from "../../db/querries/getWalletData.js";
import transferUSD from "../../lib/hyperlq/transferUSD.js";
import transferAnySPOT from "../../lib/hyperlq/transferAnySPOT.js";

async function withdrawFunds(req: CustomRequest, res: Response): Promise<Response> {
  console.log("START: withdrawFunds");

  let { session, tokenType, tokenName, amount, wallet } = req.body;

  // check session
  if (!session) {
    return res.status(400).json({ status: false, error: "Missing session token" });
  }

  // check withdraw wallet
  if (!wallet) {
    return res.status(400).json({ status: false, error: "Missing withdraw wallet" });
  }

  // load session data from db
  const { rows: sessionRows } = await getSessionData(req.pool, session as string);

  // validate session db data
  if (sessionRows.length === 0 || !sessionRows[0].is_valid || sessionRows[0].expires_at < new Date()) {
    return res.status(400).json({ status: false, error: "Invalid session token" });
  }

  // load user data
  const { rows: userRows } = await getUserData(req.pool, sessionRows[0].user_id);

  // validate user db data
  if (userRows.length === 0) {
    return res.status(400).json({ status: false, error: "Failed to load user data" });
  }

  // load wallet pubkey
  const {
    rows: [walletData],
  } = await getWalletData(req.pool, sessionRows[0].user_id);

  if (!walletData.public_key) {
    return res.status(400).json({ status: false, error: "Failed to load wallet" });
  }
  const userPubkey = walletData.public_key;
  const userPrivkey = walletData.private_key;

  // Check if user has enough token to withdraw
  const userBalances = await getWalletBalance(userPubkey);
  const userSelectedTokenBalance = userBalances.find(
    (balance) =>
      balance.name.toUpperCase() === tokenName.toUpperCase() &&
      balance.type.toUpperCase() === tokenType.toUpperCase()
  ).amount;

  if (amount > userSelectedTokenBalance) {
    return res.status(400).json({ status: false, error: "Not enough funds in your wallet to withdraw" });
  }

  // Transfer balance to user's input wallet
  if (tokenType.toUpperCase() === "PERP" && tokenName.toUpperCase() === "USDC") {
    const transferRes = await transferUSD(userPrivkey, wallet, amount);

    if (!transferRes.data?.status || transferRes.data?.status === "err") {
      throw new Error("Failed to transfer perp balance to vault");
    }
  } else if (tokenType.toUpperCase() === "SPOT") {
    const transferRes = await transferAnySPOT(userPrivkey, wallet, amount, tokenName);
    if (!transferRes.data?.status || transferRes.data?.status === "err") {
      throw new Error("Failed to transfer spot balance to vault");
    }
  } else {
    return res.status(400).json({ status: false, error: "Invalid token type" });
  }

  console.log("END: withdrawFunds");
  return res.json({
    status: true,
  });
}

export function withdrawFundsRoute(router: Router): void {
  router.post("/withdrawFunds", async (req, res) => {
    try {
      await withdrawFunds(req as CustomRequest, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error });
    }
  });
}
