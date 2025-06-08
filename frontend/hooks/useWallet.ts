import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import loadUserBalance, { UserBalance } from "@/lib/loadUserBalance";
import isUserBalanceEmpty from "@/lib/isUserBalanceEmpty";
import sleep from "@/lib/sleep";
import { BACKEND_URL } from "@/lib/constants";
import { User } from "@/lib/types";

export default function useWallet() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const isBalanceEmpty = useMemo(() => isUserBalanceEmpty(userBalance), [userBalance]);
  const pubkeyContainerRef = useRef<HTMLDivElement>(null);

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

  async function copyPubKey() {
    if (!pubkey) return;

    pubkeyContainerRef.current?.classList.remove("shine-green");
    await sleep(50);
    navigator.clipboard.writeText(pubkey);
    pubkeyContainerRef.current?.classList.add("shine-green");
    toast.success("Public key copied to clipboard!");
  }

  async function validateSession() {
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setUser(null);
      removeCookie("session_token");
      router.replace("/");
    }
  }

  function handleLogout() {
    removeCookie("session_token");
    window.location.reload();
  }

  async function updateBalance() {
    if (!pubkey) return;
    const newBalance = await loadUserBalance(pubkey);
    setUserBalance(newBalance);
  }

  return {
    isLoading,
    user,
    pubkey,
    userBalance,
    isBalanceEmpty,
    copyPubKey,
    handleLogout,
    updateBalance,
    pubkeyContainerRef,
  };
}
