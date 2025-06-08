import { UserBalance } from "./loadUserBalance";

export default function isUserBalanceEmpty(userBalance: UserBalance | null) {
  if (!userBalance?.address) return true;

  const perp = userBalance.perp.reduce((acc, curr) => acc + curr.amount, 0);
  const spot = userBalance.spot.reduce((acc, curr) => acc + curr.amount, 0);

  return perp === 0 && spot === 0;
}
