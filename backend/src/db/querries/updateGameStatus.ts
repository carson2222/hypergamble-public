import { Pool } from "pg";

export default function updateGameStatus(pool: Pool, gameId: number, newStatus: "won" | "lost") {
  pool.query("UPDATE games SET status = $2 WHERE id = $1", [gameId, newStatus]);
}
