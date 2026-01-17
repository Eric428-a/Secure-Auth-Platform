// src/components/Toast.jsx
import React, { useState, useEffect } from "react";

let toastTimer;

const Toast = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success or error

  // Expose function globally to show toast
  useEffect(() => {
    window.showToast = (msg, msgType = "success") => {
      setMessage(msg);
      setType(msgType);

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setMessage(""), 3000);
    };
  }, []);

  if (!message) return null;

  return <div className={`toast ${type}`}>{message}</div>;
};

export default Toast;
