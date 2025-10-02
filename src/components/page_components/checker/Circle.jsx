const Circle = ({
  number,
  isPowerball,
  isMatched,
  isUserNumber,
  small,
  faded,
}) => {
  const baseClasses =
    "flex items-center justify-center rounded-full font-semibold select-none transition-colors duration-300";
  const size = small ? "w-8 h-8 text-sm" : "w-12 h-12 text-lg";

  const bgColor = isPowerball
    ? "bg-red-700 text-white"
    : faded
    ? "bg-gray-200 text-gray-400"
    : "bg-white text-black";

  const borderColor = isPowerball
    ? "border-red-700"
    : isMatched
    ? "border-green-600"
    : "border-gray-300";

  const matchedRing = isMatched ? "ring-2 ring-green-500" : "";
  const userRing = isUserNumber && !isMatched ? "ring-2 ring-gray-400" : "";

  return (
    <div
      className={`${baseClasses} ${size} ${bgColor} border ${borderColor} ${matchedRing} ${userRing} ${
        faded && "opacity-60"
      }`}
      aria-label={isPowerball ? "Powerball " + number : number}
      title={isPowerball ? "Powerball " + number : number}
    >
      {number}
      {isMatched && (
        <span className=" text-green-500 flex flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-9 absolute -ml-2 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      )}
    </div>
  );
};
export default Circle;