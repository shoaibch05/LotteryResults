
import { Link } from "react-router-dom";
import { useCallback } from "react";

import { useHotNumbers } from "../store/HotNumbersContext";

export default function PowerballChecker() {
  const {
    selectedMain,
    setSelectedMain,
    selectedPowerball,
    setSelectedPowerball,
    powerPlay,
    setPowerPlay,
  } = useHotNumbers();

  const toggleMain = useCallback((num) => {
    setSelectedMain((prev) =>
      prev.includes(num)
        ? prev.filter((n) => n !== num)
        : prev.length < 5
        ? [...prev, num]
        : prev
    );
  }, []);

  const selectPowerball = useCallback((num) => {
    setSelectedPowerball((prev) => (prev === num ? null : num));
  }, []);

  const resetBoard = useCallback(() => {
    setSelectedMain([]);
    setSelectedPowerball(null);
    setPowerPlay(false);
  }, []);


  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Check Powerball Numbers
      </h1>
      <p className="text-gray-700 mb-10 leading-relaxed">
        Check your Powerball numbers here to see if you've won a prize from previous draws.
        Use the grid below to select your five main numbers from 1 to 69, plus a Powerball
        between 1 and 26. Just click on a number to select it, or tap it if you’re using
        a touchscreen.
      </p>

      {/* Red Header Bar */}
      <div className="bg-red-700 text-white flex justify-between items-center px-4 py-3 rounded-t-md">
        <span className="font-semibold">New York Powerball Results Checker</span>
        <span className="text-sm">Select 5 Main Numbers and 1 Powerball</span>
      </div>

      {/* Checker Body */}
      <div className="border border-gray-300 rounded-b-md bg-white p-6 shadow-sm">
        {/* Main Numbers */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-center">Main Numbers</h2>
          <div className="grid grid-cols-10 gap-2 justify-items-center">
            {Array.from({ length: 69 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => toggleMain(num)}
                className={`w-full h-10 flex items-center justify-center rounded-md border text-sm font-medium transition
                  ${
                    selectedMain.includes(num)
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        {/* Powerball */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-center">Powerball</h2>
          <div className="grid grid-cols-10 gap-2 justify-items-center">
            {Array.from({ length: 26 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => selectPowerball(num)}
                className={`w-full h-10 flex items-center justify-center rounded-md border text-sm font-medium transition
                  ${
                    selectedPowerball === num
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        {/* Power Play Toggle */}
        <div className="flex items-center justify-center mb-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={powerPlay}
              onChange={() => setPowerPlay(!powerPlay)}
              className="w-5 h-5 accent-red-600"
            />
            <span className="text-gray-800 font-medium">Include Power Play?</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetBoard}
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Reset Board
          </button>
          <Link
          to={"checkNumbers"}
          >
          
          <button
            disabled={selectedMain.length !== 5 || !selectedPowerball}
            className={`px-6 py-2 rounded-md font-medium transition
              ${
                selectedMain.length === 5 && selectedPowerball
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
        *Please note that the results of this checker do not constitute proof of winning.
        You must have a valid winning ticket from the draw in question to be able to claim
        a prize. Prizes must be claimed within one year of the draw.
      </p>
    </main>
  );
}
