export default function StatsSection() {
  return (
    <section className="py-20 border-y border-secondary">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">$???</div>
            <div className="text-gray-400">Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">???</div>
            <div className="text-gray-400">Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1%</div>
            <div className="text-gray-400">Fee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
