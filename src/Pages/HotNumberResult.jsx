import { CheckerTable } from "../components/page_components/checker/CheckerTable";
import { useHotNumbers } from "../context/HotNumbersContext";


const HotNumberResult = () => {
  const { selectedMain, selectedPowerball, powerPlay } = useHotNumbers();
  const HotNumberData = {
    userNumbers: {
      main: selectedMain,
      powerball: selectedPowerball,
      powerPlay: powerPlay,
    },
    results: [
      {
        date: "Monday September 29th 2025",
        balls: [1, 3, 27, 60, 65],
        powerball: 16,
        powerPlay: 5,

        prize: "$35.00",
        prizeDescription: "2 Main Numbers + The Powerball",
      },
      {
        date: "Saturday September 27th 2025",
        balls: [10, 16, 32, 61, 66],
        powerball: 4,
        powerPlay: 2,

        prize: null,
        prizeDescription: null,
      },
      {
        date: "Wednesday September 24th 2025",
        balls: [1, 31, 33, 49, 53],
        powerball: 19,
        powerPlay: 3,
        prize: null,
        prizeDescription: null,
      },
      {
        date: "Monday September 29nd 2025",
        balls: [2, 4, 20, 66, 61],
        powerball: 16,
        powerPlay: 1,

        prize: null,
        prizeDescription: null,
      },
      {
        date: "Monday September 22nd 2025",
        balls: [1, 29, 42, 33, 59],
        powerball: 16,
        powerPlay: 1,
        matchedPowerball: false,
        prize: null,
        prizeDescription: null,
      },
    ],
  };
  return (
    <div>
      <CheckerTable data={HotNumberData} />
    </div>
  );
};

export default HotNumberResult;
