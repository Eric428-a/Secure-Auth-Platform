// frontend/src/pages/Login.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

// Google reCAPTCHA site key (replace with your production key)
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

// Local dev bypass token
const LOCAL_BYPASS_TOKEN = "test_recaptcha_token";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    recaptcha_token: ""
  });

  // Dynamically load Google reCAPTCHA script (production only)
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return; // Skip in dev
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Get reCAPTCHA token
  const getRecaptchaToken = async () => {
    // Use local bypass token in dev
    if (process.env.NODE_ENV !== "production") return LOCAL_BYPASS_TOKEN;

    if (window.grecaptcha) {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "login" });
    }
    throw new Error("reCAPTCHA not loaded");
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get reCAPTCHA token (local bypass in dev)
      const recaptchaToken = await getRecaptchaToken();

      // Call backend service with payload
      const response = await authService.login({ ...form, recaptcha_token: recaptchaToken });

      // Save access token and navigate
      localStorage.setItem("access_token", response.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      // Backend may return array of details or string
      if (err?.data?.detail) {
        if (Array.isArray(err.data.detail)) {
          setError(err.data.detail.map((d) => d.msg).join(", "));
        } else {
          setError(err.data.detail);
        }
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ color: "#00ff88", marginBottom: "24px" }}>Login</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="message" style={{ color: "#ff4444", marginTop: "12px" }}>
            {error}
          </div>
        )}

        <div className="message" style={{ marginTop: "16px", fontSize: "14px" }}>
          No account yet?{" "}
          <Link to="/register" style={{ color: "#00ff88", fontWeight: "bold" }}>
            Create one
          </Link>
        </div>

        <div className="message" style={{ marginTop: "8px", fontSize: "14px" }}>
          <Link to="/reset-password-request" style={{ color: "#ffcc00", fontWeight: "bold" }}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
