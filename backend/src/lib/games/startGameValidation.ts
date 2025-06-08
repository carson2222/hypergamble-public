import { gameNames } from "../../types/games.js";
import { perpTokens, spotTokens, tokensMinMax } from "../../data/tokens.js";

export default function startGameValidation(
  type?: string,
  amount?: number,
  session?: string,
  tokenType?: string,
  tokenName?: string
) {
  if (!type || !amount || !session || !tokenType || !tokenName) return "Missing body parameters";

  if (!gameNames.includes(type)) return "Game type not found";

  if (tokenType?.toLowerCase() !== "spot" && tokenType?.toLowerCase() !== "perp") return "Invalid token type";

  if (tokenType?.toLowerCase() === "spot" && !spotTokens.includes(tokenName)) return "Invalid spot token name";

  if (tokenType?.toLowerCase() === "perp" && !perpTokens.includes(tokenName)) return "Invalid perp token name";

  if (amount < tokensMinMax[tokenName].min) return `Amount must be greater than ${tokensMinMax[tokenName].min}`;
  if (amount > tokensMinMax[tokenName].max) return `Amount must be less than ${tokensMinMax[tokenName].max}`;
}
