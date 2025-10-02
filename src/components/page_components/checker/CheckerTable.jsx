import Circle from "./Circle";

export const CheckerTable = (data) => {
  const { userNumbers, results } = data.data;
  

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 font-sans text-gray-900">
      {/* Header / Your Numbers */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">
          Your Numbers
        </h2>
        <p className="text-center text-sm sm:text-base mb-4">
          Your numbers have been checked against the{" "}
          <span className="text-red-600 font-semibold">Powerball Results</span>{" "}
          for the past <span className="font-semibold">365 days</span>.
          <br />
          The results are shown below with any winning matches highlighted.
        </p>
        <div className="flex justify-center space-x-4">
          {userNumbers.main.map((num) => (
            <Circle key={num} number={num} isUserNumber />
          ))}
          <Circle number={userNumbers.powerball} isPowerball isUserNumber />
        </div>
      </section>

      {/* Results Table */}
      <section>
        <div className="overflow-x-auto border-t border-b border-gray-300 rounded-md">
          <table className="w-full min-w-[600px] table-fixed text-sm sm:text-base">
            <thead className="bg-blue-900 text-white select-none align-middle">
              <tr>
                <th className="p-3 text-left w-48">Result Date</th>
                <th className="p-3 text-center">Balls Drawn</th>
                <th className="p-3 text-left w-52">You Matched</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => {
                // Check main balls matches with userNumbers.main
                const matchedMain = row.balls.filter((ball) =>
                  userNumbers.main.includes(ball),
                  
                );
                // Check powerball match
                const matchedPowerball =
                  userNumbers.powerball === row.powerball;

                // Determine if this row is winning based on matches
                const isWinningRow = matchedMain.length > 2 || matchedPowerball;

                return (
                  <tr
                    key={row.date}
                    className={`align-middle border-b  ${
                      isWinningRow ? "bg-red-600 text-white" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap font-semibold">
                      {row.date}
                    </td>
                    <td className="p-3 flex justify-center align-middle items-center space-x-3">
                      {row.balls.map((ball) => {
                        const isMatched = userNumbers.main.includes(ball);
                        return (
                          <Circle
                            key={ball}
                            number={ball}
                            isMatched={isMatched}
                            faded={!isMatched && isWinningRow}
                          />
                        );
                      })}
                      <Circle
                        number={row.powerball}
                        isPowerball
                        isMatched={matchedPowerball}
                        faded={!matchedPowerball && isWinningRow}
                      />
                    </td>
                    <td className="  font-semibold">
                      {isWinningRow ? (
                        <>
                          {/* prizeDescription and prize may need changes if dependent on backend */}
                          {/* For now, can be blank or handled differently */}
                          You have matched {matchedMain.length} main number(s)
                          {matchedPowerball ? " + the Powerball" : ""}
                        </>
                      ) : (
                        "-"
                      )}
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
