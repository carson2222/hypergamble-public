"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import useSession from "@/hooks/useSession";
import useUserBalance from "@/hooks/useUserBalance";
import HeroSection from "@/components/landingPage/HeroSection";
import StatsSection from "@/components/landingPage/StatsSection";
import WhyChooseUsSection from "@/components/landingPage/WhyChooseUsSection";
import HowItWorksSection from "@/components/landingPage/HowItWorksSection";
import CTASection from "@/components/landingPage/CTASection";
import Footer from "@/components/landingPage/Footer";

export default function LandingPage() {
  const { isLoading, user, pubkey } = useSession();
  const { isBalanceEmpty } = useUserBalance(pubkey);
  const router = useRouter();
  const username = useMemo(() => user?.username || user?.first_name || user?.last_name || "", [user]);

  function generateTgStartLink() {
    return `https://t.me/hypergamble_bot?start=null`;
  }

  async function btnClick() {
    if (isLoading) return;

    if (user?.id) {
      if (isBalanceEmpty && !isLoading) {
        router.push("wallet");
        return;
      } else {
        router.push("game");
      }
    } else {
      router.push(generateTgStartLink());
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1116]">
      <Header btnClick={btnClick} />
      <HeroSection btnClick={btnClick} username={username} />
      <StatsSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <CTASection btnClick={btnClick} username={username} />
      <Footer />
    </div>
  );
}
