"use client";
import Header from "@/components/Header";
import DepositSection from "@/components/wallet/DepositSection";
import BalanceSection from "@/components/wallet/BalanceSection";
import useWallet from "@/hooks/useWallet";

export default function WalletPage() {
  const { isLoading, user, pubkey, userBalance, copyPubKey, handleLogout, updateBalance, pubkeyContainerRef } =
    useWallet();

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <Header />
      <div className="">
        <div className="grid gap-8 md:grid-cols-2">
          <DepositSection pubkey={pubkey} copyPubKey={copyPubKey} pubkeyContainerRef={pubkeyContainerRef} />
          <BalanceSection
            user={user}
            userBalance={userBalance}
            isLoading={isLoading}
            handleLogout={handleLogout}
            updateBalance={updateBalance}
          />
        </div>
      </div>
    </div>
  );
}
