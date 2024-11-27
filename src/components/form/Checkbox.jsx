"use client";
import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
import TextError from "./TextError";

const Checkbox = ({
  label,
  name,
  value,
  size = "h-4 w-4",
  checked,
  onChange,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const [isChecked, setCheck] = useState(checked); // convert value to boolean

  return (
    <div className="flex items-center my-2">
      {/* Checkbox Field */}
      <Field
        type="checkbox"
        {...field}
        {...rest}
        id={name}
        value={value}
        className={`custom-checkbox ${size} mr-2 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-200"
        }`}
        checked={checked}
        onChange={(e) => {
          field.onChange(e);
          if (onChange) {
            onChange(e, e.target.value);
            setCheck(e.target.checked);
          }
        }}
      />

      {/* Label */}
      <label
        htmlFor={name}
        className={`text-sm ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      {/* Error Message */}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Checkbox;
