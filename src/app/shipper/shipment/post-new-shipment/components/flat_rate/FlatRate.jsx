"use client";

import { useField, useFormikContext } from "formik";
import { useState } from "react";

const FlatRate = ({
  label,
  name,
  placeholder,
  prefix,
  suffix,
  checkboxLabel,
  checkboxName,
}) => {
  const [field, meta] = useField(name); // Input field
  const [checkboxField] = useField(checkboxName); // Checkbox field from Formik
  const { setFieldValue } = useFormikContext(); // To manually set form values

  const isChecked = checkboxField.value; // Determine if checkbox is checked

  return (
    <div className="">
      {/* Input with Prefix and Suffix */}
      <div className="relative w-2/6 min-w-2/6 mt-6 pt-2">
        <label
          className="text-gray-600 text-sm font-medium leading-tight"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="flex items-center mt-2 border border-gray-300 rounded-lg focus-within:ring-slate-600">
          {/* Prefix */}
          <span className="pl-3 text-[#919EAB]">{prefix}</span>
          {/* Input Field */}
          <input
            type="text"
            id={name}
            {...field}
            name={name}
            placeholder={placeholder}
            className={`flex-1 border-none outline-none py-3 px-2 bg-transparent ${
              meta.touched && meta.error ? "border-red-500" : ""
            } placeholder-custom`}
          />
          {/* Suffix */}
          <span className="pr-3 text-gray-500 whitespace-nowrap">{suffix}</span>
        </div>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>

      <p className="text-[#454f5b] text-lg font-semibold  leading-normal mt-4 mb-6">
        Allow Request From
      </p>

      <p className="text-[#454f5b] text-lg font-normal leading-normal">
        Who from the post options can request to book?
      </p>

      <div className="relative w-full mt-4 pt-2 flex items-center">
        <input
          type="checkbox"
          id={`${name}-checkbox`}
          className="mr-2 w-5 h-5 rounded-full custom-checkbox-two"
          checked={isChecked}
          onChange={(e) => setFieldValue(checkboxName, e.target.checked)}
        />
        <label
          htmlFor={`${name}-checkbox`}
          className="text-[#919eab] text-sm font-normal leading-tight"
        >
          {checkboxLabel}
        </label>
      </div>
    </div>
  );
};

export default FlatRate;
