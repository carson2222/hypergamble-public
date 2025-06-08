import initWallet from "../arbitrum/initWallet.js";
import addNewWallet from "../../db/querries/addNewWallet.js";
import { Pool } from "pg";

export default async function createNewWallet(pool: Pool, userId: number): Promise<string> {
  const wallet = initWallet();

  const { rows } = await addNewWallet(pool, userId, wallet.address, wallet.privateKey);

  const pubKey = rows[0].public_key;
  if (typeof pubKey !== "string") throw new Error("Returned public key value is not a string");

  return pubKey;
}
