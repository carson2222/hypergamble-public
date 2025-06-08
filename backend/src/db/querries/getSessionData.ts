import { Pool } from "pg";

export default function getSessionData(pool: Pool, sessionId: string) {
  return pool.query("SELECT * FROM sessions WHERE token = $1 LIMIT 1", [sessionId]);
}
