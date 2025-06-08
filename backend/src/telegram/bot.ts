import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { handleStart } from "./handlers/handleStart.js";
import { handleAllMessages } from "./handlers/handleAllMessages.js";
import { Pool } from "pg";

dotenv.config();

export function initBot(pool: Pool) {
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error("Environmental value BOT_TOKEN is missing");

  const bot = new TelegramBot(token, { polling: true });
  handleStart(pool, bot);
  handleAllMessages(bot);
}
