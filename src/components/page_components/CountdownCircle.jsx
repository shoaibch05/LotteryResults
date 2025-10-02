import React, { useEffect, useState, memo } from "react";
import dayjs from "dayjs";

const Circle = ({ value, total, size = 60, strokeWidth = 6, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / total) * circumference;

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
        {/* Centered number inside circle */}
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-white mt-1">{label}</span>
    </div>
  );
};


const CountdownCircles = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = dayjs();
      const diff = dayjs(targetTime).diff(now, "second");

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="flex gap-4  items-center relative">
      <div className="relative flex align-middle">
        <Circle value={timeLeft.hours} total={24} label="Hours" />
      </div>
      <div className="relative">
        <Circle value={timeLeft.minutes} total={60} label="Minutes" />
      </div>
      <div className="relative">
        <Circle value={timeLeft.seconds} total={60} label="Seconds" />
      </div>
    </div>
  );
};

export default memo(CountdownCircles);
