import TelegramBot from "node-telegram-bot-api";

export function handleAllMessages(bot: TelegramBot) {
  let chatId: number | null = null;
  try {
    bot.on("message", async (msg) => {
      if (msg.text && msg.text.includes("/start")) return;

      chatId = msg.chat.id;

      // Text to be sent with the message
      const messageText = "Write /start for more info!";

      bot.sendMessage(chatId, messageText);
    });
  } catch (error) {
    console.error(error);
    if (chatId) {
      bot.sendMessage(chatId, "Something went wrong");
    }
  }
}
