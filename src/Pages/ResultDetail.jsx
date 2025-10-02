// src/pages/LotteryResultsPage.jsx

import dayjs from "dayjs";
import NumbersDisplay from "../components/page_components/NumberDisplay";
import PrizeBreakdownTable from "../components/page_components/PrizeBreakDown";
import ResultDetailHeader from "../components/page_components/ResultDetailHeader";
import JackpotBanner from "../components/page_components/JackpotBanner";



const LotteryResultsPage = () => {
  // Dummy data for now
  const date = "09.28.2025";

  const middayNumbers = [3, 6, 7];
  const eveningNumbers = [0, 8, 4];

  const middayBreakdown = [
    { category: "Straight", winners: 161 },
    { category: "Box", winners: 936 },
    { category: "Pair Plays Front Pair", winners: 25 },
    { category: "Pair Plays Back Pair", winners: 23 },
    { category: "Straight/Box", winners: 106 },
    { category: "Combination", winners: 45 },
    { category: "Totals", winners: 1296 },
  ];

  const eveningBreakdown = [
    { category: "Straight", winners: 212 },
    { category: "Box", winners: 1849 },
    { category: "Pair Plays Front Pair", winners: 25 },
    { category: "Pair Plays Back Pair", winners: 34 },
    { category: "Straight/Box", winners: 65 },
    { category: "Combination", winners: 86 },
    { category: "Totals", winners: 2271 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
      <ResultDetailHeader date={date} />

      {/* Numbers Section */}
      <div>
        <div className="bg-blue-950 text-white px-4 rounded-t">
      <h2 className="text-xl font-semibold mb-4">{dayjs(date).format("MMMM DD, YYYY")}</h2>
        </div>

      <div className="flex flex-col md:flex-row mb-8">
        <NumbersDisplay title="Midday" numbers={middayNumbers} winners={1296} />
        <NumbersDisplay title="Evening" numbers={eveningNumbers} winners={2271} />
      </div>
      </div>

      <JackpotBanner title="Next Jackpot" amount="$5 Million" nextDraw={dayjs().add(5, "hour").add(20, "minute").add(45, "second")} bgColor={"bg-blue-900"} />

      {/* Prize Breakdown Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <PrizeBreakdownTable title="Midday" data={middayBreakdown} />
        <PrizeBreakdownTable title="Evening" data={eveningBreakdown} />
      </div>
    </div>
  );
};

export default LotteryResultsPage;
