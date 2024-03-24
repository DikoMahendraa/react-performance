import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

import LoginPage from "./axios-instance";
import DashboardPage from "./axios-instance/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
);
