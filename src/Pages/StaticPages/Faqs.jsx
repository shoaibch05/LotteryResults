// src/Pages/StaticPages/Faqs.jsx
import { useState, memo } from "react";
import staticData from "../../data/staticData.json";

const FAQItem = memo(({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 transition-all">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-800 hover:text-blue-700 focus:outline-none"
        aria-expanded={open}
      >
        <span
          className={`transition-colors duration-200 ${
            open ? "bg-blue-800 w-full text-white px-2 rounded-t-lg" : ""
          }`}
        >
          {q}
        </span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 text-sm leading-relaxed pb-3">{a}</p>
      </div>
    </div>
  );
});

const UniversalFAQ = () => {
  const faqData = staticData.faqs;

  return (
    <section className="mx-5 px-5 py-4 my-4 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {faqData.title}
      </h1>

      {faqData.categories.map((section, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-1">
            {section.category}
          </h2>
          <div>
            {section.items.map((faq, j) => (
              <FAQItem key={j} {...faq} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default UniversalFAQ;
