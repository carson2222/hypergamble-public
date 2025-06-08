export const perpTokens = ["USDC"];
export const spotTokens = ["USDC", "HYPE"];
export const spotTokenContracts = {
  USDC: "0x6d1e7cde53ba9467b783cb7c530ce054",
  HYPE: "0x0d01dc56dcaaca66ad901c959b4011ec",
};

export const tokensMinMax = {
  USDC: {
    min: 0.1,
    max: 5,
  },
  HYPE: {
    min: 0.01,
    max: 0.2,
  },
};
export type Token = {
  type: "perp" | "spot";
  name: string;
  amount: number;
};
export type UserBalance = Token[];
