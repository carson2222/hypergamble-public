export type GameMode = {
  name: string;
  value: string;
  multiplier: number;
  description?: string;
};
export type Message = { sender: "user" | "bot"; content: string; status?: "won" | "lost"; endingStory?: boolean };

export interface User {
  id: number;
  created_at: Date;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
}

export type Game = {
  id: number; // SERIAL
  user_id: number; // NUMERIC
  created_at: string; // TIMESTAMP (stored as ISO 8601 string in most drivers)
  amount: number; // NUMERIC
  token_type: string; // TEXT
  token_name: string; // TEXT
  game_type: string; // TEXT
  status: string; // TEXT
  bot_msg1?: string | null; // TEXT (nullable)
  bot_msg2?: string | null; // TEXT (nullable)
  user_msg1?: string | null; // TEXT (nullable)
  img1?: string | null; // TEXT (nullable)
  img2?: string | null; // TEXT (nullable)
  multiplier: number;
};
