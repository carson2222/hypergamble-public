import endGameValidation from "../games/endGameValidation.js";

describe("endGameValidation", () => {
  test('should return "Missing body parameters" if session is missing', () => {
    expect(endGameValidation(undefined, "validInput")).toBe("Missing body parameters");
  });

  test('should return "Missing body parameters" if userInput is missing', () => {
    expect(endGameValidation("validSession", undefined)).toBe("Missing body parameters");
  });

  test('should return "User input must be less than 100 characters" if userInput is too long', () => {
    const longInput = "a".repeat(101);
    expect(endGameValidation("validSession", longInput)).toBe("User input must be less than 100 characters");
  });

  test('should return "User input must be greater than 3 characters" if userInput is too short', () => {
    expect(endGameValidation("validSession", "abc")).toBe("User input must be greater than 3 characters");
  });

  test("should return undefined for valid session and userInput", () => {
    expect(endGameValidation("validSession", "validInput")).toBeUndefined();
  });
});
