import { Pool } from "pg";

export default function addNewWallet(pool: Pool, userId: number, pubKey: string, privKey: string) {
  return pool.query(
    "INSERT INTO wallets (user_id, public_key, private_key) VALUES ($1, $2, $3) RETURNING public_key",
    [userId, pubKey, privKey]
  );
  // return { rows: [{ public_key: "test" }] };
}
