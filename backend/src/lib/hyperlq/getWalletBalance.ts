import axios from "axios";
import { spotTokens, Token, UserBalance } from "../../data/tokens.js";

export default async function getWalletBalance(address: string) {
  try {
    const { data: perpsReq } = await axios.post("https://api.hyperliquid.xyz/info", {
      type: "clearinghouseState",
      user: address,
    });

    if (!perpsReq) {
      throw new Error("Failed loading perps data");
    }

    const { data: spotReq } = await axios.post("https://api.hyperliquid.xyz/info", {
      type: "spotClearinghouseState",
      user: address,
    });

    if (!spotReq) {
      throw new Error("Failed loading spot data");
    }

    const perpsData: Token = {
      type: "perp",
      name: "USDC",
      amount: +perpsReq.withdrawable || 0,
    };

    const spotData: Token[] = spotTokens.map((name) => {
      const heldAmount = spotReq.balances.find((el) => el.coin === name)?.total || 0;
      return {
        type: "spot",
        name: name,
        amount: +heldAmount,
      };
    });

    const finalData: UserBalance = [perpsData, ...spotData];

    return finalData;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error("Invalid address provided");
    }
    throw error;
  }
}
