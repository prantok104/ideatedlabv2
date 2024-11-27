import React from "react";
import Select from "react-select";

export default function FilterableSelect({
  label,
  name,
  defaultValue,
  onChange,
  options,
  placeholder,
  ...props
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "250px",
      //   borderColor: state.isFocused ? "#73C002" : "#73C002", // Green border for focused and unfocused
      borderColor: state.isSelected ? "#73C002" : "",
      boxShadow: state.isFocused ? "0 0 0 1px #73C002" : "none", // Green shadow on focus
      "&:hover": {
        borderColor: "#73C002",
        boxShadow: "0 0 0 1px #73C002", // Green border on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: "200px",
      zIndex: 100, // Ensure the menu appears above other elements
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#73C002"
        : state.isFocused
        ? "#F1F9E6"
        : "white",
      color: state.isSelected ? "white" : "black",
      ":hover": {
        backgroundColor: state.isSelected ? "#73C002" : "#F1F9E6",
        color: state.isSelected ? "white" : "black",
      },
    }),
  };
  return (
    <div className="z-10">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <Select
        styles={customStyles}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
