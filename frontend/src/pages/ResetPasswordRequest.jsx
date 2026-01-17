// frontend/src/pages/ResetPasswordRequest.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

// Google reCAPTCHA site key (replace with your production key)
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Dynamically load Google reCAPTCHA script
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
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "password_reset_request" });
    }
    throw new Error("reCAPTCHA not loaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // ✅ Use local bypass token in development for testing
      const recaptchaToken =
        process.env.NODE_ENV === "development"
          ? "test_recaptcha_token"
          : await getRecaptchaToken();

      // Prepare payload exactly as backend expects
      const payload = {
        email: email,
        recaptcha_token: recaptchaToken,
      };

      // Call backend service
      const res = await authService.requestPasswordReset(payload);
      setMessage(res.message || "Reset email sent successfully. Check your inbox!");
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
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ color: "#00ff88", marginBottom: "12px" }}>Reset Password</h2>
        <p className="message" style={{ marginBottom: "20px", fontSize: "14px" }}>
          Enter your email address to receive a password reset link.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {error && (
          <div className="message" style={{ color: "#ff4444", marginTop: "12px" }}>
            {error}
          </div>
        )}

        {message && (
          <div className="message" style={{ color: "#00ff88", marginTop: "12px" }}>
            {message}
          </div>
        )}

        <div className="message" style={{ marginTop: "16px", fontSize: "14px" }}>
          Remembered your password?{" "}
          <Link to="/" style={{ color: "#00ff88", fontWeight: "bold" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
