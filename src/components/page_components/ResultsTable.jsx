import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ResultsTable = ({ results, hasBonus = false }) => {
  const showMidday = results.some(
    (row) => row.midday && row.midday.numbers?.length > 0
  );
  const showEvening = results.some(
    (row) => row.evening && row.evening.numbers?.length > 0
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="py-3 px-4">Draw Date</th>
            {showMidday && <th className="py-3 px-4">Midday</th>}
            {showEvening && <th className="py-3 px-4">Evening</th>}
          </tr>
        </thead>

        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-6 text-center text-gray-500 italic">
                No results found for the selected date range.
              </td>
            </tr>
          ) : (
            results.map((row, idx) => (
              <tr key={idx} className="border-b text-center">
                {/* Date */}
                <td className="py-3 px-4 font-medium text-blue-600 text-center">
                  <Link
                    to={`${row.id}/${dayjs(row.date).format("YYYY-MM-DD")}`}
                  >
                    {row.date}
                  </Link>
                </td>

                {/* Midday */}
                {showMidday && (
                  <td className="py-3 px-4 max-w-[150px] break-words  ">
                    {row.midday?.numbers?.length > 0 ? (
                      <div className="flex flex-wrap space-x-2 space-y-2 justify-center">
                        {row.midday.numbers.map((num, i) => (
                          <span
                            key={i}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                          >
                            {num}
                          </span>
                        ))}
                        {hasBonus && row.midday.bonusNumber && (
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                            {row.midday.bonusNumber}
                          </span>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                )}

                {/* Evening */}
                {showEvening && (
                  <td className="py-3 px-4 max-w-[150px] break-words">
                    {row.evening?.numbers?.length > 0 ? (
                      <div className="flex flex-wrap space-y-2 space-x-2 justify-center">
                        {row.evening.numbers.map((num, i) => (
                          <span
                            key={i}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                          >
                            {num}
                          </span>
                        ))}
                        {hasBonus && row.evening.bonusNumber && (
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                            {row.evening.bonusNumber}
                          </span>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default memo(ResultsTable);
