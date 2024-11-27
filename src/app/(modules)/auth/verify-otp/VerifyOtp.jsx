"use client";

import Button from "@/components/button/Button";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
  removeRegistedEmail,
  setAuthToken,
} from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { DASHBOARD_ROUTE, USER_SELECTED_PACKAGE } from "@/utils/router";
import {
  ACCESS_TOKEN_KEY,
  REGISTERED_EMAIL,
  USER_VERIFICATION_TYPE_EMAIL,
} from "@/utils/static-const";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

// Validation schema for Formik
const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 characters")
    .required("OTP is required"),
});

const VerifyOtp = ({ userEmail }) => {
  const formik = useRef();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const router = useRouter();
  const intervalRef = useRef(null); // Store the interval ID for cleanup

  const initialValues = {
    otp: "",
    type: USER_VERIFICATION_TYPE_EMAIL,
  };

  // Function to calculate the remaining time
  const calculateRemainingTime = () => {
    const storedTime = localStorage.getItem("otpResendTimestamp");
    const currentTime = new Date().getTime();
    const timeDiff = storedTime
      ? Math.floor((currentTime - storedTime) / 1000)
      : 0;
    const remainingTime = 300 - timeDiff; // 300 seconds (5 minutes)
    return remainingTime > 0 ? remainingTime : 0;
  };
  

  // Initialize the timer based on stored timestamp
  useEffect(() => {
    const remainingTime = calculateRemainingTime();
    setTimer(remainingTime);

    if (remainingTime > 0) {
      setCanResend(false);
      startCountdown(remainingTime); 
    } else {
      setCanResend(true);
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  const startCountdown = (initialTime) => {
    clearInterval(intervalRef.current); // Clear any existing interval

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(intervalRef.current);
          setCanResend(true); // Enable resend button
          return 0;
        }
      });
    }, 1000);
  };

  const handleChange = (e, index) => {
    const newValue = e.target.value.slice(0, 1); // Allow only one character
    const otpArray = otp.slice();
    otpArray[index] = newValue;
    setOtp(otpArray);
    formik?.current?.setFieldValue("otp", otpArray.join(""));
    if (newValue && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !formik?.current?.values?.otp[index]
    ) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { data } = await apiClient.post(apiEndpoint.auth.verifyOtp, values);
      if (data?.accessToken) {
        removeRegistedEmail(REGISTERED_EMAIL);
        setAuthToken({ ...data });
        if (typeof window !== "undefined") {
          localStorage.removeItem("otpResendTimestamp");
        }
        if (data?.isUserVerified === true) {
          router.push(USER_SELECTED_PACKAGE);
        }
      }
    } catch (error) {
      if (error?.status === HTTP_UNPROCESSABLE_ENTITY) {
        formik.current.setErrors(error.errors);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  const handleResendOtp = async () => {
    try {
      await apiClient.post(apiEndpoint.auth.resendOtp, {
        value: userEmail,
        purpose: "Renew",
        type: "Email",
      });
      notify("OTP has been resent successfully", NOTIFY_MESSAGE_SUCCESS);
  
      localStorage.setItem("otpResendTimestamp", new Date().getTime());
  
      const remainingTime = calculateRemainingTime();
      setTimer(remainingTime); // Reset timer to 5 seconds
      setCanResend(false);
      startCountdown(remainingTime); // Restart the countdown
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  return (
    <div>
      <div className="text-[#1c252e] text-[28px] font-semibold font-public-sans leading-loose mb-3">
        Verifying Your Identity
      </div>
      <div>
        <span className="text-[#919eab] text-base font-normal font-public-sans leading-normal mb-6">
          We have sent the code verification to{" "}
        </span>
        <span className="text-[#141a21] text-base font-normal font-public-sans leading-normal block">
          {userEmail}
        </span>
      </div>

      <Formik
        innerRef={formik}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-600 text-xl mb-3 font-bold mt-4">
                Enter Verification Code
              </label>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    name="otp"
                    className="w-12 h-12 text-center text-xl border-0 border-gray-300 rounded-md focus:border-blue-500 mr-2 "
                    placeholder="*"
                  />
                ))}
            </div>

            <p className="mt-2 mb-4">
              Resend code in{" "}
              {canResend ? (
                <span
                  onClick={handleResendOtp}
                  className="text-[#D4AF37] cursor-pointer hover:text-[#73c002]"
                >
                  Resend
                </span>
              ) : (
                <span className="text-[#D4AF37]">
                  {Math.floor(timer / 60)}:
                  {timer % 60 < 10 ? `0${timer % 60}` : timer % 60} min
                </span>
              )}
            </p>
            <Button
              type="submit"
              size="xlarge"
              variant={isValid ? "base" : "disabled"}
              disabled={isSubmitting}
            >
              Submit OTP
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOtp;
