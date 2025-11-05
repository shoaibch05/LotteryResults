import { memo, useState } from "react";

const DateRangeSelector = ({ onFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleFilter = () => {
    // console.log("Filter from:", fromDate, "to:", toDate);
    if (onFilter) onFilter(fromDate, toDate);
    // or call a parent function here: onFilter(fromDate, toDate);
  };
  return (
    <div className="bg-blue-600 sm:h-36 text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <span>From:</span>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span>To:</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
      </div>
      <button
        className="bg-gray-100 text-blue-600 font-semibold px-4 py-2 rounded"
        onClick={handleFilter}
      >
        Filter Numbers
      </button>
    </div>
  );
};

export default memo(DateRangeSelector);
