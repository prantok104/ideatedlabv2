"use client";

import React from "react";

const SearchField = (props) => {
  // disstructure the props here
  const { placeholder, onChange, value, bottomText } = props;

  return (
    <>
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        onChange={onChange}
        value={value}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <p className="text-sm mb-4 text-slate-500">{bottomText}</p>
    </>
  );
};

export default SearchField;
