"use client";
import Button from "@/components/button/Button";
import RadioButton from "@/components/form/RadioButton";
import TextError from "@/components/form/TextError";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { buildRouterUrl, notify, NOTIFY_MESSAGE_ERROR } from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { SEND_OTP_ROUTE } from "@/utils/router";
import {
  USER_RESPONSIBILITY_ADMIN,
  USER_TYPE_BROKER,
  USER_TYPE_CARRIER,
  USER_TYPE_SHIPPER,
} from "@/utils/static-const";
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import * as Yup from "yup";
import { object } from "yup";
import Img from "../../../../../public/asset/register-page-cover.svg";
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
const registerValidationSchema = object().shape({
  userType: Yup.string().required("The userType field is required"),
  firstName: Yup.string().required("The  first name is required"),
  lastName: Yup.string().required("The lastname is required"),
  email: Yup.string().email("Invalid Email").required("The email is requird"),
  phone: Yup.string().required("The phone is requird"),
  password: Yup.string()
    .min(8, "The must be 8 digit")
    .required("The phone is requird"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("The  password confirmation is requird"),
});
export default function Register() {
  const formikRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValues = {
    userType: "",
    responsibility: USER_RESPONSIBILITY_ADMIN,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    companyName: "",
    selectedPackage: searchParams.get("package") ?? null,
  };
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post(apiEndpoint.auth.register, values);
      const data = response?.data ?? {};
      router.push(
        buildRouterUrl(SEND_OTP_ROUTE, {
          query: {
            email: data.email,
          },
        })
      );
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        setErrors(error?.errors);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="h-screen grid grid-cols-2 bg-[#FFFFFF] gap-11">
      <div>
        <Image src={Img} alt="logo" className="object-cover w-full h-full" />
      </div>
      <div className="max-w-md self-center">
        <h2 className="text-4xl font-semibold text-slate-900">
          Create Account
        </h2>
        <p className="text-gray-600 text-lg font-normal pb-6">
          Let us know more about you
        </p>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, errors }) => (
            <Form>
              <>
                <div className="grid grid-cols-3 gap-5">
                  {userTypes.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      name="userType"
                      value={option.value}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1">
                  <ErrorMessage name="userType" component={TextError} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <TextInput label="FirstName" type="text" name={`firstName`} />
                  <TextInput label="LastName" type="text" name={`lastName`} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <TextInput label="Email" type="email" name={`email`} />
                  <TextInput label="Phone" type="text" name={`phone`} />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <TextInput
                    label="Password"
                    type="password"
                    name={`password`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <TextInput
                    label="Confirm Password"
                    type="password"
                    name={`passwordConfirmation`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <TextInput
                    label="Company Name"
                    type="text"
                    name={`companyName`}
                  />
                </div>
                <Button type="submit" size="xlarge" disabled={isSubmitting}>
                  Create Account
                </Button>
              </>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-gray-600 mt-4">
          You have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#D4AF37] hover:text-orange-700"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}




