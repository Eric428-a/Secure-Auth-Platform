// frontend/src/pages/VerifyEmail.jsx

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Invalid or missing verification link.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        // Call backend verification endpoint
        const res = await authService.verifyEmail(token);

        // Display success message
        setMessage(res.message || "Email successfully verified!");

        // Redirect to login after 3 seconds
        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        console.error(err);

        // Handle backend errors gracefully
        if (err?.data?.detail) {
          if (Array.isArray(err.data.detail)) {
            setError(err.data.detail.map((d) => d.msg).join(", "));
          } else {
            setError(err.data.detail);
          }
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError("Email verification failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ color: "#00ff88", marginBottom: "16px" }}>Email Verification</h2>

        {loading && (
          <p className="message" style={{ color: "#ffffff" }}>
            Verifying your email...
          </p>
        )}

        {!loading && message && (
          <p className="message" style={{ color: "#00ff88", marginTop: "12px" }}>
            {message}
          </p>
        )}

        {!loading && error && (
          <p className="message" style={{ color: "#ff4444", marginTop: "12px" }}>
            {error}
          </p>
        )}

        {!loading && (message || error) && (
          <div style={{ marginTop: "20px", fontSize: "14px" }}>
            <Link to="/" style={{ color: "#00ff88", fontWeight: "bold" }}>
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
