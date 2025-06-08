import TelegramBot from "node-telegram-bot-api";
import { handleAllMessages } from "../handlers/handleAllMessages.js";

jest.mock("node-telegram-bot-api");

describe("handleAllMessages", () => {
  let bot: TelegramBot;

  beforeEach(() => {
    jest.clearAllMocks();
    bot = new TelegramBot("fake-token", { polling: true });
    (TelegramBot as jest.Mock).mockReturnValue(bot);
  });

  it("should set up the message handler", () => {
    handleAllMessages(bot);

    expect(bot.on).toHaveBeenCalledWith("message", expect.any(Function));
  });

  it("should send a message when a non-/start message is received", () => {
    handleAllMessages(bot);

    const messageHandler = (bot.on as jest.Mock).mock.calls[0][1];
    const msg = { chat: { id: 123 }, text: "Hello" };

    messageHandler(msg);

    expect(bot.sendMessage).toHaveBeenCalledWith(123, "Write /start for more info!");
  });

  it("should not send a message when a /start message is received", () => {
    handleAllMessages(bot);

    const messageHandler = (bot.on as jest.Mock).mock.calls[0][1];
    const msg = { chat: { id: 123 }, text: "/start" };

    messageHandler(msg);

    expect(bot.sendMessage).not.toHaveBeenCalled();
  });
});
