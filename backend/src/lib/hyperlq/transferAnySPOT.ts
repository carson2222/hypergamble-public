import axios from "axios";
import { signUserSignedAction } from "../../hyperlqSDK/index.js";
import { Wallet } from "ethers";
import { spotTokenContracts } from "../../data/tokens.js";

export default async function transferAnySPOT(
  privkey: string,
  destination: string,
  amount: number,
  tokenName: string
) {
  const now = Date.now();
  const action = {
    type: "spotSend",
    hyperliquidChain: "Mainnet",
    signatureChainId: "0xa4b1",
    destination,
    token: `${tokenName}:${spotTokenContracts[tokenName]}`,
    amount: amount.toString(),
    time: now,
  };
  const wallet = new Wallet(privkey);
  const sign = await signUserSignedAction(
    wallet,
    action,
    [
      { name: "hyperliquidChain", type: "string" },
      { name: "destination", type: "string" },
      { name: "token", type: "string" },
      { name: "amount", type: "string" },
      { name: "time", type: "uint64" },
    ],
    "HyperliquidTransaction:SpotSend",
    true
  );
  const res = await axios.post("https://api.hyperliquid.xyz/exchange", {
    action,
    nonce: now,
    signature: sign,
  });

  return res;
}
