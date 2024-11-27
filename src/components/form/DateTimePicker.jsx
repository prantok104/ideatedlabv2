"use client";
import { useField } from "formik";

const DateTimePicker = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full ">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={name}
            type="datetime-local"
            className={`w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
              meta.touched && meta.error ? "border-red-500" : ""
            }`}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-red-500 text-xs">{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
