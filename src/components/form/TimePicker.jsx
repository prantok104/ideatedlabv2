"use client";
import { useField } from "formik";

const TimePicker = ({
  label,
  name,
  placeholder = "Select a date",
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="mb-6">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type="time"
          className={`w-full appearance-none block text-gray-700 border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#73C002] focus:border-[#73C002]
            ${meta.touched && meta.error ? "border-red-500" : ""}
            placeholder-gray-500 text-sm`} // Uniform placeholder and size
          placeholder={placeholder} // Apply placeholder prop
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TimePicker;
