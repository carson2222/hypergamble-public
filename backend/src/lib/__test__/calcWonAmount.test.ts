import calcWonAmount from "../games/calcWonAmount.js";

describe("calcWonAmount", () => {
  it("should calculate the correct won amount with a given multiplier", () => {
    const amount = 100;
    const multiplier = 2;
    const result = calcWonAmount(amount, multiplier);
    expect(result).toBe(198);
  });

  it("should return 0 if the amount is 0", () => {
    const amount = 0;
    const multiplier = 2;
    const result = calcWonAmount(amount, multiplier);
    expect(result).toBe(0);
  });

  it("should return 0 if the multiplier is 0", () => {
    const amount = 100;
    const multiplier = 0;
    const result = calcWonAmount(amount, multiplier);
    expect(result).toBe(0);
  });

  it("should handle negative amounts correctly", () => {
    const amount = -100;
    const multiplier = 2;
    const result = calcWonAmount(amount, multiplier);
    expect(result).toBe(-198);
  });

  it("should handle negative multipliers correctly", () => {
    const amount = 100;
    const multiplier = -2;
    const result = calcWonAmount(amount, multiplier);
    expect(result).toBe(-198);
  });
});
