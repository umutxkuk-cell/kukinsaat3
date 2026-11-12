import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./typography.css";
import "./premium-top.css";
import "./theme-603010.css";
import "./header-layout.css";
import "./redesign.css";
import "./motion.css";
import "./cursor.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
