"use client";
import { useField, useFormikContext } from "formik";
import React from "react";
import Select from "react-select";




const ReactSelectField = ({
  label,
  options = [],
  name = "select",
  isObject = true,
  ...otherOptions
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (option) => {
    setFieldValue(name, option ? (isObject ? option : option.value) : null);
  };

  // Styles
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "46px",
      borderColor: meta.touched && meta.error ? "#f87171" : "#d1d5db",
      boxShadow: state.isFocused
        ? meta.touched && meta.error
          ? "0 0 0 1px #73c002"
          : "0 0 0 1px #f87171"
        : "none",
      "&:hover": {
        borderColor: meta.touched && meta.error ? "#f87171" : "#a1a1aa",
      },
      cursor: "pointer",
      borderRadius: "8px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "#6b7280",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "0.875rem", 
      cursor: "pointer", 
      backgroundColor: state.isFocused ? "#f3f4f6" : "white", 
      color: state.isSelected ? "#10b981" : "black", 
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
    }),
  };

  // Configuarations
  const configurations = {
    isClearable: true,
    isSearchable: true,
    ...otherOptions,
  };

  return (
    <div className="mb-2 w-full">
      {label && (
        <label
          className={`block normal tracking-wide text-xs font-bold mb-2  ${
            meta.touched && meta.error ? "text-red-500" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        value={
          isObject
            ? field.value
            : options.find((option) => option.value == field.value) || null
        }
        onChange={handleChange}
        onBlur={field.onBlur}
        {...configurations}
        styles={customStyles}
        className="w-full cursor-pointer rounded-lg"
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default ReactSelectField;
