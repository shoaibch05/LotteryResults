
const NyLottoCard = () => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden border">
      {/* Header */}
      <div className="bg-brand-red text-white flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">NY Lotto Results</h2>
        <img
          src="/ny-lotto-logo.png" // replace with your logo asset
          alt="NY Lotto"
          className="h-6"
        />
      </div>

      {/* Draw Info */}
      <div className="px-4 py-3 text-center">
        <p className="font-semibold text-gray-700">
          Wednesday September 24th 2025
        </p>

        {/* Numbers */}
        <div className="flex justify-center gap-2 my-3">
          {[1, 6, 27, 47, 53, 56].map((num, i) => (
            <span
              key={i}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-lg font-semibold text-gray-800"
            >
              {num}
            </span>
          ))}
          {/* Bonus Ball */}
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-red text-white text-lg font-semibold">
            41
          </span>
        </div>

        {/* Prize Payout Link */}
        <a
          href="#"
          className="text-brand-red text-sm font-medium hover:underline"
        >
          View Prize Payout for September 24th ›
        </a>
      </div>

      {/* Jackpot + Next Draw */}
      <div className="px-4 py-3 border-t text-center grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Next Estimated Jackpot:</p>
          <p className="text-2xl font-bold text-brand-red">$4.3 Million</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Time Until Next Draw:</p>
          <p className="text-2xl font-bold text-brand-red">
            1 day 11:22:03
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 px-4 py-3 border-t">
        <button className="flex-1 bg-brand-blue text-white font-medium py-2 rounded-md hover:bg-blue-800 transition">
          More New York Lotto Results
        </button>
        <button className="flex-1 bg-brand-yellow text-gray-900 font-medium py-2 rounded-md hover:bg-yellow-500 transition">
          BUY TICKETS
        </button>
      </div>
    </div>
  );
};

export default NyLottoCard;
