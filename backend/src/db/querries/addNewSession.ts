import { Pool } from "pg";

export default function addNewSession(pool: Pool, token: string, expiresAt: Date, userId: number) {
  return pool.query("INSERT INTO sessions (token, expires_at, user_id) VALUES ($1, $2, $3) RETURNING *", [
    token,
    expiresAt,
    userId,
  ]);
}
