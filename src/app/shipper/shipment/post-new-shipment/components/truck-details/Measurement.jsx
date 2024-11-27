"use client";

import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// const units = [
//   { value: "inches", label: "Inches" },
//   { value: "feet", label: "Feet" },
//   { value: "cm", label: "Centimeters" },
//   { value: "m", label: "Meters" },
// ];

const Measurement = ({ label, name, placeholder, unitName, type="length" }) => {
  const [field, meta] = useField(name); // For the measurement value
  const { setFieldValue } = useFormikContext(); // To manually set form values for the unit
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFieldValue(unitName, option.value); // Assign the selected value to Formik
    if (option) {
      setIsOpen(false);
    }
  };

  const {data:unit, isLoading, mutate} = apiClient.useAxiosSWR(apiEndpoint.utils.measurements, {});
  const {length, weight} = unit?.data ?? {};

  const units = type == "length" ? length : weight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* Input for height or weight */}
      <div className="relative w-full mt-6 pt-2 col-span-8">
        <label
          className="text-gray-600 text-sm font-medium leading-tight"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type="text"
          id={name}
          {...field}
          placeholder={placeholder}
          className={`w-full border custom-input-commodities border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out ${
            meta.touched && meta.error ? "border-red-500" : ""
          } placeholder-custom`}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>

      {/* Dropdown for units */}
      <div className="relative w-full mt-6 pt-2 col-span-4">
        <div className="relative w-full col-span-4">
          <label className="text-gray-600 text-sm font-medium leading-tight">
            Units
          </label>
          {/* Main Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out"
          >
            <span
              className={selectedOption ? "text-xs" : "text-gray-400 text-sm"}
            >
              {selectedOption ? selectedOption.name : "Unints"}
            </span>
            <MdOutlineKeyboardArrowDown size={20} className="text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {units.map((item) => (
                  <li
                    key={item.value}
                    className="w-full text-sm text-left py-2 px-2 font-normal text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Measurement;
