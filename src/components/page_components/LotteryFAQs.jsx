// src/components/LotteryFAQs.jsx
import { useState, memo } from "react";

const LotteryFAQs = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">FAQs</h2>
      {faqs.map((faq, idx) => (
        <div key={idx} className="mb-2 border-b">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center py-3 text-left"
          >
            <span className="font-semibold">{faq.q}</span>
            <span>{openIndex === idx ? "-" : "+"}</span>
          </button>
          {openIndex === idx && <p className="pb-3 text-gray-700">{faq.a}</p>}
        </div>
      ))}
    </div>
  );
};

export default memo(LotteryFAQs);
