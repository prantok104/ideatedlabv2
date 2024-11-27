"use client";

import Link from "next/link";
import Forget_password_image from "../../../../../public/asset/forget-passowrd-image.webp";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import TextInput from "@/components/form/TextInput";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { LINK_SENT } from "@/utils/router";
import { apiEndpoint } from "@/utils/api-endpoint";
import { REDIRECT_RESET_URL } from "@/utils/static-const";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import ForgetPasswordOtp from "./_components/ForgetPasswordOtp";

// initial email value
const initialValues = {
  type: "Email",
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  // const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [ getEmail, setEmail ] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // handle form submission
  const handleSubmit = async (values) => {
    try {
      if (values.email) {
        const payload = {
          type : "Email",
          value : values?.email,
          // redirectUrl: `${window.location.origin}${REDIRECT_RESET_URL.URL}`,
        };

        setEmail(values?.email);

        console.log("payload", payload); //for debugging
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint.auth.resetPassword}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          notify(
            "Something went wrong! Please try again later",
            NOTIFY_MESSAGE_ERROR
          );
          return true;
        } else {
          const responseData = await response.json();
          notify(responseData?.data?.message, NOTIFY_MESSAGE_SUCCESS);
          // router.push(`${LINK_SENT}?_e=${btoa(values?.email)}`); 

          handleOpenModal();
        }
      } else {
        notify("Email is required", NOTIFY_MESSAGE_ERROR);
      }
    } catch (error) {
      notify(error, NOTIFY_MESSAGE_ERROR);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#Ffffff] gap-11">
      {/* Image: Only show on screens larger than 'md' */}
      {/* <div className="hidden md:block">
        <Image
          src={Forget_password_image}
          alt="Truck Image"
          className="object-cover w-full h-full"
        />
      </div> */}

      {/* Form Section */}
      {/* <div className="flex items-center justify-center md:justify-start w-full px-5 md:px-0">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-semibold text-slate-900 text-start">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-lg font-normal pb-6 text-start pt-2">
            Enter the email address linked to your account.
          </p>

          <Formik
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
                    name="email"
                    placeholder="Email or User Name"
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    size="xlarge"
                    variant={`${isValid ? "base" : "disabled"}`}
                    disabled={isSubmitting}
                  >
                    Continue
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div> */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ForgetPasswordOtp userEmail={getEmail} />
      </Modal>
    </div>
  );
};
export default ForgetPassword;
