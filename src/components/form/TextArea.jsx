import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import TextError from "./TextError";

const TextArea = ({
  label,
  name,
  placeholder = "Enter description",
  rows = 4, // Default number of rows for TextArea
  ...rest
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={name}
        className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      {/* TextArea Field */}
      <div className="relative mt-1">
        <Field
          as="textarea"
          {...field}
          {...rest}
          id={name}
          rows={rows}
          placeholder={placeholder}
          className={`w-full rounded-md border text-black shadow-sm sm:text-sm py-3 px-5 hover:border-[#A9A9A9]
            ${meta.touched && meta.error ? "border-red-500" : "border-gray-200"}
            focus:outline-none focus:ring-1 focus:ring-[#73C002] focus:border-[#73C002]
            placeholder-gray-500 text-sm`}
        />
      </div>

      {/* Error Message */}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextArea;
