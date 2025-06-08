import TelegramBot from "node-telegram-bot-api";
import { initBot } from "../bot.js";
import { Pool } from "pg";

jest.mock("node-telegram-bot-api");
jest.mock("pg");

describe("initBot", () => {
  let pool: Pool;
  let bot: TelegramBot;

  beforeEach(() => {
    pool = new Pool();
    bot = new TelegramBot("fake-token", { polling: true });
    (TelegramBot as jest.Mock).mockReturnValue(bot);
  });

  it("should initialize the bot and set up handlers", () => {
    initBot(pool);

    expect(TelegramBot).toHaveBeenCalledWith("fake-token", { polling: true });
    expect(bot.on).toHaveBeenCalledWith("message", expect.any(Function));
  });
});
