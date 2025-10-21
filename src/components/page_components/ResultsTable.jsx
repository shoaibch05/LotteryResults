import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ResultsTable = ({ results, hasBonus = false }) => {
  // check globally if any row has midday / evening
  const showMidday = results.some((row) => row.midday && row.midday.length > 0);
  const showEvening = results.some(
    (row) => row.evening && row.evening.length > 0
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
          {results.map((row, idx) => (
            <tr key={idx} className="border-b text-center">
              {/* Draw Date */}
              <td className="py-3 px-4 font-medium text-blue-600 text-center">
                <Link to={`${dayjs(row.date).format("YYYY-MM-DD")}`}>
                  {dayjs(row.date).format("MMMM DD, YYYY")}
                </Link>
              </td>

              {/* Midday Numbers */}
              {showMidday && (
                <td className="py-3 px-4">
                  {row.midday && row.midday.length > 0 ? (
                    <div className="flex space-x-2 justify-center">
                      {row.midday.map((num, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                        >
                          {num}
                        </span>
                      ))}
                      {hasBonus && row.middayBonus && (
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                          {row.middayBonus}
                        </span>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              )}

              {/* Evening Numbers */}
              {showEvening && (
                <td className="py-3 px-4">
                  {row.evening && row.evening.length > 0 ? (
                    <div className="flex space-x-2 justify-center">
                      {row.evening.map((num, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                        >
                          {num}
                        </span>
                      ))}
                      {hasBonus && row.eveningBonus && (
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                          {row.eveningBonus}
                        </span>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(ResultsTable);
