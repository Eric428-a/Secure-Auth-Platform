// frontend/src/pages/ResetPassword.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { validatePasswordMatch } from "../utils/validators";

// Google reCAPTCHA site key (replace with your production key)
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ new_password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  // Load Google reCAPTCHA script dynamically
  useEffect(() => {
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Get reCAPTCHA token from Google
  const getRecaptchaToken = async () => {
    if (window.grecaptcha) {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "reset_password" });
    }
    throw new Error("reCAPTCHA not loaded");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (!validatePasswordMatch(form.new_password, form.confirm_password)) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ Use local bypass token in development for testing
      const recaptchaToken =
        process.env.NODE_ENV === "development"
          ? "test_recaptcha_token"
          : await getRecaptchaToken();

      // Prepare payload for backend
      const payload = { token, new_password: form.new_password, confirm_password: form.confirm_password, recaptcha_token: recaptchaToken };

      const response = await authService.resetPassword(payload);
      setMessage(response.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error(err);

      // Handle backend validation errors (Pydantic / FastAPI)
      if (err?.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          setError(detail.map((d) => d.msg).join(", "));
        } else {
          setError(detail);
        }
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="page-container">
        <div className="form-card">
          <h2 style={{ color: "#ff4444" }}>Invalid Token</h2>
          <p>The password reset link is invalid or has expired.</p>
          <Link to="/" style={{ color: "#00ff88", fontWeight: "bold" }}>Go back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ color: "#00ff88", marginBottom: "20px" }}>Reset Password</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            required
          />

          <input
            className="input-field"
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {error && <div className="message" style={{ color: "#ff4444", marginTop: "12px" }}>{error}</div>}
        {message && <div className="message" style={{ color: "#00ff88", marginTop: "12px" }}>{message}</div>}

        <div className="message" style={{ marginTop: "16px", fontSize: "14px" }}>
          Remembered your password?{" "}
          <Link to="/" style={{ color: "#00ff88", fontWeight: "bold" }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
