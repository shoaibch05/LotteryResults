const lotteriesData = {
  lotto: {
    name: "New York Lotto",
    description:
      "New York Lotto draws take place every Wednesday and Saturday at 8:15 pm Eastern Time. Ticket sales close at 8:00 pm ET, roughly 15 minutes before the draw takes place. The latest winning numbers will be published here soon after this draw time, with the payouts and number of winners to follow once they have been verified.",
    howToPlay: [
      ["Find your nearest official Lotto retailer", "/assets/retailer.svg"],
      ["Choose your numbers, or select quick-pick and pay for your entries", "/assets/pay.svg"],
      ["Remember to store your ticket in a safe place", "/assets/ticket.svg"],
      ["Check the latest results page to see if you're a winner!", "/assets/prize.svg"],
    ],
    winners: [
      { name: "Johnie Tylor", prize: "476 million", date: "April 27, 2018" },
      { name: "New Life 2019, LLC", prize: "437 million", date: "January 6, 2019" },
      { name: "Grace St. John", prize: "426 million", date: "August 23, 2017" },
    ],
    history:
      ["The New York Lotto was first introduced in 1978, making it one of the oldest state lotteries in the United States. Over the decades, it has created countless millionaires and contributed billions of dollars to education funding across New York State. The game has seen record-breaking jackpots, exciting rollovers, and memorable stories of winners who changed their lives overnight."],
    faqs: [
      { q: "How do I play NY Lotto?", a: "Select six numbers from 1 to 59 or use Quick Pick." },
      { q: "What time is the draw?", a: "Every Wednesday and Saturday at 8:15 pm ET." },
    ],
  },

  powerball: {
    name: "Powerball",
    description:
      "Powerball is one of the biggest lotteries in the United States. Draws take place every Monday, Wednesday, and Saturday at 10:59 pm ET.",
    howToPlay: [
      ["Select five numbers from 1 to 69", "/assets/numbers.svg"],
      ["Choose one Powerball number from 1 to 26", "/assets/powerball.svg"],
      ["Optionally add Power Play", "/assets/bonus.svg"],
    ],
    winners: [
      { name: "Mavis Wanczyk", prize: "758.7 million", date: "August 23, 2017" },
      { name: "Powerball Group", prize: "1.586 billion", date: "January 13, 2016" },
    ],
    history:
      ["Launched in 1992, Powerball is famous for its massive jackpots and is played in 45 states plus territories. The record-breaking $1.586 billion jackpot in 2016 cemented its place as the most iconic lottery in the U.S."],
    faqs: [
      { q: "How much is a ticket?", a: "$2 per play, $3 with Power Play." },
      { q: "When are the draws?", a: "Monday, Wednesday, and Saturday at 10:59 pm ET." },
    ],
  },

  megamillions: {
    name: "Mega Millions",
    description:
      "Mega Millions is a multi-state lottery game with draws every Tuesday and Friday at 11:00 pm ET.",
    howToPlay: [
      ["Pick five numbers from 1 to 70", "/assets/numbers.svg"],
      ["Choose one Mega Ball from 1 to 25", "/assets/megaball.svg"],
      ["Optionally add Megaplier", "/assets/bonus.svg"],
    ],
    winners: [
      { name: "Anonymous (SC)", prize: "1.537 billion", date: "October 23, 2018" },
      { name: "Michigan Lottery Club", prize: "1.05 billion", date: "January 22, 2021" },
    ],
    history:
      ["Originally called 'The Big Game' in 1996, it became Mega Millions in 2002. Known for record-breaking jackpots, it remains one of the most popular lotteries in the U.S."],
    faqs: [
      { q: "How much is a ticket?", a: "$2 per play, $3 with Megaplier." },
      { q: "When are the draws?", a: "Every Tuesday and Friday at 11:00 pm ET." },
    ],
  },

  win4: {
    name: "Win 4",
    description:
      "Win 4 is a daily numbers game in New York where players choose a four-digit number from 0000 to 9999.",
    howToPlay: [
      ["Pick a four-digit number (0000–9999)", "/assets/numbers.svg"],
      ["Select a play type: Straight, Box, Straight/Box, or Combo", "/assets/playtype.svg"],
      ["Decide your wager amount", "/assets/pay.svg"],
      ["Check results twice daily", "/assets/prize.svg"],
    ],
    winners: [
      { name: "Anonymous (Bronx)", prize: "$5,000", date: "June 14, 2021" },
      { name: "Michael R.", prize: "$10,000", date: "March 3, 2022" },
    ],
    history:
      ["Introduced in 1981, Win 4 quickly became a popular draw game for players who enjoy daily lottery action. With multiple play styles and twice-daily draws, it offers flexibility and steady excitement for players."],
    faqs: [
      { q: "How often are draws?", a: "Twice daily, at midday and evening." },
      { q: "What is the top prize?", a: "Up to $5,000 on a $1 Straight play." },
    ],
  },

  numbers: {
    name: "New York Numbers",
    description:
      "Numbers is New York’s oldest daily lottery game where players pick a three-digit number (000–999).",
    howToPlay: [
      ["Pick a three-digit number (000–999)", "/assets/numbers.svg"],
      ["Select a play type: Straight, Box, Straight/Box, or Combo", "/assets/playtype.svg"],
      ["Choose your wager amount", "/assets/pay.svg"],
      ["Check results twice daily", "/assets/prize.svg"],
    ],
    winners: [
      { name: "Sarah T.", prize: "$500", date: "January 12, 2020" },
      { name: "Lucky 3 Group", prize: "$2,500", date: "May 22, 2022" },
    ],
    history:
      ["Launched in 1980, Numbers was the first daily lottery game introduced in New York. It has remained popular for decades due to its simple format and frequent draws, appealing to players who enjoy smaller but more frequent prizes."],
    faqs: [
      { q: "How much can I win?", a: "Up to $500 for a $1 Straight play." },
      { q: "When are draws?", a: "Every day, midday and evening." },
    ],
  },

  take5: {
    name: "Take 5",
    description:
      "Take 5 is a popular New York daily lottery game with draws every day at 11:21 pm ET.",
    howToPlay: [
      ["Choose five numbers from 1 to 39", "/assets/numbers.svg"],
      ["Mark your numbers on a playslip or use Quick Pick", "/assets/ticket.svg"],
      ["Each play costs $1", "/assets/pay.svg"],
      ["Check the results page after 11:21 pm ET", "/assets/prize.svg"],
    ],
    winners: [
      { name: "David L.", prize: "$65,000", date: "August 10, 2019" },
      { name: "Queens Syndicate", prize: "$125,000", date: "April 5, 2021" },
    ],
    history:
      ["Take 5 was launched in 1992 and has since become one of New York’s favorite daily lottery games. Its simple format and affordable ticket price make it a consistent choice for casual lottery players.",],
    faqs: [
      { q: "When are draws?", a: "Every day at 11:21 pm ET." },
      { q: "What is the jackpot?", a: "Jackpot varies based on ticket sales and number of winners." },
    ],
  },
};

export default lotteriesData;
