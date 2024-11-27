import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const ReactDatePickerField = ({
  label,
  name = "time",
  placeholder = "Select time",
  dateFormat = "DD-MM-YYYY", 
  ...otherOptions
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  // Handle date change
  const handleDateChange = (date) => {
    setFieldValue(name, date ?? null);
  };

  // Custom Menu component to display DatePicker inside Select menu
  const CustomMenu = (props) => (
    <components.Menu {...props}>
      <div>
        <DatePicker
          selected={field.value ? new Date(field.value) : null} 
          onChange={handleDateChange}
          inline 
          dateFormat={dateFormat}
          {...otherOptions}
        />
      </div>
    </components.Menu>
  );

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "46px",
      borderColor:  meta.error ? "#f87171" : "#d1d5db",
      boxShadow: state.isFocused
        ?  meta.error
          ? "0 0 0 1px #f87171"
          : "none"
        : "none",
      "&:hover": {
        borderColor:  meta.error ? "#f87171" : "#a1a1aa",
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
        placeholder={placeholder}
        value={
          field.value
            ? {
                label: dayjs(field.value).format(dateFormat),
                value: field.value,
              }
            : null
        }
        onChange={(option) => {
          const date = option ? new Date(option.value) : null;
          handleDateChange(date);
        }}
        components={{ Menu: CustomMenu }}
        onBlur={field.onBlur}
        styles={customStyles}
        className="w-full cursor-pointer rounded-lg"
        isClearable={true}
      />
      {meta.error && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
};

export default ReactDatePickerField;
