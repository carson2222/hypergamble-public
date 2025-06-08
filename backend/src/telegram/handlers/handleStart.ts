import TelegramBot from "node-telegram-bot-api";
import { Pool } from "pg";
import loadUserData from "../../lib/bot/loadUserData.js";
import { User } from "../../types/tables.js";
import createNewUser from "../../lib/bot/createNewUser.js";
import loadOrCreateSession from "../../lib/bot/loadOrCreateSession.js";
import { WEBAPP_URL } from "../../data/constants.js";
import createNewWallet from "../../lib/bot/createNewWallet.js";
import loadWalletFromUser from "../../lib/bot/loadWalletFromUser.js";

export function handleStart(pool: Pool, bot: TelegramBot) {
  let chatId: number | null = null;
  try {
    bot.onText(/\/start/, async (msg) => {
      chatId = msg.chat.id;
      const userId = msg.from.id;
      const isBot = msg.from.is_bot;

      if (isBot) {
        bot.sendMessage(chatId, "Bot can't be logged in.");
        return;
      }

      // Log user
      let userData: User | null = null;
      userData = await loadUserData(pool, userId);
      let walletPubkey: string | null = null;
      let redirect = "game";

      if (!userData) {
        userData = await createNewUser(pool, msg.from);
        if (!userData) throw new Error("Failed to create user");
        walletPubkey = await createNewWallet(pool, userData.id);
        if (!walletPubkey) throw new Error("Failed to create wallet");

        redirect = "wallet";
      }

      walletPubkey = await loadWalletFromUser(pool, userData.id);
      if (!walletPubkey) {
        walletPubkey = await createNewWallet(pool, userData.id);
        if (!walletPubkey) throw new Error("Failed to create wallet");
        redirect = "wallet";
      }

      // Load session
      const session = await loadOrCreateSession(pool, userData.id);

      const url =
        WEBAPP_URL +
          "/?session_token=" +
          session.token +
          "&redirect=" +
          redirect +
          "&expires_at=" +
          new Date(session.expires_at).getTime() || null;

      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch App", // Button for the mini app
                url: url, // Replace with your mini app URL
              },
            ],
          ],
        },
      };

      // Return a logging message
      bot.sendPhoto(
        chatId,
        "https://media.discordapp.net/attachments/963888693570076722/1318310795381182525/bannerHL.png?ex=6761dc1a&is=67608a9a&hm=99492447679c3299b8d5583759bad27f183cdea1e3ed097edba30468f97c0754&=&format=webp&quality=lossless&width=1440&height=480",
        {
          parse_mode: "HTML",
          caption: `You're successfully logged in! Click the link below to go to access the <a href='${url}'>page</a>`,
          reply_markup: options.reply_markup,
        }
      );
    });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Something went wrong " + error.message);
  }
}
