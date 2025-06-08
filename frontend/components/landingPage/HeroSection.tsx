import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface HeroSectionProps {
  btnClick: () => void;
  username: string | null;
}

export default function HeroSection({ btnClick, username }: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light to-transparent" />
      <div className="relative px-10">
        <div className="max-w-3xl">
          <Badge className="bg-primary-light text-primary mb-4 hover:bg-primary-light">Now Live</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            The Future of <span className="text-primary">Crypto Gambling</span>
          </h1>

          <div className="text-lg sm:text-2xl md:text-3xl font-light text-foreground mb-6 flex items-center gap-4 bg-secondary-light border border-secondary px-4 py-2 rounded-lg w-fit max-w-full">
            <span className="whitespace-nowrap hidden sm:block">Powered by</span>
            <Image
              src={"/hyperlqLogo.svg"}
              alt="HyperLQ Logo"
              className="w-[150px] sm:w-[200px] h-auto"
              width={250}
              height={100}
              unoptimized
            />
            <Image
              src={"/hyperLqLogo.gif"}
              alt="HyperLQ Logo"
              className="w-[60px] sm:w-[80px] h-auto"
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <p className="text-xl text-gray-400 mb-8">
            What happens when you combine risk, AI and interesting stories? You&apos;ll have to see for yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary text-black hover:bg-primary-dark h-12 px-8" onClick={btnClick}>
              {username ? `Continue as ${username}` : "Start Betting"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-primary bg-foreground text-black hover:bg-primary-light h-12 px-8"
              onClick={() => router.push("/docs")}
            >
              Learn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
