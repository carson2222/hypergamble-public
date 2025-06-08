import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { perpTokens, spotTokens, UserBalance } from "@/lib/loadUserBalance";
import shortenUsername from "@/lib/shortenUsername";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useCookies } from "react-cookie";

export default function BalanceBox({
  isBalanceEmpty,
  userBalance,
  isLoading,
  user,
}: {
  isBalanceEmpty: boolean;
  userBalance: UserBalance | null;
  isLoading: boolean;
  user: User | null;
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
  function handleLogout() {
    removeCookie("session_token");
    window.location.reload();
  }
  return (
    //
    <Card className="bg-[#1a2329] border-[#2a333a] text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base ">
          {shortenUsername(user?.username || user?.first_name || user?.last_name || "User")}
        </h2>

        <div className="flex items-center justify-center gap-2 ">
          <Badge className="text-shadow-xl border-none bg-gradient-to-r from-teal-400 via-fuchsia-400 to-yellow-200  text-white ">
            Points: <span className="font-bold">?</span>
          </Badge>

          <Badge
            className="bg-[#5FE8B1]/10 text-[#5FE8B1]  hover:bg-[#5FE8B1]/20 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Badge>
        </div>
      </div>

      <p className="mb-2">Perp</p>
      <div className="space-y-2">
        {perpTokens.map((tokenName) => {
          const tokenBalance = userBalance?.perp.find((perp) => perp.name === tokenName)?.amount || 0;

          return (
            <div
              key={`PERP-${tokenName}`}
              className="flex items-center justify-between p-2 bg-[#2a333a] rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${tokenName.toLocaleLowerCase()}.png`}
                  alt={tokenName}
                  width={24}
                  height={24}
                  className={cn("border border-[#5FE8B1] rounded-full", tokenBalance === 0 && "grayscale")}
                />
                <span>{tokenName}</span>
              </div>
              <p className="font-mono">
                {isLoading ? <Loader className="animate-spin" size={15} /> : tokenBalance.toFixed(4)}
              </p>
            </div>
          );
        })}
      </div>

      <p className="my-2">Spot</p>

      <div className="space-y-2">
        {spotTokens.map((tokenName) => {
          const tokenBalance = userBalance?.spot.find((spot) => spot.name === tokenName)?.amount || 0;

          return (
            <div
              key={`SPOT-${tokenName}`}
              className="flex items-center justify-between p-2 bg-[#2a333a] rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${tokenName.toLocaleLowerCase()}.png`}
                  alt={tokenName}
                  width={24}
                  height={24}
                  className={cn("border border-[#5FE8B1] rounded-full", tokenBalance === 0 && "grayscale")}
                />
                <span>{tokenName}</span>
              </div>
              <p className="font-mono">
                {isLoading ? <Loader className="animate-spin" size={15} /> : tokenBalance.toFixed(4)}
              </p>
            </div>
          );
        })}
      </div>

      <Button
        className={cn(
          "w-full bg-[#2a333a] text-white hover:bg-[#2a333a]/75 mt-4",
          isBalanceEmpty &&
            !isLoading &&
            "bg-red-400 border-2 border-red-600 text-black hover:bg-red-400/75 animate-pulse"
        )}
        onClick={() => {
          window.location.href = "/wallet";
        }}
      >
        Wallet Management
      </Button>
    </Card>
  );
}
