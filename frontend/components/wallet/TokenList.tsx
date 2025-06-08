import { Loader } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function TokenList({ title, tokens, userBalance, isLoading }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-300 mb-4">{title}</h3>
      <div className="space-y-3">
        {tokens.map((token) => {
          const tokensOwned = userBalance?.find((t) => t.name === token)?.amount || 0;
          return (
            <div className="flex items-center justify-between p-3 bg-primary rounded-lg" key={`${title}-${token}`}>
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${token?.toLowerCase()}.png`}
                  alt={token}
                  width={32}
                  height={32}
                  className={cn("border-2 border-accent rounded-full", tokensOwned === 0 && "grayscale")}
                />
                <span className="font-medium">{token}</span>
              </div>
              <span className="font-mono">
                {isLoading && <Loader className="animate-spin" />}
                {!isLoading && tokensOwned}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
