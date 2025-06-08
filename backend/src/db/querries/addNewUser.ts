import { Pool } from "pg";
import { User } from "../../types/tables.js";

export default function addNewUser(pool: Pool, data: User) {
  return pool.query(
    "INSERT INTO users (id, username, first_name, last_name, language_code) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.id, data.username || null, data.first_name || null, data.last_name || null, data.language_code || null]
  );
}
