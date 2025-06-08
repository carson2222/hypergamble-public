import { Wallet2, Smile, Lock } from "lucide-react";
import { Card } from "../ui/card";

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 px-4">
      <div className="">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the most advanced crypto gambling platform with unmatched features and security on
            Hyperliquid
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-secondary border-secondary p-6">
            <Wallet2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Instant Deposits</h3>
            <p className="text-gray-400">Lightning-fast deposits and withdrawals with minimal transaction fees</p>
          </Card>
          <Card className="bg-secondary border-secondary p-6">
            <Smile className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Endless fun</h3>
            <p className="text-gray-400">
              Our games are designed to bring as much fun as possible. Dive into our world to explore them - no
              game is the same, we are waiting for you!
            </p>
          </Card>
          <Card className="bg-secondary border-secondary p-6">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Security</h3>
            <p className="text-gray-400">
              Our dev team has taken care of flawless code to ensure there is no risk of exploit
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
