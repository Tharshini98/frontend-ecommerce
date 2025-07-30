// src/components/ErrorMessage.jsx
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">
      {message}
    </div>
  );
};

export default ErrorMessage;
