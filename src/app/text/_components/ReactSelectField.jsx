"use client";
import { useField, useFormikContext } from "formik";
import React from "react";
import Select from "react-select";
const ReactSelectField = ({
  label = "Label",
  options = [],
  name = "select",
  isObject = true,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (option) => {
    setFieldValue(name, option ? (isObject ? option : option.value) : null);
  };

  const configurations = {
    isClearable: true,
    isSearchable: true,
  };
  return (
    <div className="mb-4">
      <label
        className={`block text-sm font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <Select
        options={options}
        value={
          isObject
            ? field.value
            : options.find((option) => option.value === field.value) || null
        }
        onChange={handleChange}
        onBlur={field.onBlur}
        {...configurations}
        className={`w-full cursor-pointer  rounded-md ${
          meta.touched && meta.error
            ? "border-red-500 border-2"
            : "border-gray-300 border-gray-300 focus:border-2 focus:border-blue-500"
        }  focus:outline-none focus-visible:outline-none`}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default ReactSelectField;
