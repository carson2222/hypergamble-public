// Return true if the player wins
export default function randomizeWinning(multiplier: number) {
  const playerChance = 100 / multiplier;
  const randomValue = Math.random() * 100;
  return randomValue < playerChance;
}
