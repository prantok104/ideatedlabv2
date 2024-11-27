"use client"
import React, { useState } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";

const OnlyTimePicker = ({
  label,
  name = "time",
  placeholder = "Select time",
  timeFormat = "HH:mm",
  ...otherOptions
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const options = [{ value: "any", label: "Any" }];

  const handleSelectChange = (selectedOption) => {
    setFieldValue(name, selectedOption?.value || null);
  };

  const handleTimeChange = (time) => {
    setFieldValue(name, time ?? null);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "46px",
      borderColor: meta.error ? "#f87171" : "#d1d5db",
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

  const CustomMenu = (props) => (
    <components.Menu {...props}>
      <div
        onClick={() => handleSelectChange({ value: "any" })}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f3f4f6")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "#000",
          width: "100%",
        }}
      >
        Any
      </div>

      <div
        className="p-2"
        style={{ zIndex: 9999, position: "relative", width: "100%" }}
      >
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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-[#f3f4f6]"
          placeholderText="Pick a time"
          {...otherOptions}
        />
      </div>
    </components.Menu>
  );

  return (
    <div className="mb-2 w-full">
      {label && (
        <label
          className={`block normal tracking-wide text-xs font-bold mb-2 ${
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
            ? { label: dayjs(field.value).format(timeFormat), value: field.value }
            : { label: "Any", value: "any" }
        }
        placeholder={placeholder}
        onChange={handleSelectChange}
        className="w-full cursor-pointer rounded-lg mb-2"
        styles={customStyles}
        components={{ Menu: CustomMenu }}
      />

      {meta.error && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
};

export default OnlyTimePicker;
