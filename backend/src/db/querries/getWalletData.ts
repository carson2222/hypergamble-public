import { Pool } from "pg";

export default function getWalletData(pool: Pool, userId: number) {
  return pool.query("SELECT * FROM wallets WHERE user_id = $1 LIMIT 1", [userId]);
}
