"use client";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { postOptions } from "@/utils/home-static-data";
import { useState } from "react";
import SpecificGroupSelect from "./SpecificGroupSelect";
import { useField } from "formik";

const PostOptions = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options] = useState(postOptions); 
  const [field, meta, helpers] = useField(name); 

  // Handle option selection and close dropdown
  const handleSelect = (option) => {
    helpers.setValue(option); // Set the selected option value in Formik
    setIsOpen(false);
  };

  return (
    <div className="flex gap-4">
      <div className="relative w-full max-w-xs px-2 py-4">
        {/* Main Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between border border-gray-300 bg-white py-3 px-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out"
        >
          <span className="text-sm text-[#454F5B]">
            {field.value ? field.value.title : "Please select"}
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
          className={`absolute w-[138px] bg-[#FFFFFF] rounded-lg max-h-60 overflow-auto transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full text-sm text-left py-2 px-2 font-normal text-[#454F5B] hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              {option.title}
            </button>
          ))}
        </div>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>

      {/* Show Specific Group Select if specific option is selected */}
      {field.value?.id === 3 && (
        <SpecificGroupSelect name={`${name}.specificGroup`} />
      )}
    </div>
  );
};

export default PostOptions;
