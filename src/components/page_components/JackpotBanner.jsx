import { memo, useEffect, useState } from "react";
import CountdownCircle from "./CountdownCircle";
import { getLatestJackpot } from "../../api/jackpotApi";
import useCountdown from "../../hooks/useCountdown";
import dayjs from "dayjs";

const JackpotBanner = () => {
  const [jackpotData, setJackpotData] = useState(null);
  const [drawDate, setDrawDate] = useState(null);

  useEffect(() => {
    const fetchJackpotData = async () => {
      try {
        const data = await getLatestJackpot();
        setJackpotData(data);

        // ✅ Extract date once data arrives
        if (data && data.length > 0) {
          setDrawDate(data[0].draw_date);
          console.log("draw date is ", data[0].draw_date);
        }
      } catch (error) {
        console.error("Error while fetching jackpot data:", error);
      }
    };
    fetchJackpotData();
  }, []);

  // ✅ useCountdown runs only when drawDate exists
  const timeLeft = useCountdown(drawDate);

  useEffect(() => {
    if (jackpotData) {
      console.log("Data received by API call:", jackpotData);
    }
  }, [jackpotData]);

  if (!jackpotData || jackpotData.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-100 rounded-lg text-gray-500">
        Loading jackpot data...
      </div>
    );
  }

  const jackpot = jackpotData[0];
  const drawDay = dayjs(jackpot.draw_date).format("dddd");

  return (
    <div
      className={`bg-${jackpot.color}-800 text-white rounded-lg bg-[url(/assets/flag-hand.webp)] bg-no-repeat bg-left
      flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-4 md:px-6 py-6 mb-6`}
    >
      {/* Title */}
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold">
          {jackpot.Jackpot_category}
        </h2>
      </div>

      {/* Jackpot Info */}
      <div className="text-center md:text-left">
        <p className="mt-1 text-sm md:text-base">{drawDay}'s Jackpot is</p>
        <p className="text-2xl md:text-3xl font-extrabold text-yellow-400">
          {jackpot.amount}
        </p>
      </div>

      {/* Timer + Button */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="hidden md:flex items-center space-x-2">
          <CountdownCircle timeLeft={timeLeft} />
        </div>
      </div>
    </div>
  );
};

export default memo(JackpotBanner);
