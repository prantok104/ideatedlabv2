"use client";

import { useState } from "react";
import { useField, useFormikContext } from "formik";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const hazmatOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const HazmatHandle = ({
  name,
  selectName,
  inputName,
  selectPlaceholder,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [field, meta] = useField(name); // Checkbox field
  const { setFieldValue } = useFormikContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    // setFieldValue(name, e.target.checked);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    // setFieldValue(selectName, option.value); // Assign the selected value to Formik
    if (option) {
      setIsOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Checkbox - Full Column */}
      <div className="flex items-start mt-6 gap-1 col-span-3">
        <input
          type="checkbox"
          id={name}
          {...field}
          onChange={handleCheckboxChange}
          checked={isChecked}
          className="h-5 w-5  custom-checkbox" // Fully green checkbox
        />
        <label htmlFor={name} className="text-gray-700">
          Hazmat
        </label>
      </div>

      {/* Select Field - Full Column */}
      {isChecked && (
        <div className="relative w-full pt-2 col-span-4">
          <label className="text-gray-600 text-sm font-medium leading-tight">
          UN Hazmat Code
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
              {selectedOption
                ? selectedOption.label
                : selectPlaceholder || "Please select"}
            </span>
            <MdOutlineKeyboardArrowDown size={20} className="text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {hazmatOptions.map((item) => (
                  <li
                    key={item.value}
                    className="w-full text-sm text-left py-2 px-2 font-normal text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Input Field - Full Column */}
      {isChecked && (
        <div className="relative w-full pt-2 col-span-5">
          <label
            className="text-gray-600 text-sm font-medium leading-tight"
            htmlFor={inputName}
          >
            Hazmat item description
          </label>
          <input
            type="text"
            id={inputName}
            name={inputName}
            // placeholder="Enter description"
            className={`w-full border custom-input-commodities border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
            onChange={(e) => setFieldValue(inputName, e.target.value)}
          />
          {meta.touched && meta.error ? (
            <div className="text-red-500 text-sm">{meta.error}</div>
          ) : null}
        </div>
      )}

      {/* Display validation errors */}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm col-span-3">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default HazmatHandle;
