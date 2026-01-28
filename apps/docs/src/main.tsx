import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

// Import staple-css styles
import "@staple-css/tokens/all.css";
import "@staple-css/tokens/palettes.css";
import "@staple-css/primitives/primitives.css";

// Import local styles
import "./styles.css";
import "./styles/dark-mode.css";

// Get base path from Vite (supports GitHub Pages deployment)
const basename = import.meta.env.BASE_URL;

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
