import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ShareableWinPopup from "../ShareableWinPopup";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { Game } from "@/lib/types";

export default function StatsBox({ games, isActive }: { games: Game[]; isActive: boolean }) {
  const [selectedWin, setSelectedWin] = useState<Game | null>(null);

  return (
    <Card className="bg-[#1a2329] border-[#2a333a] text-white p-6">
      <h2 className="text-xl font-bold mb-4">Game History</h2>
      <ScrollArea className="h-[300px] pr-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="pb-2 max-w-[125px]">Date</th>
              <th className="pb-2 text-center">Result</th>
              <th className="pb-2 text-right">Stake</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 &&
              games
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((log, i, arr) => {
                  const isGameLast = i === 0;
                  return (
                    <tr key={log.id} className="border-t border-[#2a333a] lg:text-base">
                      <td className="py-2 text-sm max-w-[125px]">{new Date(log.created_at).toLocaleString()}</td>
                      <td
                        className={cn(
                          "py-2 text-center",
                          log.status === "won" && "text-green-400",
                          log.status === "lost" && "text-red-400",
                          isGameLast && isActive && "text-white"
                        )}
                      >
                        {isGameLast && isActive ? "PENDING" : log.status.toUpperCase()}
                      </td>
                      <td className="py-2 text-right">
                        {log.amount} <span className="text-xs">{log.token_name}</span>
                      </td>

                      {/* <td className="py-2 text-right">
                        {(!isGameLast && log.status === "won") ||
                          (isGameLast && !isActive && log.status === "won" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedWin(log)}
                              className="text-[#5FE8B1] hover:text-[#4CD9A4] hover:bg-[#2a333a]"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          ))}
                      </td> */}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </ScrollArea>

      {/* {selectedWin && (
        <ShareableWinPopup win={selectedWin} isOpen={!!selectedWin} onClose={() => setSelectedWin(null)} />
      )} */}
    </Card>
  );
}
