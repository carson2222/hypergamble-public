import { Wallet } from "ethers";

export default function initWallet() {
  console.log("initWallet");

  const wallet = Wallet.createRandom();
  console.log("Generated new wallet: ", wallet.address);

  return wallet;
}
