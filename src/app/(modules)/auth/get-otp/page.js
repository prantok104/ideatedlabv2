"use client";
import Button from "@/components/button/Button";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { buildRouterUrl, notify, NOTIFY_MESSAGE_ERROR } from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { VERIFY_OTP_ROUTE } from "@/utils/router";
import {
  USER_VERIFICATION_PURPOSE_NEW,
  USER_VERIFICATION_TYPE_EMAIL,
} from "@/utils/static-const";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import * as Yup from "yup";
import Img from "../../../../../public/asset/register-verify-cover.svg";

const validationSchema = Yup.object().shape({
  value: Yup.string().email("Invalid email").required("Email is required"),
});

const VerifyOtp = () => {
  const formikRef = useRef();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues = {
    purpose: USER_VERIFICATION_PURPOSE_NEW,
    type: USER_VERIFICATION_TYPE_EMAIL,
    value: searchParams.get("email") ?? "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post(apiEndpoint.auth.getOtp, values);
      const data = response?.data ?? {};
      router.push(
        buildRouterUrl(VERIFY_OTP_ROUTE, {
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
    <div className="h-screen grid grid-cols-2 bg-[#Ffffff] gap-11">
      <div>
        <Image src={Img} alt="logo" className="object-cover w-full h-full" />
      </div>
      <div className="max-w-md self-center">
        <h2 className="text-4xl font-semibold text-slate-900">
          Verifying Your Identity
        </h2>
        <p className="text-gray-600 text-sm font-normal pb-6">
          To protect your account .you’ll need to verify your identity by
          entering a valid Email Address- where we can send a six*digit security
          code by Email.
        </p>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, errors }) => (
            <Form>
              <div className="mb-4">
                <TextInput
                  label="Email"
                  type="email"
                  name="value"
                  placeholder="email@example.com"
                />
              </div>
              <Button
                type="submit"
                size="xlarge"
                variant={`${isValid ? "base" : "disabled"}`}
                disabled={isSubmitting}
              >
                Get OTP
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOtp;
