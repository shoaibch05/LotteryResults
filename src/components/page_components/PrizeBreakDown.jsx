// src/components/PrizeBreakdownTable.jsx
import { memo } from "react";

const PrizeBreakdownTable = ({ title, data, totals }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full md:w-1/2">
      <h3 className="text-lg font-semibold mb-3">{title} Prize Breakdown</h3>
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className=" border-b bg-blue-950 text-white">
            <th className="py-2 px-3 font-bold">Category</th>
            <th className="py-2 px-3 font-bold">Winners</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b last:border-none">
              <td className="py-2 px-3">{row.category}</td>
              <td className="py-2 px-3">{row.winners}</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="py-2 px-3">Totals</td>
            <td className="py-2 px-3">{totals}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default memo(PrizeBreakdownTable);
