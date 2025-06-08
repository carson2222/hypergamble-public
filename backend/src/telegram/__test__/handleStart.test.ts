import TelegramBot from "node-telegram-bot-api";
import { handleStart } from "../handlers/handleStart.js";
import { Pool } from "pg";

jest.mock("node-telegram-bot-api");
jest.mock("pg");

describe("handleStart", () => {
  let pool: Pool;
  let bot: TelegramBot;

  beforeEach(() => {
    pool = new Pool();
    bot = new TelegramBot("fake-token", { polling: true });
    (TelegramBot as jest.Mock).mockReturnValue(bot);
  });

  it("should set up the /start command handler", () => {
    handleStart(pool, bot);

    expect(bot.onText).toHaveBeenCalledWith(/\/start/, expect.any(Function));
  });
});
