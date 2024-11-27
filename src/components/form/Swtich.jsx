"use client";

import React from "react";

const Switch = ({
  isOn,
  handleToggle,
  onColor,
  offColor,
  size = "md",
  label,
}) => {
  const sizeClasses = {
    sm: "w-10 h-5",
    md: "w-12 h-6",
    lg: "w-16 h-8",
  };

  const circleSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <div className="flex items-center mt-4">
      {label && <span className="mr-2 text-sm">{label}</span>}
      <div
        className={`${
          sizeClasses[size]
        } flex items-center cursor-pointer rounded-full p-1 transition-colors duration-300 ${
          isOn ? onColor : offColor
        }`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            circleSizeClasses[size]
          } ${isOn ? "translate-x-full" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
};

export default Switch;
