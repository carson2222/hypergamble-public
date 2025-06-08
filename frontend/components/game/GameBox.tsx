import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UserBalance } from "@/lib/loadUserBalance";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import MessageItem from "./MessageItem";
import { BACKEND_URL, gameModes, tokenStakeOptions } from "@/lib/constants";
import toast from "react-hot-toast";
import { Message, Game } from "@/lib/types";
import TokenSelector from "@/components/TokenSelector";
import Headline from "./Headline";

interface GameBoxProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  userBalance: UserBalance | null;
  session: string;
  isLoading: boolean;
  games: Game[];
  setGames: (games: Game[]) => void;
  updateBalance: () => void;
}

export default function GameBox({
  isActive,
  setIsActive,
  userBalance,
  session,
  isLoading,
  games,
  setGames,
  updateBalance,
}: GameBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedToken, setSelectedToken] = useState("PERP-USDC");
  const [stakeAmount, setStakeAmount] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [lastGame, setLastGame] = useState<Game | null>(null);
  const [hasUserSent, setHasUserSent] = useState(false);

  const activeGame = useMemo(() => games.find((game) => game.status === "pending"), [games]);

  const selectedTokenAmount = useMemo(() => {
    if (selectedToken.includes("PERP")) {
      return userBalance?.perp.find((balance) => balance.name === selectedToken.split("-")[1])?.amount || 0;
    } else {
      return userBalance?.spot.find((balance) => balance.name === selectedToken.split("-")[1])?.amount || 0;
    }
  }, [selectedToken, userBalance]);
  const allowedToStart = useMemo(
    () => +stakeAmount > 0 && gameMode && selectedToken,
    [stakeAmount, gameMode, selectedToken]
  );

  const statsData = useMemo(() => {
    if (!activeGame && isActive) return games[games.length - 1];
    if (activeGame) return activeGame;
    return null;
  }, [activeGame, isActive, games]);

  useEffect(() => {
    if (activeGame) {
      setIsActive(true);
      setMessages((curr) => {
        return [{ sender: "bot", content: activeGame.bot_msg1 || "" }];
      });
    }
  }, [activeGame]);

  async function startGame() {
    if (!selectedToken || !stakeAmount || !gameMode || !session) return;
    try {
      setIsGameLoading(true);
      const response = await axios.post(BACKEND_URL + "startGame", {
        type: gameMode,
        amount: +stakeAmount,
        session,
        tokenType: selectedToken.split("-")[0],
        tokenName: selectedToken.split("-")[1],
      });

      const data = response.data as Game;
      setIsActive(true);
      setMessages([{ sender: "bot", content: data.bot_msg1 || "" }]);
      // setActiveGame(data)
      // @ts-ignore
      setGames((prev: Game[]) => [...prev, data]);
      toast.success("Successfully started new game!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.error);
      } else {
        console.error(error);
      }
      toast.error("Error while creating the game");
    } finally {
      setIsGameLoading(false);
    }
  }

  async function endGame() {
    if (!inputMessage || !session || isLoading || !activeGame) return;

    if (inputMessage.length < 4) {
      setInputMessage("");
      addBotMsg("Your message must be at least 3 characters");
      return;
    }

    if (inputMessage.length > 100) {
      setInputMessage("");
      addBotMsg("Your message must be at most 100 characters");
      return;
    }

    addUserMsg(inputMessage);
    setInputMessage("");

    try {
      // setIsGameLoading(true);
      const response = await axios.post(BACKEND_URL + "endGame", {
        session,
        userInput: inputMessage,
      });

      const data = response.data as Game;
      setMessages((curr) => [...curr, { sender: "bot", content: data.bot_msg2 || "", endingStory: true }]);

      const newGames = games.map((game) => {
        if (game.id === data.id) return data;

        return game;
      });
      setGames(newGames);
      setLastGame(data);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.error(error.response?.data.error);
        addBotMsg(error.response?.data.error);
        addBotMsg("Try to refresh the site, if this does not work, please contact us.");
      }
    } finally {
      // setIsGameLoading(false);
    }
  }

  function sendFinalMsg() {
    if (!lastGame) return;

    if (lastGame.status === "won") {
      addBotMsg(
        `You won ${(lastGame.amount * lastGame.multiplier).toFixed(2)} ${lastGame.token_name}! :)`,
        "won",
        true
      );
    } else {
      addBotMsg(`You lost ${lastGame.amount} ${lastGame.token_name} :c`, "lost", true);
    }
  }

  function addBotMsg(msg: string, status?: "won" | "lost", isLast?: boolean) {
    setMessages((prev) => {
      const hasLastMsg = prev.find((el) => el.status);
      if (isLast && hasLastMsg) return prev;
      return [...prev, { sender: "bot", content: msg, status }];
    });
  }
  function addUserMsg(msg: string, status?: "won" | "lost", isLast?: boolean) {
    setMessages((prev) => {
      const hasLastMsg = prev.find((el) => el.status);
      if (isLast && hasLastMsg) return prev;
      return [...prev, { sender: "user", content: msg, status }];
    });
  }

  return (
    <Card className="bg-[#1a2329] border-[#2a333a] text-white p-6 h-[600px] flex flex-col">
      <div className="flex justify-between items-center md:flex-row flex-col mb-4">
        <h2 className="text-2xl font-bold ">Game Box</h2>
        <Headline />
      </div>

      {isGameLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Image src="/goblinHappy.png" alt="loading" width={250} height={250} className="animate-spin" />
        </div>
      )}

      {isLoading && !isGameLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="animate-spin" size={100} />
        </div>
      )}

      {isActive && !isLoading && !isGameLoading && (
        <>
          <div className="grid gap-4 mb-4 sm:grid-cols-[auto_1fr]">
            <div className="flex items-center font-medium">Active game:</div>
            <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
              <Badge className="bg-[#5FE8B1]/10 text-[#5FE8B1] hover:bg-[#5FE8B1]/20 justify-center sm:justify-start">
                Stake: {statsData?.amount} {statsData?.token_name}
              </Badge>
              <Badge className="bg-[#5FE8B1]/10 text-[#5FE8B1] hover:bg-[#5FE8B1]/20 justify-center sm:justify-start">
                Game mode: {gameModes.find((el) => el.value === statsData?.game_type)?.name || ""}
              </Badge>
              <Badge className="bg-[#5FE8B1]/10 text-[#5FE8B1] hover:bg-[#5FE8B1]/20 justify-center sm:justify-start">
                Multiplier: {statsData?.multiplier}
              </Badge>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto mb-4 space-y-2">
            {messages.map((message, index) => (
              <MessageItem
                key={index}
                message={message}
                isWriting={isWriting}
                setIsWriting={setIsWriting}
                sendFinalMsg={sendFinalMsg}
              />
            ))}
          </div>
          {activeGame && (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    endGame();
                  }
                }}
                className="bg-[#2a333a] border-[#3a434a] text-white"
                disabled={isWriting}
              />
              <Button
                onClick={endGame}
                className={cn("bg-[#5FE8B1] text-black hover:bg-[#4CD9A4]")}
                disabled={isWriting}
              >
                Send
              </Button>
            </div>
          )}
          {!activeGame && (
            <Button
              onClick={() => {
                setIsActive(false);
                setHasUserSent(false);
                updateBalance();
              }}
              className={cn(
                "w-full bg-[#5FE8B1] hover:bg-[#4CD9A4] text-black font-bold animate-jump-in",
                isWriting && "bg-[#3a434a]"
              )}
              disabled={isWriting}
            >
              Reset
            </Button>
          )}
        </>
      )}
      {!isActive && !isLoading && !isGameLoading && (
        <div className="space-y-4">
          <TokenSelector userBalance={userBalance} setSelectedToken={setSelectedToken} defaultValue="PERP-USDC" />
          <div className="grid grid-cols-5 gap-2 ">
            {tokenStakeOptions[selectedToken].map((amount) => (
              <Button
                key={amount}
                onClick={() => {
                  if (amount > selectedTokenAmount) return;
                  setStakeAmount(amount.toString());
                }}
                variant="outline"
                className={cn(
                  "bg-[#2a333a] hover:bg-[#2a333a]/75 text-[#5FE8B1] hover:text-[#5FE8B1]  text-sm md:text-base flex gap-0 sm:gap-1 sm:flex-row flex-col",
                  stakeAmount === amount.toString() ? "bg-[#3a434a] border-[#5FE8B1]" : "border-[#3a434a]",
                  amount > selectedTokenAmount
                    ? "opacity-50 cursor-not-allowed text-red-400 hover:text-red-400"
                    : ""
                )}
              >
                <p className="text-base sm:text-base">{amount}</p>
                <p className="text-xs sm:text-base">{selectedToken?.split("-")[1]}</p>
              </Button>
            ))}
          </div>

          <ScrollArea className="h-[300px] w-full rounded-md border border-[#3a434a]">
            <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {gameModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setGameMode(mode.value)}
                  className={`relative overflow-hidden rounded-lg aspect-[2/1] group transition-transform hover:scale-[1.02] ${
                    gameMode === mode.value ? "ring-2 ring-[#5FE8B1]" : ""
                  } `}
                >
                  <Image src={"/gameModes/" + mode.value + ".png"} alt={mode.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 text-center">{mode.name}</h3>
                    <span className="px-2 py-1 bg-[#5FE8B1] text-black rounded-full text-xs md:text-sm font-medium">
                      {mode.multiplier}x
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          <Button
            onClick={startGame}
            className={cn(
              "w-full bg-[#2a333a] hover:bg-[#2a333a] text-white",
              allowedToStart && "bg-[#5FE8B1] hover:bg-[#4CD9A4] text-black font-bold"
            )}
          >
            Start Game
          </Button>
        </div>
      )}
    </Card>
  );
}
