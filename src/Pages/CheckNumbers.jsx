import { useState } from "react";

const sampleResults = [
  {
    drawDate: "2025-09-28",
    numbers: [12, 18, 32, 44, 56],
    powerball: 7,
  },
  {
    drawDate: "2025-09-25",
    numbers: [9, 14, 28, 39, 47],
    powerball: 21,
  },
];

export default function ResultPage() {
  const [userNumbers, setUserNumbers] = useState({
    balls: ["", "", "", "", ""],
    powerball: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    setUserNumbers((prev) => {
      const newBalls = [...prev.balls];
      newBalls[index] = value;
      return { ...prev, balls: newBalls };
    });
  };

  const handlePowerballChange = (value) => {
    setUserNumbers((prev) => ({ ...prev, powerball: value }));
  };

  const checkNumbers = () => {
    // Compare with latest draw for now (static)
    const latest = sampleResults[0];
    const matched = userNumbers.balls.filter((n) =>
      latest.numbers.includes(Number(n))
    );
    const powerballMatch =
      Number(userNumbers.powerball) === latest.powerball;

    setResult({
      matched: matched.length,
      powerball: powerballMatch,
      winning: latest,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Powerball – Check Your Numbers
      </h1>

      {/* Form */}
      <div className="bg-white shadow p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Enter Your Numbers
        </h2>
        <div className="flex gap-2 mb-4">
          {userNumbers.balls.map((num, i) => (
            <input
              key={i}
              type="number"
              className="w-12 h-12 border rounded text-center"
              value={num}
              onChange={(e) => handleChange(i, e.target.value)}
              min="1"
              max="69"
            />
          ))}
          <input
            type="number"
            className="w-12 h-12 border rounded text-center bg-red-100"
            placeholder="PB"
            value={userNumbers.powerball}
            onChange={(e) => handlePowerballChange(e.target.value)}
            min="1"
            max="26"
          />
        </div>
        <button
          onClick={checkNumbers}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Check Numbers
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          <p>
            You matched <strong>{result.matched}</strong>{" "}
            numbers {result.powerball ? " + Powerball!" : ""}.
          </p>
          <p className="mt-2">
            Winning Numbers:{" "}
            <span className="font-bold">
              {result.winning.numbers.join(", ")} +{" "}
              {result.winning.powerball}
            </span>
          </p>
        </div>
      )}

      {/* Past Results */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Draw Date</th>
              <th className="p-2 border">Winning Numbers</th>
              <th className="p-2 border">Powerball</th>
            </tr>
          </thead>
          <tbody>
            {sampleResults.map((draw, idx) => (
              <tr key={idx} className="odd:bg-gray-50">
                <td className="p-2 border">{draw.drawDate}</td>
                <td className="p-2 border">
                  {draw.numbers.join(", ")}
                </td>
                <td className="p-2 border text-red-600 font-bold">
                  {draw.powerball}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
