import { Pool } from "pg";

export default function getUserPendingGames(pool: Pool, userId: number) {
  return pool.query("SELECT * FROM games WHERE user_id = $1 AND status = 'pending'", [userId]);
}
