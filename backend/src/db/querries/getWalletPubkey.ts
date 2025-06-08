import { Pool } from "pg";

export default function getWalletPubkey(pool: Pool, userId: number) {
  return pool.query("SELECT public_key FROM wallets WHERE user_id = $1 LIMIT 1", [userId]);
  // return { rows: [{ public_key: "test" }] };
}
