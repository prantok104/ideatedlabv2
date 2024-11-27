import React from "react";
import { useField } from "formik";

const DateRangePicker = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    // Check if the end date is earlier than the start date
    if (
      field.value.endDate &&
      new Date(startDate) > new Date(field.value.endDate)
    ) {
      helpers.setError("Start date cannot be after end date.");
    } else {
      helpers.setValue({
        ...field.value,
        startDate,
      });
    }
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    // Check if the start date is later than the end date
    if (
      field.value.startDate &&
      new Date(endDate) < new Date(field.value.startDate)
    ) {
      helpers.setError("End date cannot be before start date.");
    } else {
      helpers.setValue({
        ...field.value,
        endDate,
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex space-x-4">
        <input
          type="date"
          value={field.value.startDate || ""}
          onChange={handleStartDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Start Date"
          id={`${name}-start`}
        />
        <span className="mx-2">-</span>
        <input
          type="date"
          value={field.value.endDate || ""}
          onChange={handleEndDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="End Date"
          id={`${name}-end`}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
