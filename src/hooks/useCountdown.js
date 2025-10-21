// src/hooks/useCountdown.js
import { useEffect, useState, useMemo } from "react";

export default function useCountdown(nextDrawDate) {
  const [timeLeft, setTimeLeft] = useState("00d 00h 00m 00s"); // Fixed initial state to prevent CLS

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = new Date(nextDrawDate).getTime() - Date.now();

      if (diff <= 0) {
        return "Drawing soon...";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // Fixed width format to prevent layout shifts
      return `${days.toString().padStart(2, "0")}d ${hours
        .toString()
        .padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds
        .toString()
        .padStart(2, "0")}s`;
    };

    const update = () => {
      setTimeLeft(calculateTimeLeft());
    };

    update();

    // on every one seconds it updates
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextDrawDate]);

  return timeLeft;
}
