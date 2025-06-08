import { Pool } from "pg";
import getWalletPubkey from "../../db/querries/getWalletPubkey.js";

export default async function loadWalletFromUser(pool: Pool, userId: number): Promise<string> {
  const { rows } = await getWalletPubkey(pool, userId);

  const pubkey = rows[0]?.public_key || null;
  if (typeof pubkey !== "string") throw new Error("Returned public key value is not a string");

  return pubkey;
}
