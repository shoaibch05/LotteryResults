// src/components/NumbersDisplay.jsx
import { memo } from "react";
import winnericon from "../../assets/winners.svg";

const NumbersDisplay = ({ title, numbers = [], winners }) => {
  return (
    <div className="bg-white shadow-md  p-4 flex flex-col items-center w-[150] md:w-1/2">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap justify-center gap-3 mb-3">
        {numbers.map((num, idx) => {
          const [label, value] = num.includes(":")
            ? num.split(":")
            : [null, num];

          return (
            <div
              key={idx}
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400 text-lg font-bold"
            >
              {label ? value : num}
            </div>
          );
        })}
      </div>

      <table className="w-full text-center">
        <tbody>
          <tr className="border border-gray-300">
            <td className="font-semibold flex items-center justify-center gap-2">
              <span>
                <img
                  src={winnericon}
                  width={50}
                  height={50}
                  alt="winners"
                  decoding="async"
                />
              </span>
              <span>{winners}</span>
              <span className="italic text-sm text-gray-500">Winners</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default memo(NumbersDisplay);
