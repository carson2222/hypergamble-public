"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { Game } from "@/lib/types";

interface ShareableWinPopupProps {
  win: Game;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareableWinPopup({ win, isOpen, onClose }: ShareableWinPopupProps) {
  const graphicRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (graphicRef.current) {
      const canvas = await html2canvas(graphicRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `cryptox-win-${win.id}.png`;
      link.click();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#1a2329] border-[#2a333a] text-white max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-[#5FE8B1]">Share Your Win</AlertDialogTitle>
          <AlertDialogDescription>
            Celebrate your victory by sharing this custom graphic with your friends!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div ref={graphicRef} className="bg-gradient-to-br from-[#2a333a] to-[#0A1116] rounded-lg p-6 my-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-[#5FE8B1]">CryptoX</h3>
            <span className="text-white text-lg font-semibold">Epic Win #{win.id}</span>
          </div>
          <div className="bg-[#0A1116] rounded-lg p-4 mb-4 relative overflow-hidden">
            <Image
              src={`/gameModes/${win.game_type}.png`}
              alt={win.game_type}
              width={400}
              height={200}
              className="rounded-lg mb-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute top-4 right-4 w-16 h-16">
              <Image src="/logo.png" alt="CryptoX Logo" width={64} height={64} className="opacity-80" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-2xl font-bold text-white mb-1">{win.game_type}</h4>
              <span className="text-[#5FE8B1] font-bold text-lg">{win.multiplier}x Multiplier</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <p className="text-gray-400 text-sm">Date</p>
              <p className="font-bold text-lg">{win.created_at}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Amount Won</p>
              <p className="font-bold text-lg text-green-400">{win.amount} USDC</p>
            </div>
          </div>
          <div className="mt-4 bg-[#0A1116] rounded-lg p-3 text-center">
            <p className="text-sm text-gray-400">Join the winning team at</p>
            <p className="text-lg font-bold text-[#5FE8B1]">www.cryptox.com</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#2a333a] text-white hover:bg-[#3a434a]">Cancel</AlertDialogCancel>
          <Button onClick={handleShare} className="bg-[#5FE8B1] text-black hover:bg-[#4CD9A4]">
            <Share2 className="w-4 h-4 mr-2" />
            Share Win
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
