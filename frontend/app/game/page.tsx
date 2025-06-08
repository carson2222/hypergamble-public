"use client";
import Header from "@/components/Header";
import GameBox from "@/components/game/GameBox";
import BalanceBox from "@/components/game/BalanceBox";
import StatsBox from "@/components/game/StatsBox";
import useGamePage from "@/hooks/useGamePage";

export default function GamePage() {
  const {
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
  } = useGamePage();

  return (
    <div className="min-h-screen bg-[#0A1116] py-20 px-4">
      <Header />
      <div className=" mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GameBox
              isActive={isGameActive}
              setIsActive={setIsGameActive}
              userBalance={userBalance}
              session={cookies.session_token || ""}
              isLoading={isLoading}
              games={games}
              setGames={setGames}
              updateBalance={updateBalance}
            />
          </div>
          <div className="space-y-8">
            <BalanceBox
              isBalanceEmpty={isBalanceEmpty}
              userBalance={userBalance}
              isLoading={isLoading}
              user={user}
            />
            <StatsBox games={games} isActive={isGameActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
