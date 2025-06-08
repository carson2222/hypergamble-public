import { Zap } from "lucide-react";
import { Button } from "../ui/button";

interface CTASectionProps {
  btnClick: () => void;
  username: string | null;
}

export default function CTASection({ btnClick, username }: CTASectionProps) {
  return (
    <section className="py-20 bg-secondary">
      <div className="">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-12 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Ready to Start Playing?</h2>
          <p className="text-black/80 mb-8 max-w-xl mx-auto">Join today and test your strength against AI</p>

          <Button className="bg-black text-foreground hover:bg-black/80 h-12 px-8" onClick={btnClick}>
            {username ? `Continue as ${username}` : "Start Betting"}
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
