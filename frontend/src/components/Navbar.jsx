// frontend/src/components/Navbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // use consistent key
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left side: App Brand */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Haumena Inc.
        </Link>
      </div>

      {/* Right side: Navigation Links */}
      <div className="navbar-right">
        <Link to="/" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <button
          type="button"
          className="nav-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
