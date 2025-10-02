import { memo } from "react";
import dayjs from "dayjs";
import CountdownCircle from "./CountdownCircle";

const JackpotBanner = ({ title, amount, nextDraw, bgColor }) => {
  const nextDrawTime = dayjs()
    .add(5, "hour")
    .add(20, "minute")
    .add(45, "second"); // example countdown

  return (
    <div
      className={`${bgColor} text-white rounded-lg bg-[url(/assets/flag-hand.png)] bg-no-repeat bg-right 
      flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-4 md:px-6 py-6 mb-6`}
    >
      {/* Title */}
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>

      {/* Jackpot Info */}
      <div className="text-center md:text-left">
        <p className="mt-1 text-sm md:text-base">Wednesday's Jackpot is</p>
        <p className="text-2xl md:text-3xl font-extrabold text-yellow-400">
          {amount}
        </p>
      </div>

      {/* Timer + Button */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Hide timer on mobile */}
        <div className="hidden md:flex items-center space-x-2">
          <CountdownCircle targetTime={nextDrawTime} />
        </div>

        <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold text-sm md:text-base w-full md:w-auto">
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default memo(JackpotBanner);
