import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HotNumbersProvider } from "./store/HotNumbersContext.jsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <HotNumbersProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </HotNumbersProvider>
  );
}
