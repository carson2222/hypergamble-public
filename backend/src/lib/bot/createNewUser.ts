import { Pool } from "pg";
import addNewUser from "../../db/querries/addNewUser.js";
import { User } from "../../types/tables.js";
import { NewUser } from "../../types/lib/bot.js";

export default async function createNewUser(pool: Pool, data: NewUser): Promise<User> {
  const newUserData = {
    id: data.id,
    first_name: data.first_name || null,
    language_code: data.language_code || null,
    last_name: data.last_name || null,
    username: data.username || null,
  } as User;

  const { rows } = await addNewUser(pool, newUserData);

  return rows[0] as User;
}
