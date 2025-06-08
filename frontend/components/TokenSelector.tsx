import { perpTokens, spotTokens, UserBalance } from "@/lib/loadUserBalance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Image from "next/image";

export default function TokenSelector({
  userBalance,
  setSelectedToken,
  defaultValue = undefined,
}: {
  userBalance: UserBalance | null;
  setSelectedToken: (token: string) => void;
  defaultValue?: string | undefined;
}) {
  return (
    <Select onValueChange={setSelectedToken} defaultValue={defaultValue}>
      <SelectTrigger className="bg-[#2a333a] border-[#3a434a] text-white">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        {perpTokens.map((tokenName) => {
          const heldTokens = userBalance?.perp.find((el) => el.name === tokenName)?.amount || 0;

          return (
            <SelectItem value={`PERP-${tokenName}`} key={`PERP-${tokenName}`} className="">
              <div className="flex items-center">
                <Image
                  src={`/tokens/${tokenName.toLocaleLowerCase()}.png`}
                  alt={tokenName}
                  width={15}
                  height={15}
                  className="rounded-full mr-2"
                />
                <span className="text-sm font-medium leading-none">
                  <span className="font-bold">{tokenName}</span> - PERP - {heldTokens.toFixed(4)}
                </span>
              </div>
            </SelectItem>
          );
        })}

        {spotTokens.map((tokenName) => {
          const heldTokens = userBalance?.spot.find((el) => el.name === tokenName)?.amount || 0;

          return (
            <SelectItem value={`SPOT-${tokenName}`} key={`SPOT-${tokenName}`} className="">
              <div className="flex items-center">
                <Image
                  src={`/tokens/${tokenName.toLocaleLowerCase()}.png`}
                  alt={tokenName}
                  width={15}
                  height={15}
                  className="rounded-full mr-2"
                />
                <span className="text-sm font-medium leading-none">
                  <span className="font-bold">{tokenName}</span> - SPOT - {heldTokens.toFixed(4)}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
