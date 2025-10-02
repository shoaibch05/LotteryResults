// src/components/LotteryHero.jsx
import { memo } from "react";

const LotteryHero = ({ title, description }) => (
  <div className="bg-white shadow p-6 rounded mb-8">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default memo(LotteryHero);
