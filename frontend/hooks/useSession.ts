import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { User } from "@/lib/types";

export default function useSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("session_token")) {
      setIsLoading(true);

      const expiresAtParam = searchParams.get("expires_at");
      const expiresAt = expiresAtParam ? new Date(+expiresAtParam) : undefined;
      setCookie("session_token", searchParams.get("session_token")!, { expires: expiresAt });
    }
  }, [searchParams, setCookie]);

  useEffect(() => {
    if (!cookies.session_token) {
      setIsLoading(false);
      setUser(null);
    }

    if (cookies.session_token) {
      async function validateSession() {
        const res = await axios.get(BACKEND_URL + "validateSession", {
          params: { session_token: cookies.session_token },
        });
        return res.data;
      }

      try {
        (async () => {
          const data = await validateSession();
          if (!data.status) {
            throw new Error(data.error);
          }

          setUser(data.data.user);
          setPubkey(data.data.wallet);
          setIsLoading(false);

          const redirect = searchParams.get("redirect");

          if (redirect) {
            router.push(redirect);
          }
        })();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setUser(null);
      }
    }
  }, [cookies.session_token, router, searchParams]);

  return { isLoading, user, pubkey };
}
