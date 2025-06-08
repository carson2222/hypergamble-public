import { Pool } from "pg";

export default async function createTables(pool: Pool) {
  await Promise.all(functions.map((fn) => fn(pool)));
  console.log("tables created");
}

const functions = [createUsersTable, createSessionsTable, createWalletsTable, createGamesTable];

async function createUsersTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id NUMERIC PRIMARY KEY,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(255) NULL,
      first_name VARCHAR(255) NULL,
      last_name VARCHAR(255) NULL,
      language_code VARCHAR(255) NULL
    );
  `);

  console.log("users table created");
}

async function createSessionsTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      user_id NUMERIC NOT NULL,
      token TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL,
      is_valid BOOLEAN NOT NULL DEFAULT TRUE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log("sessions table created");
}

async function createWalletsTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wallets (
      id SERIAL PRIMARY KEY,
      user_id NUMERIC NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      public_key TEXT NOT NULL UNIQUE,
      private_key TEXT NOT NULL UNIQUE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log("wallets table created");
}

async function createGamesTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      user_id NUMERIC NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      amount NUMERIC NOT NULL,
      token_type TEXT NOT NULL,
      token_name TEXT NOT NULL,
      game_type TEXT NOT NULL,
      status TEXT NOT NULL,
      bot_msg1 TEXT,
      bot_msg2 TEXT,
      user_msg1 TEXT,
      img1 TEXT,
      img2 TEXT,
      multiplier NUMERIC NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
}
