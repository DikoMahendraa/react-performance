import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

import LoginPage from "./axios-instance";
import DashboardPage from "./axios-instance/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageOptimization from "./images-optimization";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/image-optimization" element={<ImageOptimization />} />
    </Routes>
  </Router>
);

// Conditionally render React.StrictMode based on environment
if (process.env.NODE_ENV === "production") {
  root.render(<React.StrictMode>{App}</React.StrictMode>);
} else {
  root.render(App);
}
