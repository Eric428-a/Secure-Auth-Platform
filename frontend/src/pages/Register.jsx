// frontend/src/pages/Register.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { validateEmail, validatePasswordMatch } from "../utils/validators";

// Google reCAPTCHA site key (replace with your production key)
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

// Local dev bypass token
const LOCAL_BYPASS_TOKEN = "test_recaptcha_token";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    surname: "",
    email: "",
    date_of_birth: "", // YYYY-MM-DD
    country: "",
    address: "",
    password: "",
    confirm_password: "",
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
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "register" });
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

    // Validate email format
    if (!validateEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    // Validate password match
    if (!validatePasswordMatch(form.password, form.confirm_password)) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Get reCAPTCHA token (local bypass in dev)
      const recaptchaToken = await getRecaptchaToken();

      // Prepare payload exactly as backend expects
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        surname: form.surname,
        email: form.email,
        date_of_birth: form.date_of_birth,
        country: form.country,
        address: form.address,
        password: form.password,
        confirm_password: form.confirm_password,
        recaptcha_token: recaptchaToken
      };

      console.log("Register payload:", payload); // Debug payload

      // Call backend service
      await authService.register(payload);

      alert("Registration successful! Please verify your email.");
      navigate("/");
    } catch (err) {
      console.error(err);

      // Handle backend validation errors
      if (err?.data?.detail) {
        if (Array.isArray(err.data.detail)) {
          setError(err.data.detail.map((d) => d.msg).join(", "));
        } else {
          setError(err.data.detail);
        }
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 style={{ marginBottom: "24px", color: "#00ff88" }}>Create Account</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="surname"
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
            required
          />
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
            type="date"
            name="date_of_birth"
            placeholder="Date of birth"
            value={form.date_of_birth}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
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
          <input
            className="input-field"
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <div className="message" style={{ color: "#ff4444", marginTop: "12px" }}>
            {error}
          </div>
        )}

        <div className="message" style={{ marginTop: "16px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#00ff88", fontWeight: "bold" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
