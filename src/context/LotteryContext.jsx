// context/LotteryContext.jsx
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const LotteryContext = createContext();

export const LotteryProvider = ({ children }) => {
  // Universal state that works for all lottery types
  const [selectedMain, setSelectedMain] = useState([]);
  const [selectedSecondary, setSelectedSecondary] = useState(null);
  const [hasMultiplier, setHasMultiplier] = useState(false);

  // For row-based lotteries (Win4, Numbers)
  const [selectedRows, setSelectedRows] = useState({});

  // Reset all selections
  const resetSelections = useCallback(() => {
    setSelectedMain([]);
    setSelectedSecondary(null);
    setHasMultiplier(false);
    setSelectedRows({});
  }, []);

  const value = useMemo(
    () => ({
      selectedMain,
      setSelectedMain,
      selectedSecondary,
      setSelectedSecondary,
      hasMultiplier,
      setHasMultiplier,
      selectedRows,
      setSelectedRows,
      resetSelections,
    }),
    [
      selectedMain,
      selectedSecondary,
      hasMultiplier,
      selectedRows,
      resetSelections,
    ]
  );

  return (
    <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>
  );
};

export const useLottery = () => {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error("useLottery must be used within LotteryProvider");
  }
  return context;
};
