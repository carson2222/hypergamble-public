import TokenSelector from "@/components/TokenSelector";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";
import { perpTokens, spotTokens, token, UserBalance } from "@/lib/loadUserBalance";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export default function Withdraw({
  userBalance,
  updateBalance,
}: {
  userBalance: UserBalance | null;
  updateBalance: () => void;
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["session_token"]);
  const [inputAmount, setInputAmount] = useState("");
  const [inputWallet, setInputWallet] = useState("");
  const [selectedToken, setSelectedToken] = useState<string | undefined>(undefined);
  const selectedTokenData = useMemo(() => {
    if (!selectedToken || !userBalance) return null;

    const [type, name] = selectedToken.split("-");
    return userBalance[type.toLocaleLowerCase()].find((token) => token.name === name) as token;
  }, [selectedToken, userBalance]);

  async function withdraw() {
    if (+inputAmount > (selectedTokenData?.amount || 0)) {
      toast.error("You don't have enough tokens");
      return;
    }

    if (inputWallet.length < 10 || !inputWallet.startsWith("0x")) {
      toast.error("Invalid wallet publickey");
      return;
    }

    if (cookies.session_token === undefined) {
      toast.error("You are not logged in");
      return;
    }

    if (!selectedToken) {
      toast.error("Select the token");
      return;
    }
    const [type, name] = selectedToken.split("-");

    if (!type || !name) {
      toast.error("Select the token");
      return;
    }

    const toastId = toast.loading("Withdrawing tokens...");
    try {
      const res = await axios.post(BACKEND_URL + "withdrawFunds", {
        session: cookies.session_token,
        tokenType: type,
        tokenName: name,
        amount: inputAmount,
        wallet: inputWallet,
      });

      toast.success(`Successfully withdrew ${inputAmount} ${name}!`, { id: toastId });
      updateBalance();
    } catch (error) {
      console.error(error);
      toast.error("Error while withdrawing tokens", { id: toastId });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-primary hover:bg-primary-dark text-white w-full mt-2">Withdraw tokens</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondary border border-accent text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Withdraw tokens</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-1">Select the token</p>

            <TokenSelector userBalance={userBalance} setSelectedToken={setSelectedToken} />

            {selectedToken && (
              <>
                <br className="my-2" />

                <Badge
                  className={cn(
                    "bg-accent text-black hover:bg-accent-dark",
                    selectedTokenData?.amount === 0 && "bg-error text-black hover:bg-error-dark"
                  )}
                >
                  Available: <span className="font-bold ml-1">{selectedTokenData?.amount}</span>
                </Badge>
              </>
            )}

            {selectedToken && selectedTokenData?.amount !== 0 && (
              <>
                <p className="mb-1 mt-4">Amount</p>
                <div className="flex">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    className="bg-primary border-primary-dark focus-visible:ring-accent text-white mr-2"
                  />
                </div>
              </>
            )}

            {selectedToken && selectedTokenData?.amount !== 0 && inputAmount && (
              <>
                <p className="mb-1 mt-4">Wallet</p>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Wallet"
                    value={inputWallet}
                    onChange={(e) => setInputWallet(e.target.value)}
                    className="bg-primary border-primary-dark focus-visible:ring-accent text-white mr-2"
                  />
                </div>
              </>
            )}

            {selectedToken && selectedTokenData?.amount !== 0 && inputAmount && inputWallet && (
              <div className="mt-6 bg-primary border border-accent p-3 rounded-lg">
                <p className="text-accent text-sm">
                  If the wallet you are withdrawing to has not been initialized, you can only withdraw USDC and
                  Hyperliquid will take 1$ fee.
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          {selectedToken && selectedTokenData?.amount !== 0 && inputWallet && (
            <Button className="bg-accent text-black hover:bg-accent-dark w-full" onClick={withdraw}>
              Send
            </Button>
          )}
          <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
