import * as OpenAI from "openai";
import { buildInitPrompt } from "./buildInitPrompt.js";
import { buildWinningPrompt } from "./buildWinningPrompt.js";
import { buildLosingPrompt } from "./buildLosingPrompt.js";

export async function finalizeGamePrompt(
  gameType: string,
  botMsg1: string,
  userInput: string,
  didUserWon: boolean
) {
  const openai = new OpenAI.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    max_completion_tokens: 1000,
    model: "gpt-4o-mini",
    messages: [
      ...buildInitPrompt(gameType),
      ...(didUserWon
        ? buildWinningPrompt(gameType, botMsg1, userInput)
        : buildLosingPrompt(gameType, botMsg1, userInput)),
    ],
  });
  if (!response || !response.choices[0].message.content) {
    throw new Error("Failed to initialize game");
  }
  const finalMessage = response.choices[0].message.content;

  return { finalMessage, finalImg: null };
}
