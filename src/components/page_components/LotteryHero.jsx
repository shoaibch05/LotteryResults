// src/components/LotteryHero.jsx
import { memo } from "react";

const LotteryHero = ({ title, description }) => {
  return (
    <div className="bg-white shadow p-6 rounded mb-8 min-h-2">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 min-h-2">
        {description || "No Description is Provided"}
      </p>
    </div>
  );
};

export default memo(LotteryHero);
