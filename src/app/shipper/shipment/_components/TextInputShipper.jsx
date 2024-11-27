"use client";

import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import TextError from "@/components/form/TextError";

const TextInputShipper = ({ label, name, type = "text", ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative my-2">
      {/* Label */}
      <label
        htmlFor={name}
        className={"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "}
      >
        {label}
      </label>

      {/* Input Field */}
      <div className="relative flex items-center mt-1">
        <Field
          {...field}
          {...rest}
          id={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          className={`w-full  rounded-md border text-black shadow-sm sm:text-sm p-3
            ${meta.touched && meta.error ? "border-red-500" : ""}
            ${
              meta.touched && !meta.error && field.value
                ? "border-green-500 bg-green-50"
                : ""
            }
            ${
              rest.disabled
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-200"
            }
            focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
        />
      </div>

      {/* Error Message */}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextInputShipper;
