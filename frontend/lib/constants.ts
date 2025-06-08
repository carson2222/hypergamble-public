import dotenv from "dotenv";
import { GameMode } from "./types";
dotenv.config();

export const docsLink = "https://hypergamble.gitbook.io/docs";
export const xLink = "https://x.com/HyperGambleOnHL";
export const tgLink = "https://t.me/hypergamble_bot?start=null";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "//localhost:5000/";

export const tokenStakeOptions = {
  "PERP-USDC": [0.1, 0.5, 1, 2.5, 5],
  "SPOT-USDC": [0.1, 0.5, 1, 2.5, 5],
  "SPOT-HYPE": [0.01, 0.025, 0.05, 0.1, 0.2],
};

export const gameModes: GameMode[] = [
  {
    value: "neon_heist",
    name: "Neon Heist",
    description: "lorem ipsum",
    multiplier: 1.5,
  },
  {
    value: "apocalypse",
    name: "Apocalypse",
    description: "lorem ipsum",
    multiplier: 2,
  },

  {
    value: "kings_quest",
    name: "King's Quest",
    description: "lorem ipsum",
    multiplier: 2.5,
  },
  {
    value: "zombie",
    name: "Zombie",
    description: "lorem ipsum",
    multiplier: 3,
  },
];
