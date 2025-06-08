import Image from "next/image";
import { Card } from "../ui/card";

export default function HowItWorksSection() {
  return (
    <section className="py-20 border-y border-secondary">
      <div className="">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How does it work?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mx-14">
          <Card className="bg-secondary border-secondary p-6">
            <p className="h-12 w-12 text-primary mb-4 text-5xl font-bold font-sans">1</p>
            <h3 className="text-xl font-bold text-foreground mb-2">Initializing game</h3>
            <p className="text-textGray">
              Choose a payment option from the available hyperliquid tokens, stake and game typ
            </p>
          </Card>
          <Card className="bg-secondary border-secondary p-6">
            <p className="h-12 w-12 text-primary mb-4 text-5xl font-bold font-sans">2</p>
            <h3 className="text-xl font-bold text-foreground mb-2">Dive into the story</h3>
            <p className="text-textGray">
              Our specially trained AI model will generate an entertaining story in which you face a difficult
              situation.
            </p>
          </Card>
          <Card className="bg-secondary border-secondary p-6">
            <p className="h-12 w-12 text-primary mb-4 text-5xl font-bold font-sans">3</p>
            <h3 className="text-xl font-bold text-foreground mb-2">Fight the AI</h3>
            <p className="text-textGray">Find a way to outsmart the AI and get out of your tough situation</p>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-8 w-3/4 lg:w-1/2 mx-auto mt-4">
          <Card className="bg-secondary border-secondary p-6">
            <Image
              src={"/goblinHappy.png"}
              width={250}
              height={250}
              alt="Goblin"
              className="mx-auto w-[150px] h-auto"
            />
            <h3 className="text-xl font-bold text-foreground mb-2">Winner!</h3>
            <p className="text-textGray">
              If you are clever enough, you will receive your bet multiplied by the previously selected multiplier.
            </p>
          </Card>
          <Card className="bg-secondary border-secondary p-6">
            <Image
              src={"/goblinSad.png"}
              width={250}
              height={250}
              alt="Goblin"
              className="mx-auto w-[150px] h-auto"
            />
            <h3 className="text-xl font-bold text-foreground mb-2">Looser :c</h3>
            <p className="text-textGray">
              If the AI outsmarts you, you lose your bet. Think of a better solution next time
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
