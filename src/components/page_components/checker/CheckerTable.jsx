// components/UniversalCheckerTable.jsx
import Circle from "./Circle";

const UniversalCheckerTable = ({ userNumbers, results, config }) => {
  const isRowBased = config.isRowBased;
  const secondaryLabel = config.secondaryBall?.label || "Bonus";

  // Render user's selected numbers
  const renderUserNumbers = () => {
    if (isRowBased) {
      // Win4 or Numbers - show as sequential positions
      return (
        <div className="flex justify-center space-x-4">
          {userNumbers.main.map((num, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xs text-gray-600 mb-1">Pos {idx + 1}</span>
              <Circle number={num} isUserNumber />
            </div>
          ))}
        </div>
      );
    } else {
      // Grid-based lotteries
      return (
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
          {userNumbers.main.map((num) => (
            <Circle key={num} number={num} isUserNumber />
          ))}
          {userNumbers.secondary && (
            <Circle number={userNumbers.secondary} isPowerball isUserNumber />
          )}
        </div>
      );
    }
  };

  // Calculate matches for a result row
  const calculateMatches = (result) => {
    if (isRowBased) {
      // Row-based: exact position matching
      const matchedPositions = result.numbers.filter(
        (num, idx) => num === userNumbers.main[idx]
      ).length;
      return {
        matchedMain: matchedPositions,
        matchedSecondary: false,
        isWinningRow: matchedPositions >= 2, // Win if 2+ positions match
      };
    } else {
      // Grid-based: any matching numbers
      const matchedMain = result.numbers.filter((ball) =>
        userNumbers.main.includes(ball)
      );
      const matchedSecondary =
        result.secondary !== null &&
        result.secondary !== undefined &&
        userNumbers.secondary === result.secondary;

      const isWinningRow = matchedMain.length >= 3 || matchedSecondary;

      return {
        matchedMain: matchedMain.length,
        matchedMainNumbers: matchedMain,
        matchedSecondary,
        isWinningRow,
      };
    }
  };

  // Render result row balls
  const renderResultBalls = (result, matches) => {
    if (isRowBased) {
      // Row-based display
      return (
        <div className="flex justify-center items-center space-x-3">
          {result.numbers.map((num, idx) => {
            const isMatched = num === userNumbers.main[idx];
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">{idx + 1}</span>
                <Circle
                  number={num}
                  isMatched={isMatched}
                  faded={!isMatched && matches.isWinningRow}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      // Grid-based display
      return (
        <div className="flex justify-center items-center space-x-3 flex-wrap">
          {result.numbers.map((ball, idx) => {
            const isMatched = matches.matchedMainNumbers?.includes(ball);
            return (
              <Circle
                key={`${ball}-${idx}`}
                number={ball}
                isMatched={isMatched}
                faded={!isMatched && matches.isWinningRow}
              />
            );
          })}
          {result.secondary !== null && result.secondary !== undefined && (
            <Circle
              number={result.secondary}
              isPowerball
              isMatched={matches.matchedSecondary}
              faded={!matches.matchedSecondary && matches.isWinningRow}
            />
          )}
        </div>
      );
    }
  };

  // Generate match description
  const getMatchDescription = (matches) => {
    if (isRowBased) {
      if (matches.matchedMain === 0) return "-";
      return `You matched ${matches.matchedMain} position(s) exactly`;
    } else {
      if (!matches.isWinningRow) return "-";
      let desc = `You matched ${matches.matchedMain} main number(s)`;
      if (matches.matchedSecondary) {
        desc += ` + the ${secondaryLabel}`;
      }
      return desc;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 font-sans text-gray-900">
      {/* Header / Your Numbers */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">
          Your Numbers
        </h2>
        <p className="text-center text-sm sm:text-base mb-4">
          Your numbers have been checked against the{" "}
          <span className="text-red-600 font-semibold">
            {config.name} Results
          </span>{" "}
          for the past <span className="font-semibold">365 days</span>.
          <br />
          The results are shown below with any winning matches highlighted.
        </p>
        {renderUserNumbers()}
      </section>

      {/* Results Table */}
      <section>
        <div className="overflow-x-auto border-t border-b border-gray-300 rounded-md">
          <table className="w-full min-w-[600px] table-fixed text-sm sm:text-base">
            <thead className="bg-blue-900 text-white select-none align-middle">
              <tr>
                <th className="p-3 text-left w-48">Result Date</th>
                <th className="p-3 text-center">
                  {isRowBased ? "Numbers Drawn" : "Balls Drawn"}
                </th>
                <th className="p-3 text-left w-52">You Matched</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => {
                const matches = calculateMatches(result);

                return (
                  <tr
                    key={idx}
                    className={`align-middle border-b ${
                      matches.isWinningRow ? "bg-red-600 text-white" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap font-semibold">
                      {result.date}
                    </td>
                    <td className="p-3">
                      {renderResultBalls(result, matches)}
                    </td>
                    <td className="p-3 font-semibold">
                      {getMatchDescription(matches)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3 text-gray-600 italic">
          *This is a demonstration. Results checker prizes must be claimed
          within one year of the draw.
        </p>
      </section>
    </div>
  );
};

export default UniversalCheckerTable;
