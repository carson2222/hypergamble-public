import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { perpTokens, spotTokens } from "@/lib/loadUserBalance";
import Image from "next/image";
import { cn } from "@/lib/utils";
import TokenList from "./TokenList";
import Withdraw from "./Withdraw";

export default function BalanceSection({ user, userBalance, isLoading, handleLogout, updateBalance }) {
  return (
    <Card className="p-8 bg-secondary border-primary-dark text-white flex flex-col justify-between">
      <div className="">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-2xl font-bold">
            {user?.username || user?.first_name || user?.last_name || "Your"} Balance
          </h2>

          <Badge
            className="bg-accent/10 text-accent mr-4 hover:bg-accent/20 ml-auto cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Badge>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-accent/10 text-accent hover:text-accent mr-4 hover:bg-accent/20 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-8">
          <TokenList
            title="Perp tokens"
            tokens={perpTokens}
            userBalance={userBalance?.perp}
            isLoading={isLoading}
          />
          <TokenList
            title="Spot tokens"
            tokens={spotTokens}
            userBalance={userBalance?.spot}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Withdraw userBalance={userBalance} updateBalance={updateBalance} />
    </Card>
  );
}
