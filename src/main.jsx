import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootswatch/dist/vapor/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SessionProvider from "./context/SessionProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>
);
