// frontend/src/components/Input.jsx
import React from "react";

const Input = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <input
      className="input-field"
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      required
    />
  );
};

export default Input;
