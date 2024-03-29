// React
import React from "react";
// Root
import { createRoot } from "react-dom/client";
// App
import App from "./App";
// CSS
import "./styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
