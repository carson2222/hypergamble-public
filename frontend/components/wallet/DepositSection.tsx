import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QRCode from "react-qr-code";
import { docsLink } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function DepositSection({ pubkey, copyPubKey, pubkeyContainerRef }) {
  const router = useRouter();

  return (
    <Card className="p-8 bg-secondary border-primary-dark text-white">
      <h1 className="text-2xl font-bold mb-4">Deposit Hyperliquid tokens</h1>
      <p className="text-gray-300 mb-4">
        Send any of the supported tokens to the wallet below{" "}
        <span className="font-bold">via Hyperliquidity Send.</span>
      </p>
      <p className="text-gray-300 mb-6">
        More info:{" "}
        <a href={docsLink} className="text-accent hover:underline">
          link
        </a>
      </p>

      <div
        className="bg-background p-4 rounded-lg mb-6 break-all font-mono text-sm hover:bg-accent/10 text-accent transition-all cursor-pointer"
        onClick={copyPubKey}
        ref={pubkeyContainerRef}
      >
        {pubkey || "Loading..."}
      </div>

      <div className="hidden md:flex justify-center mb-8">
        <div className="bg-white p-4 rounded-lg inline-block">
          <QRCode value="https://app.hyperliquid.xyz/portfolio" size={125} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          className="bg-primary hover:bg-primary-dark text-white"
          onClick={() => router.push("https://app.hyperliquid.xyz/portfolio")}
        >
          Deposit tokens
        </Button>

        <Button className="bg-accent hover:bg-accent-dark text-black" onClick={() => router.push("/game")}>
          Launch App
        </Button>
      </div>

      <div className="mt-6 bg-primary border border-accent p-4 rounded-lg">
        <p className="text-accent text-sm">
          If it&apos;s your first deposit, Hyperliquid will automatically take 1$ of your balance to initialize the
          account.
        </p>
      </div>
    </Card>
  );
}
