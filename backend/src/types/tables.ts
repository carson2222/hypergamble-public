export interface User {
  id: number;
  created_at: Date;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
}

export interface Game {
  id: number; // SERIAL
  user_id: number; // NUMERIC
  created_at: string; // TIMESTAMP (stored as ISO 8601 string in most drivers)
  amount: number; // NUMERIC
  tokenType: string; // TEXT
  tokenName: string; // TEXT
  gameType: string; // TEXT
  status: "pending" | "won" | "lost"; // TEXT
  bot_msg1?: string | null; // TEXT (nullable)
  bot_msg2?: string | null; // TEXT (nullable)
  user_msg1?: string | null; // TEXT (nullable)
  img1?: string | null; // TEXT (nullable)
  img2?: string | null; // TEXT (nullable)
  multiplier: number;
}

export interface Session {
  id: number; // SERIAL PRIMARY KEY
  user_id: number; // NUMERIC NOT NULL
  token: string; // TEXT NOT NULL UNIQUE
  created_at: string; // TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  expires_at: string; // TIMESTAMP NOT NULL
  is_valid: boolean; // BOOLEAN NOT NULL DEFAULT TRUE
}
