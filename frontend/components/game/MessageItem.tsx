import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export default function MessageItem({
  message,
  isWriting,
  setIsWriting,
  sendFinalMsg,
}: {
  message: Message;
  isWriting: boolean;
  setIsWriting: (value: boolean) => void;
  sendFinalMsg: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const text = useMemo(() => message.content, [message.content]);
  const delay = 20;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (!message.status) setIsWriting(true);
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1)); // Use `slice` for deterministic updates
        i++;
      } else {
        clearInterval(timer);
        setIsWriting(false);
      }
    }, delay);

    return () => {
      clearInterval(timer);
      setIsWriting(false);
    }; // Cleanup the timer properly
  }, [text, delay, setIsWriting]);

  useEffect(() => {
    if (!message.endingStory || !text || text.length !== displayText.length) return;

    setTimeout(sendFinalMsg);
  }, [message, text, displayText, sendFinalMsg]);

  if (message.status && isWriting) return;

  return (
    <div
      className={cn(
        "p-2 rounded-lg max-w-[80%] opacity-100",
        message.status && isWriting && "opacity-0",
        message.sender === "user" ? "bg-[#2a333a] ml-auto" : "bg-[#3a434a]",
        message.status === "won" && "text-[#5FE8B1] border-2 border-[#5FE8B1]",
        message.status === "lost" && "text-red-400 border-2 border-red-400"
      )}
    >
      {displayText}
    </div>
  );
}
