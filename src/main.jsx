import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HotNumbersProvider } from "../src/context/HotNumbersContext.jsx";
import { AdProvider } from "./context/AdProvider.jsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <HotNumbersProvider>
      <AdProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AdProvider>
    </HotNumbersProvider>
  );
}
