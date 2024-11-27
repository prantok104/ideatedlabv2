"use client";
import Button from "@/components/button/Button";
import RadioButton from "@/components/form/RadioButton";
import TextError from "@/components/form/TextError";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  buildRouterUrl,
  getRegistedEmail,
  notify,
  NOTIFY_MESSAGE_ERROR,
  setAuthToken,
  setRegistedEmail,
} from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { LOGIN_ROUTE, SEND_OTP_ROUTE } from "@/utils/router";
import {
  REGISTERED_EMAIL,
  USER_RESPONSIBILITY_ADMIN,
  USER_TYPE_BROKER,
  USER_TYPE_CARRIER,
  USER_TYPE_SHIPPER,
} from "@/utils/static-const";
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { object } from "yup";
import Img from "../../../../../public/asset/website-images/resgistration-side-image.jpeg";
import Logo from "../../../../../public/asset/website-images/registration-logo.svg";
import Carrier from "../../../../../public/asset/truck.svg";
import Shipper from "../../../../../public/asset/shipper.svg";
import Broker from "../../../../../public/asset/broker.svg";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import VerifyOtp from "../verify-otp/VerifyOtp";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const userTypes = [
  {
    label: USER_TYPE_CARRIER,
    value: USER_TYPE_CARRIER,
  },
  {
    label: USER_TYPE_SHIPPER,
    value: USER_TYPE_SHIPPER,
  },
  {
    label: USER_TYPE_BROKER,
    value: USER_TYPE_BROKER,
  },
];
const images = [
  {
    carrier: Carrier,
  },
  {
    shipper: Shipper,
  },
  {
    broker: Broker,
  },
];
// Password strength helper
const checkPasswordStrength = (password) => {
  let strength = 0;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[@$!%*#?&]/.test(password)) strength += 1;
  if (password.length >= 8) strength += 1;
  return strength;
};

const registerValidationSchema = object().shape({
  userType: Yup.string().required("The userType field is required"),
  firstName: Yup.string().required("The  first name is required"),
  lastName: Yup.string().required("The lastname is required"),
  email: Yup.string().email("Invalid Email").required("The email is requird"),
  phone: Yup.string().required("The phone is requird"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/([a-z])/, "Must include lowercase letter")
    .matches(/([A-Z])/, "Must include uppercase letter")
    .matches(/([0-9])/, "Must include a number")
    .matches(/[@$!%*#?&]/, "Must include a special character")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  companyName: Yup.string().required("The company name is required"),
  bin: Yup.string().required("BIN field is required"),
});
export default function Register() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const formikRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userTypeFromQuery = searchParams.get("module");
  const selectedPackage = searchParams.get("package");
  const initialValues = {
    userType: userTypeFromQuery || "",
    selectedPackage: selectedPackage || null,
    responsibility: USER_RESPONSIBILITY_ADMIN,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    companyName: "",
    bin: ""
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post(apiEndpoint.auth.register, values);
      const data = response?.data ?? {};
      if (data?.accessToken) {
        setRegistedEmail(values.email);
        setAuthToken({
          ...data,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("otpResendTimestamp");
        }
        handleOpenModal();
      }
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        setErrors(error?.errors);
        toast.error(error?.message);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
      setSubmitting(false);
    }
  };
  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className="h-screen grid grid-cols-2 gap-11">
        <div>
          <Image
            src={Img}
            alt="logo"
            className="object-cover w-full h-full"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="max-w-[550px] self-center py-10">
          <Image src={Logo} alt="logo" width={53} height={49} />
          <h2 className="text-4xl font-semibold text-slate-900 font-public-sans pt-4">
            Create Account
          </h2>
          <p className="text-[#637381] text-base font-normal font-public-sans leading-normal ">
            Let us know more about you
          </p>
          <div className="text-[#1C252E] text-lg font-semibold font-Public Sans leading-normal pt-3">
            Join as a Carrier or Shipper/Broker
          </div>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, isValid, errors }) => {
              useEffect(() => {
                setPasswordStrength(checkPasswordStrength(values.password));
              }, [values.password]);

              return (
                <Form>
                  <>
                    <div className="grid grid-cols-3 gap-5 py-7">
                      {userTypes.map((option) => {
                        const imageSrc = images.find(
                          (image) => image[option.value.toLowerCase()]
                        );
                        return (
                          <div
                            key={option.value}
                            htmlFor={`userType_${option.value}`}
                            className={`border flex items-center justify-between py-2 px-3 rounded-lg  ${
                              userTypeFromQuery
                                ? userTypeFromQuery !== option.value
                                  ? "bg-gray-200 cursor-not-allowed border-gray-200" // Disabled state styling
                                  : "bg-white cursor-pointer border-[#73c002]"
                                : values?.userType === option.value
                                ? "border-[#73c002]"
                                : "border-gray-200" // Default state styling
                            }`}
                          >
                            {/* Radio Button */}
                            <RadioButton
                              label={option.label}
                              name="userType"
                              labelPosition="bottom"
                              value={option.value}
                              disabled={
                                userTypeFromQuery &&
                                userTypeFromQuery !== option.value
                              }
                              isSelected={
                                userTypeFromQuery &&
                                userTypeFromQuery === option.value
                              }
                            />
                            {/* Image */}
                            {imageSrc && (
                              <Image
                                src={imageSrc[option.value.toLowerCase()]}
                                alt={option.label}
                                width={"auto"}
                                height={"auto"}
                                className="mt-2"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-1">
                      <ErrorMessage name="userType" component={TextError} />
                    </div>
                    <div className="text-[#1C252E] text-lg font-semibold font-public-sans leading-normal pb-6">
                      Basic Information
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <TextInput
                        label="First Name"
                        type="text"
                        placeholder="Ex. Enamul"
                        name="firstName"
                      />
                      <TextInput
                        label="Last Name"
                        type="text"
                        placeholder="Ex. Enamul"
                        name="lastName"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Ex. example@gmail.com"
                      />
                      <TextInput
                        label="Phone Number"
                        type="text"
                        name="phone"
                        placeholder="Ex. 0123456789"
                      />

                      
                     
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <TextInput
                        label="Confirm Password"
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm password"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <TextInput
                        label="Company Name  "
                        type="text"
                        name="companyName"
                        placeholder="Ex. example"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <TextInput
                        label="BIN (Business Identity Number) "
                        type="text"
                        name="bin"
                        placeholder=""
                      />
                    </div>

                    {/* Password validation checklist */}
                    <div className="mt-7">
                      <div className="text-[#1d2838] text-base font-semibold">
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

                    <div className="pt-8">
                      <Button
                        type="submit"
                        size="large"
                        variant={isSubmitting || (!isValid && "disabled")}
                      >
                        Create Account
                      </Button>
                    </div>
                  </>
                </Form>
              );
            }}
          </Formik>
          <div className="pt-2">
            <Link href="/">
              <Button variant="stroke" size="large">
                Back
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              href={LOGIN_ROUTE}
              className="text-[#D4AF37] hover:text-orange-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VerifyOtp userEmail={getRegistedEmail(REGISTERED_EMAIL)} />
      </Modal>
    </>
  );
}
