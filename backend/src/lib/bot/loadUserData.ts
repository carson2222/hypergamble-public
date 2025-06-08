import { Pool } from "pg";
import getUserData from "../../db/querries/getUserData.js";
import { User } from "../../types/tables.js";

export default async function loadUserData(pool: Pool, userId: number): Promise<User | null> {
  const { rows } = await getUserData(pool, userId);

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as User;
}
