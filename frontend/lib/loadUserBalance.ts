import axios from "axios";

export const perpTokens = ["USDC"];
export const spotTokens = ["USDC", "HYPE"];

export type token = {
  name: string;
  amount: number;
};
export interface UserBalance {
  address: string;
  perp: token[];
  spot: token[];
}

export default async function loadUserBalance(address: string | null) {
  if (!address) {
    return null;
  }
  try {
    const { data: perpData } = await axios.post("https://api.hyperliquid.xyz/info", {
      type: "clearinghouseState",
      user: address,
    });

    if (!perpData) {
      throw new Error("Failed loading perp data");
    }

    const { data: spotData } = await axios.post("https://api.hyperliquid.xyz/info", {
      type: "spotClearinghouseState",
      user: address,
    });

    if (!spotData) {
      throw new Error("Failed loading spot data");
    }

    const spots: token[] = spotTokens.map((tokenName) => {
      return {
        name: tokenName,
        amount: +spotData.balances.filter((balance) => balance.coin === tokenName)?.[0]?.total || 0,
      };
    });

    const userBalance: UserBalance = {
      address,
      perp: [
        {
          name: "USDC",
          amount: +perpData?.withdrawable || 0,
        },
      ],
      spot: spots,
    };

    return userBalance;
  } catch (error) {
    console.error(error);
    return null;
  }
}
