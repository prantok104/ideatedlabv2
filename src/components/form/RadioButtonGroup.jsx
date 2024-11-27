"use client";

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const RadioButtonGroup = ({ label, name="radioGroup", value, options =[], direction="col" }) => {
  const { setFieldValue } = useFormikContext();
  const [selectedOption, setSelectedOption] = useState(value || "full");

  // Handle change of radio button
  const handleOptionChange = (e) => {
    setFieldValue(name, e.target.value);
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  return (
    <div className={`flex gap-4 flex-${direction}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center cursor-pointer`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div
            className={`h-5 w-5 border-2 rounded-full flex items-center justify-center ${
              selectedOption === option.value
                ? "bg-[#73C002] border-[#73C002]"
                : "bg-white border-[#73C002]"
            }`}
          >
            {selectedOption === option.value && (
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            )}
          </div>
          <span className="text-gray-400 text-base font-normal leading-normal ml-2">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
