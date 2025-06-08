import { initBot } from "./telegram/bot.js";
import { Request } from "express";
import { createPool, initDB } from "./db/db.js";
import { Pool } from "pg";
import { initServer } from "./server/server.js";
import { PORT } from "./data/constants.js";

export interface CustomRequest extends Request {
  pool: Pool;
}

async function main() {
  const pool = await createPool();
  initDB(pool);
  initBot(pool);

  initServer(pool, PORT);
}
main();
