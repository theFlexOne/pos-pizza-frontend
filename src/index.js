import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </Router>
  </React.StrictMode>
);
