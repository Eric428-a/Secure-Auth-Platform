// frontend/src/components/Button.jsx
import React from "react";

const Button = ({ text, type = "button", onClick }) => {
  return (
    <button type={type} className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
