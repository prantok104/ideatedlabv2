"use client";
import { useField, useFormikContext } from "formik";
import React from "react";
import Select from "react-select";

const ReactMultiSelectField = ({
  label,
  options = [],
  name = "multiSelect",
  ...otherOptions
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (selectedOptions) => {
    setFieldValue(
      name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "46px",
      borderColor: meta.touched && meta.error ? "#f87171" : "#d1d5db",
      boxShadow: state.isFocused
        ? meta.touched && meta.error
          ? "0 0 0 1px #f87171"
          : "none"
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
      border: "none",
      background: "transparent",
      boxShadow: "none",
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
 const configurations = {
   isMulti: true,
   getOptionValue: (option) => option.value,
   formatOptionLabel: (option, { context }) => {
     if (context === "menu") {
       return (
         <div
           dangerouslySetInnerHTML={{
             __html: option.customLabel || option.label,
           }}
         />
       );
     }
     return option.label;
   },
   ...otherOptions,
 };

  return (
    <div className="my-2 w-full">
      {label && (
        <label
          className={`block text-xs font-bold mb-2 ${
            meta.touched && meta.error ? "text-red-500" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        isMulti
        value={options?.filter((option) =>
          field?.value?.includes(option?.value)
        )}
        onChange={handleChange}
        onBlur={field.onBlur}
        styles={customStyles}
        className="w-full cursor-pointer rounded-lg"
        {...configurations}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default ReactMultiSelectField;
