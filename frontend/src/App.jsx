// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Authentication & Main Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Email Verification */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify" element={<VerifyEmail />} /> {/* Supports existing email links */}

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={<h1 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
