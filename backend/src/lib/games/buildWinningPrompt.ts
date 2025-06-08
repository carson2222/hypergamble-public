import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GameType, gameTypes } from "../../types/games.js";

export function buildWinningPrompt(
  game: string,
  initMessage: string,
  userInput: string
): ChatCompletionMessageParam[] {
  const gameData = gameTypes.find((el) => el.name === game);

  return [
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: initMessage,
        },
      ],
    },

    {
      role: "user",
      content: [
        {
          type: "text",
          text: userInput,
        },
      ],
    },

    {
      role: "system",
      content: [
        {
          type: "text",
          text: `You are concluding a storytelling game where the user provided a creative response to survive or succeed in a situation. The game mode is: ${
            gameData?.prompt || gameData.displayName
          }. The coin flip result is **successful**.

Your task is to write a simple **happy ending** in 1 sentences that describes how the user's idea saved them or helped them succeed. Make the story engaging and rewarding, while keeping it consistent with the user's response.`,
        },
      ],
    },
  ];
}
