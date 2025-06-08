"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

type Headline = {
  type: string;
  text: string;
};

const headlines: Headline[] = [
  { type: "INFO", text: "Currently just for testing purposes max bet amount is 5$." },
  { type: "INFO", text: "Points campaign v1 will start soon..." },
  { type: "INFO", text: "Play now to gain secret v0 points." },
  { type: "INFO", text: "Is something unclear? Check out our docs!" },
  { type: "INFO", text: "Soon you'll be able to reefer friends and earn fees!" },
];

export default function Headline() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2 === headlines.length ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <Badge className="bg-[#5FE8B1]/10 text-[#5FE8B1] hover:bg-[#5FE8B1]/10">
          {`${headlines[currentIndex].type.toUpperCase()}: ${headlines[currentIndex].text}`}
        </Badge>
      </motion.div>
    </AnimatePresence>
  );
}
