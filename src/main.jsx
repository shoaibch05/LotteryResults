import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AdProvider } from "./context/AdProvider.jsx";
import { LotteryProvider } from "./context/LotteryContext.jsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <LotteryProvider>
      <AdProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AdProvider>
    </LotteryProvider>
  );
}
