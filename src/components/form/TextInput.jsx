import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextError from "./TextError";
import defaultCard from "../../../public/asset/card/defaultcard.svg"; // Ensure this path is correct
import detectCardType from "@/utils/detectCardType"; // Ensure this function returns valid paths
import Image from "next/image";

const TextInput = ({
  label,
  name,
  type = "text",
  leftIcon,
  rightIcon,
  placeholder = "Enter value",
  onChange,
  postfix,
  readOnly = false,
  transForm="uppercase",
  min ,
  max,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type !== "password"
  );
  const [cardIcon, setCardIcon] = useState(defaultCard);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Determine the icon to show for password visibility toggle
  const CurrentRightIcon =
    type === "password" && isPasswordVisible ? FaEye : FaEyeSlash;

  // Handle custom onChange for cardNumber formatting
  const handleChange = (e) => {
    let { value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\s+/g, ""); // Remove existing spaces
      value = value.replace(/(\d{4})/g, "$1 ").trim(); // Add space every 4 digits
      const icon = detectCardType(value); // Ensure this returns a valid path
      setCardIcon(icon || defaultCard); // Fallback to defaultCard if icon is not valid
    } else if (name === "expiryDate") {
      value = value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4); // Add slash after the month
      }
    }

    setValue(value);

    if (onChange) onChange(e); // Call the custom onChange handler if provided
  };

  useEffect(() => {
    if (name === "cardNumber") {
      setCardIcon(detectCardType(field.value) || defaultCard); // Detect card type on value change
    }
  }, [field.value, name]);

  return (
    <div className="relative ">
      {/* Label */}
      <label
        htmlFor={name}
        className={`block ${transForm} tracking-wide text-gray-700 text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      {/* Input Field */}
      <div className="relative flex items-center mt-1">
        {leftIcon && <span className="absolute left-3">{leftIcon}</span>}
        <Field
          {...field}
          {...rest}
          id={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          className={`w-full rounded border bg-white text-black shadow-sm sm:text-sm py-3 px-5 hover:border-[#A9A9A9]
            ${postfix ? "pr-16" : ""}
            ${meta.touched && meta.error ? "border-red-500" : "border-gray-200"}
            focus:outline-none ${
              !readOnly
                ? "focus:ring-1 focus:ring-[#73C002] focus:border-[#73C002]"
                : "bg-[#f2f2f2]"
            }
            placeholder-gray-500 text-sm`}
          onChange={!readOnly ? handleChange : undefined}
        />
        {/* Show the detected card icon */}
        {name === "cardNumber" && (
          <span className="absolute right-3">
            <Image src={cardIcon} alt="Card Type" width={30} height={20} />
          </span>
        )}
        {type === "password" ? (
          <span
            className="absolute right-3 cursor-pointer"
            onClick={!readOnly ? togglePasswordVisibility : undefined}
          >
            <CurrentRightIcon className="text-gray-500" />
          </span>
        ) : (
          rightIcon && <span className="absolute right-3">{rightIcon}</span>
        )}
        {postfix && (
          <span className="absolute right-3 text-gray-500">{postfix}</span>
        )}
      </div>

      {/* Error Message */}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextInput;
