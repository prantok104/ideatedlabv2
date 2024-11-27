"use client";

import { useField } from "formik";
import Select from "react-select";

const SearchableSelect = ({
  label,
  name,
  options = [], // Default to empty array
  disabled,
  isMulti = false,
  placeholder = "Select...",
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption) => {
    if (isMulti) {
      helpers.setValue(
        selectedOption ? selectedOption.map((option) => option.value) : []
      );
    } else {
      helpers.setValue(selectedOption ? selectedOption.value : "");
      if (onChange) {
        onChange(selectedOption);
      }
    }
  };

  const selectedValue = isMulti
    ? options.filter((option) => field.value && field.value.includes(option.value))
    : options.find((option) => option.value === field.value) || null;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor:
        meta.touched && meta.error
          ? "#ef4444"
          : state.isFocused
          ? "#73C002"
          : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 1px #73C002" : "none",
      padding: "4px 8px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e7eb",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#73C002" : "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F1F9E6",
        color: "black",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
      fontSize: "0.875rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="z-30">
      <label
        htmlFor={name}
        className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <Select
        id={name}
        name={name}
        options={options}
        isMulti={isMulti}
        isDisabled={disabled}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        className={`react-select-container shadow-sm ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-200"
        }`}
        classNamePrefix="react-select"
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SearchableSelect;
