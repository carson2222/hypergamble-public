import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Header({ btnClick }: { btnClick?: () => void }) {
  return (
    <header className="border-b border-[#1a2329] backdrop-blur-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between h-16">
        <div
          className="flex items-center space-x-2 px-5 cursor-pointer"
          onClick={() => window.location.assign("/")}
        >
          <Image src={"/logo.png"} alt="logo" width={50} height={50} className="" />
          <span className="text-[#5FE8B1] font-bold sm:text-2xl text-lg hidden xsm:block ">
            Hyper<span className="italic -ml-1 font-light">gamble</span>
          </span>

          {/* <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-[#5FE8B1] transition-colors">
            Trade
          </Link>
          <Link href="#" className="text-gray-400 hover:text-[#5FE8B1] transition-colors">
            Stake
          </Link>
          <Link href="#" className="text-gray-400 hover:text-[#5FE8B1] transition-colors">
            Learn
          </Link>
        </nav> */}
        </div>
        {btnClick && (
          <Button className="bg-[#5FE8B1] text-black hover:bg-[#4CD9A4] transition-colors mr-4" onClick={btnClick}>
            Launch App
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
