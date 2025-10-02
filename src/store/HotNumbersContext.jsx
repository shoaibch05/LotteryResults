// store/HotNumbersContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const HotNumbersContext = createContext();

export const HotNumbersProvider = ({ children }) => {
  const [selectedMain, setSelectedMain] = useState([]);
  const [selectedPowerball, setSelectedPowerball] = useState(null);
  const [powerPlay, setPowerPlay] = useState(false);

  const value = useMemo(() => ({
    selectedMain,
    setSelectedMain,
    selectedPowerball,
    setSelectedPowerball,
    powerPlay,
    setPowerPlay,
  }), [selectedMain, selectedPowerball, powerPlay]);

  return (
    <HotNumbersContext.Provider value={value}>
      {children}
    </HotNumbersContext.Provider>
  );
};

export const useHotNumbers = () => useContext(HotNumbersContext);
