export type GameType = {
  name: string;
  displayName: string;
  description: string;
  prompt?: string;
  multiplier: number;
};

export const gameTypes: GameType[] = [
  {
    name: "apocalypse",
    displayName: "Apocalypse",
    description: "lorem ipsum",
    // prompt: "lorem ipsum",
    multiplier: 2,
  },
  {
    name: "zombie",
    displayName: "Zombie",
    description: "lorem ipsum",
    // prompt: "lorem ipsum",
    multiplier: 3,
  },
  {
    name: "kings_quest",
    displayName: "King's Quest",
    description: "lorem ipsum",
    // prompt: "lorem ipsum",
    multiplier: 2.5,
  },
  {
    name: "neon_heist",
    displayName: "Neon Heist",
    description: "lorem ipsum",
    // prompt: "lorem ipsum",
    multiplier: 1.5,
  },
];
export const gameNames = gameTypes.map((game) => game.name);
