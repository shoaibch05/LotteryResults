import { useState, memo } from "react";

const faqs = [
  {
    category: "How to Play",
    items: [
      {
        q: "1. How do I find how to play the lottery?",
        a: "You can find rules on the official NY Lottery website for each game. Visit nylottery.ny.gov/games for detailed instructions."
      },
      {
        q: "2. How much does it cost to play?",
        a: "Ticket prices vary by game. For example, Powerball is $2 per play, Mega Millions is $2, and NY Lotto starts at $1."
      },
      {
        q: "3. Where can I watch the draws?",
        a: "You can watch draws on local TV stations or on the official NY Lottery website and YouTube channel."
      },
    ],
  },
  {
    category: "Prize Information",
    items: [
      {
        q: "1. How do I claim a prize?",
        a: "Prizes up to $600 can be claimed at authorized retailers. Larger prizes must be claimed at a Lottery Customer Service Center."
      },
      {
        q: "2. Will I be taxed on my prize?",
        a: "Yes. Federal and state taxes apply to prizes over $5,000. The NY Lottery reports winnings to the IRS and NY State."
      },
      {
        q: "3. Can I stay anonymous if I win?",
        a: "No, New York State law requires the Lottery to release your name and prize amount publicly."
      },
    ],
  },
  {
    category: "Game Details",
    items: [
      {
        q: "1. What are the odds of winning?",
        a: "Odds depend on the game. For instance, Powerball odds of hitting the jackpot are 1 in 292,201,338."
      },
      {
        q: "2. What is Quick Pick?",
        a: "Quick Pick randomly generates your numbers for you instead of you selecting them manually."
      },
      {
        q: "3. What is Power Play / Megaplier?",
        a: "An optional feature to multiply non-jackpot prizes by 2x–10x depending on the multiplier drawn."
      },
    ],
  },
];

const FAQItem = memo(({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 transition-all">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-800 hover:text-blue-700 focus:outline-none"
        aria-expanded={open}
      >
        <span  className={`transition-colors duration-200 ${
        open ? "bg-blue-800 w-full text-white px-2 rounded-t-lg" : ""
      }`} >{q}</span>
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

const UniversalFAQ = () => (
  <section className="mx-5 px-5 py-4 my-4 bg-white shadow-sm rounded-lg">
    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
      New York Lottery FAQs
    </h1>

    {faqs.map((section, i) => (
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

export default UniversalFAQ;
