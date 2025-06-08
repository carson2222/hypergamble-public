import { Request, Response, Router } from "express";
import getSessionData from "../../db/querries/getSessionData.js";
import { CustomRequest } from "../../app.js";
import getUserData from "../../db/querries/getUserData.js";
import getWalletPubkey from "../../db/querries/getWalletPubkey.js";
import getGamesFromUser from "../../db/querries/getGamesFromUser.js";

async function validateSession(req: CustomRequest, res: Response): Promise<Response> {
  // load session param
  const session = req.query.session_token;
  // check session
  if (!session) {
    return res.status(400).json({ status: false, error: "Missing session token" });
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
  } = await getWalletPubkey(req.pool, sessionRows[0].user_id);

  if (!walletData.public_key) {
    return res.status(400).json({ status: false, error: "Failed to load wallet" });
  }

  // load games
  const { rows: gamesData } = await getGamesFromUser(req.pool, sessionRows[0].user_id);

  return res.json({
    status: true,
    data: {
      user: userRows[0],
      session: sessionRows[0],
      wallet: walletData.public_key,
      games: gamesData,
    },
  });
}

export function validateSessionRoute(router: Router): void {
  router.get("/validateSession", async (req, res) => {
    try {
      await validateSession(req as CustomRequest, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error });
    }
  });
}
