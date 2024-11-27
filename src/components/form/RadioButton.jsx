"use client";

import { Field, useField } from "formik";
import { useState } from "react";
const RadioButton = ({
  label,
  name,
  value,
  onChange,
  labelPosition = true,
  isSelected = false,
  ...rest
}) => {
  const [field, meta] = useField({ name, type: "radio", value });
  const handleChange = (event) => {
    // Ensure Formik updates its state
    if (rest.onChange) {
      rest.onChange(event);
    } else {
      field.onChange(event);
    }
    // Custom onChange handler (if any)
    if (onChange) {
      onChange(event, event.target.value);
    }
  };
  return (
    <div
      className={`flex ${
        labelPosition === "bottom" ? "flex-col " : "flex-row items-center"
      }`}
    >
      {/* Radio Button */}
      <Field
        type="radio"
        {...field}
        {...rest}
        id={`${name}_${value}`}
        value={value}
        className={`custom-radio mr-2 block uppercase tracking-wide text-gray-700 text-xs font-bold  ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-200"
        }`}
        checked={isSelected}
        onChange={handleChange}
      />
      <label htmlFor={`${name}_${value}`} className="text-base font-normal">
        {label}
      </label>
    </div>
  );
};
export default RadioButton;
