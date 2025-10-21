import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // example: 1 hour countdown
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const resetTimer = (seconds) => setTimeLeft(seconds);
  const toggleTimer = () => setIsRunning((prev) => !prev);

  return (
    <TimerContext.Provider
      value={{ timeLeft, resetTimer, toggleTimer, isRunning }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
