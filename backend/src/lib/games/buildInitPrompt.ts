import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { gameTypes } from "../../types/games.js";

export function buildInitPrompt(game: string): ChatCompletionMessageParam[] {
  const gameData = gameTypes.find((el) => el.name === game);

  return [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: `You are running a storytelling game based on the user's choices. The game mode is: ${
            gameData?.prompt || gameData.displayName
          }.
 
Your task is to generate a simple dramatic **story introduction** of 1 sentences that immerses the player in the chosen game mode. You're using simple and familiar english so anyone will understand. The story must present a tense situation requiring the user to come up with a creative decision to survive or succeed. End the introduction with "What do you do next?" open question for the user without advising on any option.`,
        },
      ],
    },
  ];
}
