import { Pool } from "pg";

export default function getSessions(pool: Pool, userId: number) {
  return pool.query("SELECT * FROM sessions WHERE user_id = $1", [userId]);
}
