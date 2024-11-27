"use client";

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const TruckDetailsCheckbox = ({ label, value }) => {
  const { setFieldValue } = useFormikContext(); 
  const [selectedOption, setSelectedOption] = useState( value || "full");

  // Define your options
  const options = [
    { label: "Full", value: "full" },
    { label: "Partial", value: "partial" },
  ];

  // Handle change of radio button
  const handleOptionChange = (e) => {
    setFieldValue("radioGroup", e.target.value);
    setSelectedOption(e.target.value);
  };

   useEffect(() => {
     if (value) {
       setSelectedOption(value);
     }
   }, [value]);

  return (
    <div className="flex gap-4 mt-10">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="radioGroup"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className="hidden" 
          />
          <div
            className={`h-4 w-4 border-2 rounded-full flex items-center justify-center ${
              selectedOption === option.value ? "bg-[#73C002] border-[#73C002]" : "bg-white border-[#73C002]"
            }`}
          >
            {selectedOption === option.value && (
              <div className="h-2 w-2 rounded-full bg-white" /> 
            )}
          </div>
          <span className="text-gray-400 text-base font-normal leading-normal">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default TruckDetailsCheckbox;
