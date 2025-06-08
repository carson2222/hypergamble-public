import { Pool } from "pg";

export default function endPendingGame(
  pool: Pool,
  gameId: number,
  userInput: string,
  botMsg: string,
  img: string
) {
  return pool.query("UPDATE games SET user_msg1 = $2, bot_msg2 = $3, img2 = $4 WHERE id = $1 RETURNING *", [
    gameId,
    userInput,
    botMsg,
    img,
  ]);
}
