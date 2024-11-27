"use client";

import TextInput from "@/components/form/TextInput";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import Button from "@/components/button/Button";
import { BiPencil } from "react-icons/bi";
import * as Yup from "yup";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";

// Password strength helper
const checkPasswordStrength = (password) => {
  return {
    hasLowerUpper: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*#?&]/.test(password),
    minLength: password.length >= 8,
  };
};

const validationSchema = Yup.object({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/\d/, "Must include a number")
    .matches(/[@$!%*#?&]/, "Must include a special character")
    .required("New password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const LoginInfoForm = () => {
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({});
  const toggleEditMode = (resetForm) => {
    setPasswordEdit((prev) => !prev);
    resetForm();
  };

  const initialValues = {
    password: "",
    newPassword: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await apiClient.post(apiEndpoint.chnagePassword.default, values);
      if (response.status === 200) {
        NOTIFY_MESSAGE_SUCCESS("Password updated successfully");
        setPasswordEdit(false);
        resetForm();
      }
    } catch (e) {
      console.error("API Error:", e);
      NOTIFY_MESSAGE_ERROR("Failed to update password");
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, resetForm }) => {
          useEffect(() => {
            setPasswordStrength(checkPasswordStrength(values.newPassword));
          }, [values.newPassword]);

          return (
            <Form>
              <div className="flex justify-between">
                <div className="text-[#454f5b] text-xl font-semibold leading-7">
                  Login Information
                </div>
                <div>
                  {!passwordEdit ? (
                    <Button
                      variant="stroke"
                      size="small"
                      iconRight={<BiPencil />}
                      onClick={() => toggleEditMode(resetForm)}
                    >
                      Change Password
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        variant="stroke"
                        size="small"
                        type="button"
                        onClick={() => toggleEditMode(resetForm)}
                      >
                        Cancel
                      </Button>
                      <Button variant="base" size="small" type="submit">
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-6 mt-10">
                <div>
                  <TextInput
                    type="password"
                    name="password"
                    label="Current Password"
                    placeholder="Current Password"
                    disabled={!passwordEdit}
                  />
                </div>

                <div>
                  <TextInput
                    type="password"
                    name="newPassword"
                    label="New Password"
                    placeholder="New Password"
                    disabled={!passwordEdit}
                  />
                </div>

                <div>
                  <TextInput
                    type="password"
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    placeholder="Password Confirmation"
                    disabled={!passwordEdit}
                  />
                </div>
              </div>

              {/* Password validation checklist */}
              {passwordEdit && (
                <div className="mt-7">
                  <div className="text-[#1d2838] text-base font-semibold">
                    Password Requires Following:
                  </div>
                  <ul className="text-gray-600 text-sm mt-2 space-y-3">
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          passwordStrength.hasLowerUpper ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <span>Lowercase & Uppercase</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          passwordStrength.hasNumber ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <span>Number (0-9)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          passwordStrength.hasSpecialChar ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <span>Special Character (@, #, $, etc.)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          passwordStrength.minLength ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <span>At least 8 Characters</span>
                    </li>
                  </ul>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginInfoForm;
