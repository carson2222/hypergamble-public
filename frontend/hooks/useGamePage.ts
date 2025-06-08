import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import loadUserBalance, { UserBalance } from "@/lib/loadUserBalance";
import isUserBalanceEmpty from "@/lib/isUserBalanceEmpty";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "@/lib/constants";
import { Game, User } from "@/lib/types";

export default function useGamePage() {
  const [isGameActive, setIsGameActive] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const isBalanceEmpty = useMemo(() => isUserBalanceEmpty(userBalance), [userBalance]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (!pubkey) return;

    (async () => {
      setIsLoading(true);
      const data = await loadUserBalance(pubkey);
      if (!data) return;
      setUserBalance(data);
      setIsLoading(false);
    })();
  }, [pubkey]);

  useEffect(() => {
    if (!cookies.session_token) {
      setIsLoading(false);
      setUser(null);
      router.replace("/");
    }

    if (cookies.session_token) {
      validateSession();
    }
  }, [cookies.session_token, router]);

  async function validateSession() {
    setIsLoading(true);
    try {
      const res = await axios.get(BACKEND_URL + "validateSession", {
        params: { session_token: cookies.session_token },
      });

      const data = res.data;
      if (!data.status) {
        throw new Error(data.error);
      }

      setUser(data.data.user);
      setPubkey(data.data.wallet);
      setGames(data.data.games);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setUser(null);
      removeCookie("session_token");
      router.replace("/");
    }
  }

  async function updateBalance() {
    if (!pubkey) return;
    const newBalance = await loadUserBalance(pubkey);
    setUserBalance(newBalance);
  }

  return {
    isGameActive,
    setIsGameActive,
    isLoading,
    user,
    userBalance,
    isBalanceEmpty,
    games,
    cookies,
    updateBalance,
    setGames,
  };
}
