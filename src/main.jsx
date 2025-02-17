import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BackpackConfigurator from "./BackpackConfigurator";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BackpackConfigurator />
  </StrictMode>
);
