// src/components/SuccessMessage.jsx
import React from "react";

const SuccessMessage = ({ message }) => {
  return (
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-sm">
      {message}
    </div>
  );
};

export default SuccessMessage;
