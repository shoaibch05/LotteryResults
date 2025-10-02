// src/components/LotteryHistory.jsx
import { memo } from "react";

const LotteryHistory = ({ history = [] }) => {
  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        History & Background
      </h2>
      {Array.isArray(history) ? (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {history.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">{history}</p>
      )}
    </section>
  );
};

export default memo(LotteryHistory);
