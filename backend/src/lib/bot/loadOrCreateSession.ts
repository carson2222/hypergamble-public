import { Pool } from "pg";
import addNewSession from "../../db/querries/addNewSession.js";
import getSessions from "../../db/querries/getSessions.js";
import generateSessionToken from "../generateSessionToken.js";
import { Session } from "../../types/tables.js";

export default async function loadOrCreateSession(pool: Pool, userId: number): Promise<Session> {
  const { rows } = await getSessions(pool, userId);

  const validSessions = rows.filter((session) => session.is_valid === true && session.expires_at > new Date());

  if (validSessions.length === 0) {
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const {
      rows: [newSession],
    } = await addNewSession(pool, token, expiresAt, userId);
    return newSession;
  }

  return validSessions[0] as Session;
}
