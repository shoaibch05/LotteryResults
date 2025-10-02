import { memo } from "react";

const DateRangeSelector = () => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <span>From:</span>
        <input type="date" className="px-2 py-1 rounded text-black" />
      </div>
      <div className="flex items-center space-x-2">
        <span>To:</span>
        <input type="date" className="px-2 py-1 rounded text-black" />
      </div>
      <button className="bg-gray-100 text-blue-600 font-semibold px-4 py-2 rounded">
        Filter Numbers
      </button>
    </div>
  );
};

export default memo(DateRangeSelector);
        