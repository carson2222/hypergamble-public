import { Pool } from "pg";

export default function getUserData(pool: Pool, userId: number) {
  return pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [userId]);
}
