import { useField, useFormikContext } from "formik";
import { DateRangePicker } from "react-dates";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

const CustomDateRangePicker = ({ label, name }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setFieldValue(name, [ startDate, endDate ]);
  };

  return (
    <div className="relative">
      <label
        className={`block text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <div
        className={`w-full rounded border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-200"
        } bg-white text-black shadow-sm sm:text-sm`}
      >
        <DateRangePicker
          startDate={field.value[0] || null}
          startDateId="start_date_id"
          endDate={field.value[1] || null}
          endDateId="end_date_id"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
          displayFormat="MM/DD/YYYY"
          numberOfMonths={1}
          isOutsideRange={() => false} // allows past dates
        />
      </div>
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
