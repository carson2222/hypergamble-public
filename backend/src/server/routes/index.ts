import express from "express";
import { validateSessionRoute } from "./validateSession.js";
import { startGameRoute } from "./startGame.js";
import { staticFilesRoute } from "./staticFiles.js";
import { endGameRoute } from "./endGame.js";
import { withdrawFundsRoute } from "./withdrawFunds.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json("Hello World");
});

validateSessionRoute(router);

startGameRoute(router);

staticFilesRoute(router);

endGameRoute(router);

withdrawFundsRoute(router);

export default router;
