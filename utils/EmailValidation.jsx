"use client";
import { useState } from "react";

const EmailValidation = ({
  value,
  onChange,
  placeholder,
  className,
  onValidationChange,
}) => {
  const [error, setError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email) => {
    if (!email) {
      setError("Email is required");
      if (onValidationChange) onValidationChange(false);
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      if (onValidationChange) onValidationChange(false);
      return false;
    }
    setError("");
    if (onValidationChange) onValidationChange(true);
    return true;
  };

  const handleChange = (e) => {
    const newEmail = e.target.value;
    onChange(newEmail);
    validateEmail(newEmail);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded text-xs text-center ${className} ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs text-center mt-1">{error}</p>
      )}
    </div>
  );
};

export default EmailValidation;
