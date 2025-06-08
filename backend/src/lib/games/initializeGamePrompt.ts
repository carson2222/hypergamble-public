import { GameType } from "../../types/games.js";
import * as OpenAI from "openai";
import dotenv from "dotenv";
import { buildInitPrompt } from "./buildInitPrompt.js";
dotenv.config();

export async function initializeGamePrompt(gameType: GameType) {
  const openai = new OpenAI.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    max_completion_tokens: 1000,
    model: "gpt-4o-mini",
    messages: [...buildInitPrompt(gameType.name)],
  });
  if (!response || !response.choices[0].message.content) {
    throw new Error("Failed to initialize game");
  }
  const initMessage = response.choices[0].message.content;
  // const imageResponse = await openai.images.generate(buildImgPrompt(initMessage));
  const initImg = null;
  // if (imageResponse.data[0].url) {
  //   console.log(imageResponse.data[0].url);
  // } else {
  //   console.log("failed to generate image");
  // }
  return { initMessage, initImg };
}

// `
// You are running a storytelling game based on the user's choices and a 50/50 outcome. The game mode is: Apocalypse.

// Your task is to generate a short dramatic **story introduction** of 1-3 sentences that immerses the player in the chosen game mode. The story must present a tense situation requiring the user to come up with a creative decision to survive or succeed. End the introduction with "What do you do next?" question for the user.
// `

// `
// You are concluding a storytelling game where the user provided a creative response to survive or succeed in a situation. The game mode is: [GAME MODE]. The coin flip result is **successful**.

// Your task is to write a **happy ending** in 3-5 sentences that describes how the user's idea saved them or helped them succeed. Make the story engaging and rewarding, while keeping it consistent with the user's response.

// `
