import { useEffect, useState } from "react";
import loadUserBalance, { UserBalance } from "@/lib/loadUserBalance";
import isUserBalanceEmpty from "@/lib/isUserBalanceEmpty";

export default function useUserBalance(pubkey: string | null) {
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pubkey) return;

    (async () => {
      const data = await loadUserBalance(pubkey);
      if (!data) return;
      setUserBalance(data);
      setIsLoading(false);
    })();
  }, [pubkey]);

  const isBalanceEmpty = isUserBalanceEmpty(userBalance);

  return { userBalance, isBalanceEmpty, isLoading };
}
