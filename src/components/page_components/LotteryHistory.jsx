// src/components/page_components/LotteryHistory.jsx
import { memo, useLayoutEffect } from "react";

const LotteryHistory = ({ history = [] }) => {
  const contentArray = Array.isArray(history)
    ? history
    : [history].filter(Boolean);

  // useLayoutEffect(() => {
  //   // This console log will help you debug when the layout is calculated
  //   console.log('📐 LotteryHistory layout calculated with:', contentArray.length, 'paragraphs');
  // }, [contentArray.length]);

  return (
    <section
      className="bg-white shadow-md rounded-lg p-6 mb-8 min-h-64"
      style={{
        contain: "layout", // Helps isolate layout calculations for this section
      }}
    >
      <h2 className="text-2xl font-bold text-black mb-4">
        History & Background
      </h2>

      {/* 
        This div will now contain the fully loaded history.
        We ensure its height is stable.
      */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {contentArray.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  );
};

export default memo(LotteryHistory);
