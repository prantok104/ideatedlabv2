"use client";

import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useField } from "formik";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const TrailerType = ({ label, name, zIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [field, meta, helpers] = useField(name);

  // API call to get trailer data
  const { data: trailerData } = apiClient.useAxiosSWR(apiEndpoint.trailers.default);

  const handleSelect = (data) => {
    setSelectedOption(data);
    helpers.setValue(data);
    if (data) {
      setIsOpen(false);
    }
  };

  const trailers = trailerData?.data || [];

  return (
    <div className="relative w-full mt-6 pt-2">
      <label className="text-gray-600 text-sm font-medium leading-tight ">
        {label}
      </label>
      {/* Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out"
      >
        <span
          className={
            selectedOption ? "text-sm text-[#454F5B]" : "text-[#454F5B] text-sm"
          }
        >
          {field.value ? field.value.type : "Select type"}
        </span>
        <MdOutlineKeyboardArrowDown
          size={20}
          className={`text-[#454F5B] transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`} // Rotate the arrow when opened
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute w-full mt-1 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
        }`}
        style={{
          zIndex: zIndex || 10, // Default zIndex if not passed
        }}
      >
        <ul className="max-h-60 overflow-auto">
          {trailers.map((item) => (
            <li
              key={item.id}
              className="w-full text-sm text-left py-2 px-2 font-normal text-[#454F5B] hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.type}
            </li>
          ))}
        </ul>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TrailerType;