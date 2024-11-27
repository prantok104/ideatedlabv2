import { useField, useFormikContext } from "formik";
import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const ReactOnlyTimePicker = ({
  label,
  name = "time",
  placeholder = "Select time",
  timeFormat = "HH:mm",
  ...otherOptions
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const options = [
    { value: "any", label: "Any" },
    { value: "selectTime", label: "Select Time" },
  ];

  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) {
      // Set value to null when cleared
      setFieldValue(name, null);
      setShowTimePicker(false);
    } else if (selectedOption.value === "selectTime") {
      setShowTimePicker(true);
    } else {
      setShowTimePicker(false);
      setFieldValue(name, selectedOption.value);
    }
  };

  const handleTimeChange = (time) => {
    setFieldValue(name, time ?? null);
    setShowTimePicker(false);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "46px",
      borderColor:  meta.error ? "#f87171" : "#d1d5db",
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
        options={options}
        value={
          field.value && field.value !== "any"
            ? {
                label: dayjs(field.value).format(timeFormat),
                value: field.value,
              }
            : field.value === null
            ? null
            : { label: "Any", value: "any" }
        }
        placeholder={placeholder}
        onChange={handleSelectChange}
        className="w-full cursor-pointer rounded-lg mb-2"
        isClearable={true}
        styles={customStyles}
      />

      {showTimePicker && (
        <DatePicker
          selected={
            field.value && field.value !== "any" ? new Date(field.value) : null
          }
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={timeFormat}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer mt-2"
          placeholderText="Pick a time"
          {...otherOptions}
        />
      )}

      {meta.error && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
};

export default ReactOnlyTimePicker;
