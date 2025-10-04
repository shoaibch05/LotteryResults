// Simpler version - just ensure consistent rendering
import { memo, useLayoutEffect } from "react";

const LotteryHistory = ({ history = [] }) => {
  const contentArray = Array.isArray(history) 
    ? history 
    : [history].filter(Boolean);

  // Use layout effect to log and ensure consistent behavior
  useLayoutEffect(() => {
    console.log('📐 LotteryHistory layout calculated with:', contentArray.length, 'paragraphs');
  }, [contentArray.length]);

  return (
    <section 
      className="bg-white shadow-md rounded-lg  p-6 mb-8"
      style={{ 
        contain: 'layout' 
      }}
    >
      <h2 className="text-2xl font-bold text-black mb-4">
        History & Background
      </h2>
      
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {contentArray.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  );
};

export default memo(LotteryHistory);