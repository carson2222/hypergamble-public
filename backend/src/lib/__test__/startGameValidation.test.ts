import startGameValidation from "../games/startGameValidation.js";
import { gameNames } from "../../types/games.js";
import { perpTokens, spotTokens, tokensMinMax } from "../../data/tokens.js";

describe("startGameValidation", () => {
  it("should return 'Missing body parameters' if any parameter is missing", () => {
    expect(startGameValidation()).toBe("Missing body parameters");
    expect(startGameValidation("type")).toBe("Missing body parameters");
    expect(startGameValidation("type", 10)).toBe("Missing body parameters");
    expect(startGameValidation("type", 10, "session")).toBe("Missing body parameters");
    expect(startGameValidation("type", 10, "session", "spot")).toBe("Missing body parameters");
  });

  it("should return 'Game type not found' if the game type is invalid", () => {
    expect(startGameValidation("invalidType", 10, "session", "spot", "token")).toBe("Game type not found");
  });

  it("should return 'Amount must be greater than min' if the amount is less than the minimum", () => {
    const tokenName = Object.keys(tokensMinMax)[0];
    const minAmount = tokensMinMax[tokenName].min;
    expect(startGameValidation(gameNames[0], minAmount - 1, "session", "spot", tokenName)).toBe(
      `Amount must be greater than ${minAmount}`
    );
  });

  it("should return 'Amount must be less than max' if the amount is greater than the maximum", () => {
    const tokenName = Object.keys(tokensMinMax)[0];
    const maxAmount = tokensMinMax[tokenName].max;
    expect(startGameValidation(gameNames[0], maxAmount + 1, "session", "spot", tokenName)).toBe(
      `Amount must be less than ${maxAmount}`
    );
  });

  it("should return 'Invalid token type' if the token type is invalid", () => {
    expect(startGameValidation(gameNames[0], 10, "session", "invalidType", "token")).toBe("Invalid token type");
  });

  it("should return 'Invalid spot token name' if the spot token name is invalid", () => {
    expect(startGameValidation(gameNames[0], 10, "session", "spot", "invalidToken")).toBe(
      "Invalid spot token name"
    );
  });

  it("should return 'Invalid perp token name' if the perp token name is invalid", () => {
    expect(startGameValidation(gameNames[0], 10, "session", "perp", "invalidToken")).toBe(
      "Invalid perp token name"
    );
  });

  it("should pass validation for valid parameters", () => {
    const validSpotToken = spotTokens[0];
    const validPerpToken = perpTokens[0];
    const validGameType = gameNames[0];
    const validAmount = tokensMinMax[validSpotToken].min;

    expect(startGameValidation(validGameType, validAmount, "session", "spot", validSpotToken)).toBeUndefined();
    expect(startGameValidation(validGameType, validAmount, "session", "perp", validPerpToken)).toBeUndefined();
  });
});
