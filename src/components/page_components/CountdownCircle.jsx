import React, { useEffect, useState, memo } from "react";

const Circle = ({ value, total, size = 60, strokeWidth = 6, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total ? (value / total) * circumference : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-red-300"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white transition-all duration-1000 ease-linear"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>

        {/* Center number */}
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-white mt-1">{label}</span>
    </div>
  );
};

const CountdownCircle = ({ timeLeft }) => {
  const [parsedTime, setParsedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof timeLeft === "string") {
      // Match from "02d 03h 15m 20s"
      const match = timeLeft.match(/(\d{2})d\s+(\d{2})h\s+(\d{2})m\s+(\d{2})s/);

      if (match) {
        const [, days, hours, minutes, seconds] = match.map(Number);

        // ✅ Convert total hours = (days * 24) + hours
        const totalHours = days * 24 + hours;

        setParsedTime({
          hours: totalHours,
          minutes,
          seconds,
        });
      } else {
        setParsedTime({ hours: 0, minutes: 0, seconds: 0 });
      }
    }
  }, [timeLeft]);

  return (
    <div className="flex gap-4 items-center relative">
      <Circle value={parsedTime.hours} total={72} label="Hours" />
      <Circle value={parsedTime.minutes} total={60} label="Minutes" />
      <Circle value={parsedTime.seconds} total={60} label="Seconds" />
    </div>
  );
};

export default memo(CountdownCircle);
