import { memo, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const ResultsTable = ({ results, hasBonus = false, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const showMidday = results.some(
    (row) => row.midday && row.midday.numbers?.length > 0
  );
  const showEvening = results.some(
    (row) => row.evening && row.evening.numbers?.length > 0
  );

  // Calculate pagination
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = useMemo(
    () => results.slice(startIndex, endIndex),
    [results, startIndex, endIndex]
  );

  // Reset to page 1 when results change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Results Info */}
      {results.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {startIndex + 1} to {Math.min(endIndex, results.length)} of{" "}
          {results.length} results
        </div>
      )}

      {/* Table */}
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
                <td
                  colSpan={3}
                  className="py-6 text-center text-gray-500 italic"
                >
                  No results found for the selected date range.
                </td>
              </tr>
            ) : (
              currentResults.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b text-center hover:bg-gray-50 transition-colors"
                >
                  {/* Date */}
                  <td className="py-3 px-4 font-medium text-blue-600 text-center">
                    <Link
                      to={`${dayjs(row.date).format("YYYY-MM-DD")}`}
                      className="hover:underline"
                    >
                      {row.date}
                    </Link>
                  </td>

                  {/* Midday */}
                  {showMidday && (
                    <td className="py-3 px-4 max-w-[150px] wrap-break-word">
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
                    <td className="py-3 px-4 max-w-[150px] wrap-break-word">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-3 py-2 text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? "bg-blue-700 text-white border-blue-700"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ResultsTable);
