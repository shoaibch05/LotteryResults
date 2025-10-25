// config/lotteryConfig.js

export const LOTTERY_TYPES = {
  POWERBALL: "powerball",
  MEGA_MILLIONS: "megamillions",
  LOTTO: "Lotto",
  CASH4LIFE: "cash4life",
  PICK10: "pick10",
  WIN4: "win4",
  NUMBERS: "Numbers",
};

export const lotteryConfigs = {
  powerball: {
    id: "powerball",
    name: "Powerball",
    displayName: "New York Powerball Results Checker",
    description:
      "Check your Powerball numbers here to see if you've won a prize from previous draws. Use the grid below to select your five main numbers from 1 to 69, plus a Powerball between 1 and 26.",
    mainNumbers: {
      label: "Main Numbers",
      count: 5,
      min: 1,
      max: 69,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: {
      label: "Powerball",
      count: 1,
      min: 1,
      max: 26,
      gridCols: 10,
      selectedColor: "bg-yellow-400 text-black border-yellow-500",
    },
    hasMultiplier: true,
    multiplierLabel: "Include Power Play?",
    headerColor: "bg-red-700",
    selectionText: "Select 5 Main Numbers and 1 Powerball",
  },

  megamillions: {
    id: "megamillions",
    name: "Mega Millions",
    displayName: "New York Mega Millions Results Checker",
    description:
      "Check your Mega Millions numbers here to see if you've won a prize from previous draws. Use the grid below to select your five main numbers from 1 to 70, plus a Mega Ball between 1 and 25.",
    mainNumbers: {
      label: "Main Numbers",
      count: 5,
      min: 1,
      max: 70,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: {
      label: "Mega Ball",
      count: 1,
      min: 1,
      max: 25,
      gridCols: 10,
      selectedColor: "bg-yellow-400 text-black border-yellow-500",
    },
    hasMultiplier: false,
    headerColor: "bg-yellow-500",
    selectionText: "Select 5 Main Numbers and 1 Mega Ball",
  },

  Lotto: {
    id: "lotto",
    name: "Lotto",
    displayName: "New York Lotto Results Checker",
    description:
      "Check your Lotto numbers here to see if you've won a prize from previous draws. Use the grid below to select your six main numbers from 1 to 59.",
    mainNumbers: {
      label: "Main Numbers",
      count: 6,
      min: 1,
      max: 59,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: null,
    hasMultiplier: false,
    headerColor: "bg-purple-700",
    selectionText: "Select 6 Main Numbers",
  },
  Take5: {
    id: "take5",
    name: "take5",
    displayName: "New York Take5 Results Checker",
    description:
      "Check your Take5 numbers here to see if you've won a prize from previous draws. Use the grid below to select your six main numbers from 1 to 59.",
    mainNumbers: {
      label: "Main Numbers",
      count: 5,
      min: 1,
      max: 39,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: null,
    hasMultiplier: false,
    headerColor: "bg-blue-400",
    selectionText: "Select 5 Main Numbers",
  },

  cash4life: {
    id: "cash4life",
    name: "Cash4Life",
    displayName: "New York Cash4Life Results Checker",
    description:
      "Check your Cash4Life numbers here to see if you've won a prize from previous draws. Use the grid below to select your five main numbers from 1 to 60, plus a Cash Ball between 1 and 4.",
    mainNumbers: {
      label: "Main Numbers",
      count: 5,
      min: 1,
      max: 60,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: {
      label: "Cash Ball",
      count: 1,
      min: 1,
      max: 4,
      gridCols: 4,
      selectedColor: "bg-green-500 text-white border-green-600",
    },
    hasMultiplier: false,
    headerColor: "bg-green-700",
    selectionText: "Select 5 Main Numbers and 1 Cash Ball",
  },

  pick10: {
    id: "pick10",
    name: "Pick 10",
    displayName: "New York Pick 10 Results Checker",
    description:
      "Check your Pick 10 numbers here to see if you've won a prize from previous draws. Use the grid below to select your ten main numbers from 1 to 80.",
    mainNumbers: {
      label: "Main Numbers",
      count: 10,
      min: 1,
      max: 80,
      gridCols: 10,
      selectedColor: "bg-blue-600 text-white border-blue-700",
    },
    secondaryBall: null,
    hasMultiplier: false,
    headerColor: "bg-blue-700",
    selectionText: "Select 10 Main Numbers",
  },

  win4: {
    id: "win4",
    name: "Win 4",
    displayName: "New York Win 4 Results Checker",
    description:
      "Check your Win 4 numbers here to see if you've won a prize from previous draws. Select one number from each of the four positions below (0-9).",
    isRowBased: true,
    mainNumbers: {
      label: "Win 4 Numbers",
      rows: 4,
      min: 0,
      max: 9,
      gridCols: 10,
      selectedColor: "bg-orange-600 text-white border-orange-700",
    },
    secondaryBall: null,
    hasMultiplier: false,
    headerColor: "bg-orange-600",
    selectionText: "Select 1 Number from Each Position",
  },

  Numbers: {
    id: "numbers",
    name: "Numbers",
    displayName: "New York Numbers Results Checker",
    description:
      "Check your Numbers here to see if you've won a prize from previous draws. Select one number from each of the three positions below (0-9).",
    isRowBased: true,
    mainNumbers: {
      label: "Numbers",
      rows: 3,
      min: 0,
      max: 9,
      gridCols: 10,
      selectedColor: "bg-indigo-600 text-white border-indigo-700",
    },
    secondaryBall: null,
    hasMultiplier: false,
    headerColor: "bg-indigo-600",
    selectionText: "Select 1 Number from Each Position",
  },
};

// Helper function to get lottery config
export const getLotteryConfig = (slug) => {
  return lotteryConfigs[slug] || lotteryConfigs.powerball;
};
