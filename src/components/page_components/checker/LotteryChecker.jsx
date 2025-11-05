// components/LotteryChecker.jsx
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useLottery } from "../../../context/LotteryContext";
import { getLotteryConfig } from "../../../config/lotteryConfig";
import { useAds } from "../../../context/AdProvider";
import AdBanner from "../../AdBanner";

export default function LotteryChecker() {
  const { getAdsFor } = useAds();
  const adsUnderHeader = getAdsFor("LotteryChecker", "underHeader");
  const adsBottom = getAdsFor("LotteryChecker", "bottom");

  const { slug } = useParams(); // Get lottery type from URL
  const config = getLotteryConfig(slug);

  const {
    selectedMain,
    setSelectedMain,
    selectedSecondary,
    setSelectedSecondary,
    hasMultiplier,
    setHasMultiplier,
    selectedRows,
    setSelectedRows,
    resetSelections,
  } = useLottery();

  // Reset selections when lottery type changes
  useEffect(() => {
    resetSelections();
  }, [slug, resetSelections]);

  // Toggle main numbers (for grid-based lotteries)
  const toggleMain = useCallback(
    (num) => {
      setSelectedMain((prev) =>
        prev.includes(num)
          ? prev.filter((n) => n !== num)
          : prev.length < config.mainNumbers.count
          ? [...prev, num]
          : prev
      );
    },
    [config.mainNumbers.count, setSelectedMain]
  );

  // Select secondary ball
  const selectSecondary = useCallback(
    (num) => {
      setSelectedSecondary((prev) => (prev === num ? null : num));
    },
    [setSelectedSecondary]
  );

  // Toggle row-based number (for Win4 and Numbers)
  const toggleRowNumber = useCallback(
    (rowIndex, num) => {
      setSelectedRows((prev) => ({
        ...prev,
        [rowIndex]: prev[rowIndex] === num ? null : num,
      }));
    },
    [setSelectedRows]
  );

  // Check if selections are complete
  const isComplete = () => {
    if (config.isRowBased) {
      // Check if all rows have selections
      const rowCount = config.mainNumbers.rows;
      return (
        Object.keys(selectedRows).length === rowCount &&
        Object.values(selectedRows).every((val) => val !== null)
      );
    } else {
      // Check main numbers and secondary ball
      const mainComplete = selectedMain.length === config.mainNumbers.count;
      const secondaryComplete =
        !config.secondaryBall || selectedSecondary !== null;
      return mainComplete && secondaryComplete;
    }
  };

  // Render row-based number grid (Win4, Numbers)
  const renderRowBasedGrid = () => {
    const rows = config.mainNumbers.rows;
    const min = config.mainNumbers.min;
    const max = config.mainNumbers.max;
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {config.mainNumbers.label}
        </h2>
        <div className="space-y-6">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex}>
              <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
                Position {rowIndex + 1}
              </h3>
              <div className={`grid grid-cols-10 gap-2 justify-items-center`}>
                {numbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => toggleRowNumber(rowIndex, num)}
                    className={`md:w-full h-10 w-5.5 flex items-center justify-center rounded-md border text-sm font-medium transition
                      ${
                        selectedRows[rowIndex] === num
                          ? config.mainNumbers.selectedColor
                          : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Render standard grid (all other lotteries)
  const renderStandardGrid = () => {
    const min = config.mainNumbers.min;
    const max = config.mainNumbers.max;
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {config.mainNumbers.label}
        </h2>
        <div
          className={`grid grid-cols-${config.mainNumbers.gridCols} gap-2 justify-items-center`}
        >
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => toggleMain(num)}
              className={`md:w-full w-5.5 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition
                ${
                  selectedMain.includes(num)
                    ? config.mainNumbers.selectedColor
                    : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </section>
    );
  };

  // Render secondary ball section (Powerball, Mega Ball, Cash Ball)
  const renderSecondaryBall = () => {
    if (!config.secondaryBall) return null;

    const min = config.secondaryBall.min;
    const max = config.secondaryBall.max;
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {config.secondaryBall.label}
        </h2>
        <div
          className={`grid grid-cols-${config.secondaryBall.gridCols} gap-2 justify-items-center`}
        >
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => selectSecondary(num)}
              className={`w-full h-10 flex items-center justify-center rounded-md border text-sm font-medium transition
                ${
                  selectedSecondary === num
                    ? config.secondaryBall.selectedColor
                    : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Check {config.name} Numbers
      </h1>
      <p className="text-gray-700 mb-10 leading-relaxed">
        {config.description}
      </p>

      {/* Header Bar */}
      <div
        className={`${config.headerColor} text-white flex justify-between items-center px-4 py-3 rounded-t-md`}
      >
        <span className="font-semibold">{config.displayName}</span>
        <span className="text-sm">{config.selectionText}</span>
      </div>

      {adsUnderHeader.map((a) => (
        <AdBanner key={a.slot} slot={a.slot} height={120} />
      ))}

      {/* Checker Body */}
      <div className="border border-gray-300 rounded-b-md bg-white p-6 shadow-sm">
        {/* Main Numbers - Row-based or Standard Grid */}
        {config.isRowBased ? renderRowBasedGrid() : renderStandardGrid()}

        {/* Secondary Ball (if applicable) */}
        {renderSecondaryBall()}

        {/* Multiplier Toggle (Power Play, etc.) */}
        {config.hasMultiplier && (
          <div className="flex items-center justify-center mb-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasMultiplier}
                onChange={() => setHasMultiplier(!hasMultiplier)}
                className="w-5 h-5 accent-red-600"
              />
              <span className="text-gray-800 font-medium">
                {config.multiplierLabel}
              </span>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetSelections}
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Reset Board
          </button>
          <Link to="checkNumbers">
            <button
              disabled={!isComplete()}
              className={`px-6 py-2 rounded-md font-medium transition
                ${
                  isComplete()
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Check Results
            </button>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 mt-6">
        *Please note that the results of this checker do not constitute proof of
        winning. You must have a valid winning ticket from the draw in question
        to be able to claim a prize. Prizes must be claimed within one year of
        the draw.
      </p>

      {adsBottom.map((a) => (
        <AdBanner key={a.slot} slot={a.slot} height={120} />
      ))}
    </main>
  );
}
