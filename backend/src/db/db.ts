import { Pool as PoolType } from "pg";
import pg from "pg";
import createTables from "./createTables.js";
const { Pool } = pg;

export function createPool() {
  validateEnv();
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const port = parseInt(process.env.DB_PORT, 10);

  const pool = new Pool({
    host,
    database,
    user,
    password,
    port,
  });

  return pool;
}

export async function initDB(pool: PoolType) {
  await createTables(pool);
}

function validateEnv() {
  const requiredEnvVars = ["DB_HOST", "DB_DATABASE", "DB_USER", "DB_PASSWORD", "DB_PORT"];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}
