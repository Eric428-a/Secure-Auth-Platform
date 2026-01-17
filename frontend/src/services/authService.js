// frontend/src/services/authService.js

import axios from "axios";

// =========================
// Base API URL
// =========================
const API_BASE = "http://localhost:8000/auth/auth"; // Matches backend routes

// =========================
// Axios instance
// =========================
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// =========================
// Auth Service Functions
// =========================

/**
 * Register a new user
 * @param {Object} data - Registration data including first_name, last_name, surname, email, etc.
 * @returns {Object} - API response
 */
const register = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    // Provide clear error messages for frontend
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        throw new Error(error.response.data.detail.map((d) => d.msg).join(", "));
      } else {
        throw new Error(error.response.data.detail);
      }
    }
    throw new Error("Registration failed. Please try again.");
  }
};

/**
 * Login user
 * @param {Object} data - { email, password, recaptcha_token }
 * @returns {Object} - API response including access token
 */
const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Login failed. Please check your credentials.");
  }
};

/**
 * Verify email using token
 * @param {string} token - Verification token
 * @returns {Object} - API response message
 */
const verifyEmail = async (token) => {
  try {
    const response = await api.get("/verify-email", { params: { token } });
    return response.data;
  } catch (error) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Email verification failed.");
  }
};

/**
 * Request password reset
 * @param {Object} data - { email, recaptcha_token }
 * @returns {Object} - API response message
 */
const requestPasswordReset = async (data) => {
  try {
    const response = await api.post("/password-reset-request", data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Password reset request failed.");
  }
};

/**
 * Reset password using token
 * @param {Object} data - { token, new_password, confirm_password }
 * @returns {Object} - API response message
 */
const resetPassword = async (data) => {
  try {
    const response = await api.post("/password-reset", data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Password reset failed.");
  }
};

// =========================
// Export Auth Service
// =========================
export default {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};
