import { memo } from "react";
import { Outlet } from "react-router-dom";

const Jackpots = memo(() => {
  return <Outlet />;
});

Jackpots.displayName = "Jackpots";

export default Jackpots;
