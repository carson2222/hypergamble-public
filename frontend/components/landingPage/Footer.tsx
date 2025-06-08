import Image from "next/image";
import Link from "next/link";
import { docsLink, tgLink, xLink } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#1a2329]">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-center ml-2">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <span className="text-primary font-bold text-2xl">
            Hyper<span className="italic -ml-1 font-light">gamble</span>
          </span>
        </div>
        <div className="flex space-x-6 mr-4">
          <Link href={docsLink} className="text-textGray hover:text-primary transition-colors">
            Docs
          </Link>
          <Link href={xLink} className="text-textGray hover:text-primary transition-colors">
            X
          </Link>
          <Link href={tgLink} className="text-textGray hover:text-primary transition-colors">
            Telegram
          </Link>
        </div>
      </div>
    </footer>
  );
}
