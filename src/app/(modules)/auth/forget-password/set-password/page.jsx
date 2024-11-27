"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import Image from "next/image";
import Forget_password_image from "../../../../../../public/asset/set-passowrd-image.webp";
import Button from "@/components/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/utils/router";
import {
  getAccessToken,
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import { apiEndpoint } from "@/utils/api-endpoint";

// Yup validation schema
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/([a-z])/, "Must include lowercase letter")
    .matches(/([A-Z])/, "Must include uppercase letter")
    .matches(/([0-9])/, "Must include a number")
    .matches(/[@$!%*#?&]/, "Must include a special character")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SetPassword = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const token = searchParam?.get("token") || getAccessToken();
  const [passwordStrength, setPasswordStrength] = useState(0);

  // if (!token) {
  //   router.push(LOGIN_ROUTE);
  // }

  console.log(token);

  // Function to check password strength based on Formik values
  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 1; // lowercase & uppercase
    }
    if (/[0-9]/.test(password)) {
      strength += 1; // number
    }
    if (/[@$!%*#?&]/.test(password)) {
      strength += 1; // special character
    }
    if (password.length >= 8) {
      strength += 1; // length of 8
    }

    setPasswordStrength(strength);
  };

  // Handle submit
  const handleSubmit = async (values) => {
    if (token) {
      try {
        if (token) {
          const payload = {
            newPassword: values?.password,
            passwordConfirmation: values?.confirmPassword,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint.auth.resetNewPassword}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            }
          );
          const responseData = await response.json();

          if (!response.ok) {
            notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
            return true;
          } else {
            notify(responseData?.message, NOTIFY_MESSAGE_SUCCESS);
            // router.push(DASHBOARD_ROUTE);
            router.push(LOGIN_ROUTE);
            if (Object.keys(responseData?.data)?.length > 0) {
              setAuthToken({
                ...responseData?.data,
              });
            }
            return true;
          }
        }
      } catch (error) {
        notify(error, NOTIFY_MESSAGE_ERROR);
      }
    } else {
      notify("Token miss match!", NOTIFY_MESSAGE_ERROR);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FFFFFF] gap-11">
      <div className="hidden md:block">
        <Image
          src={Forget_password_image}
          alt="Truck Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center md:justify-start w-full px-5 md:px-0">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-semibold text-slate-900 text-start">
            Set Password
          </h2>

          <p className="text-[#1d2838] text-base font-semibold font-public-sans leading-normal pb-2 text-justify pt-6">
            Password Strength
          </p>

          {/* Password Strength Bar */}
          <div className="w-full h-[14px] bg-gray-300 rounded-full mb-6">
            <div
              className={`h-full rounded-full ${
                passwordStrength <= 1
                  ? "bg-red-500"
                  : passwordStrength === 2
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${(passwordStrength / 4) * 100}%` }}
            ></div>
          </div>

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {
              // Use effect to check password strength whenever 'values.password' changes
              useEffect(() => {
                checkPasswordStrength(values.password);
              }, [values.password]);

              return (
                <Form className="mt-5">
                  <div>
                    <TextInput
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="mt-4 mb-5">
                    <TextInput
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                    />
                  </div>

                  {/* Password strength hints with circle icons */}
                  <div className="mt-7">
                    <div className="text-[#1d2838] text-base font-semibold font-public-sans leading-normal">
                      Password Requires Following:
                    </div>
                    <ul className="text-gray-600 text-sm mt-2 space-y-3">
                      <li className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            passwordStrength >= 1
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Lowercase & Uppercase</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            passwordStrength >= 2
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Number (0-9)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            passwordStrength >= 3
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Special Character (@, #, $, etc.)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            passwordStrength >= 4
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>At least 8 Characters</span>
                      </li>
                    </ul>
                  </div>

                  {/* Submit button */}
                  <div className="mt-5">
                    <Button type="submit" variant="base" size="large">
                      Set Password
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
