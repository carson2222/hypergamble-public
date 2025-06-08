import axios from "axios";
import { signUsdTransferAction } from "../../hyperlqSDK/index.js";
import { Wallet } from "ethers";

export default async function transferUSD(privkey: string, destination: string, amount: number) {
  const now = Date.now();
  const action = {
    type: "usdSend",
    hyperliquidChain: "Mainnet",
    signatureChainId: "0xa4b1",
    destination,
    amount: amount.toString(),
    time: now,
  };
  const wallet = new Wallet(privkey);
  const sign = await signUsdTransferAction(wallet, action, true);
  const res = await axios.post("https://api.hyperliquid.xyz/exchange", {
    action,
    nonce: now,
    signature: sign,
  });

  return res;
}
