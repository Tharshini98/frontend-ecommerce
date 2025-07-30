// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
  );
};

export default Loader;
