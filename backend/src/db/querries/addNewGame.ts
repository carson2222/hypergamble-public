import { Pool } from "pg";

export default function addNewGame(
  pool: Pool,
  userId: number,
  amount: number,
  tokenType: string,
  tokenName: string,
  gameType: string,
  bot_msg1: string,
  img1: string | null,
  multiplier: number
) {
  return pool.query(
    "INSERT INTO games (user_id, amount, token_type, token_name, game_type, status, bot_msg1, img1, multiplier) VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7, $8) RETURNING *",
    [userId, amount, tokenType, tokenName, gameType, bot_msg1, img1, multiplier]
  );
}
