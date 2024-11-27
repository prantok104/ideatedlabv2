"use client";
import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  isUserVerified,
  notify,
  NOTIFY_MESSAGE_ERROR,
  setAuthToken,
} from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import {
  DASHBOARD_ROUTE,
  FORGET_PASSWORD_ROUTE,
  OTP_VERIFY_ROUTE,
  REGISTER_ROUTE,
  USER_SELECTED_PACKAGE,
} from "@/utils/router";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import * as Yup from "yup";
import Img from "../../../../../public/asset/login-page-truck.jpg"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";

const loginSchema = Yup.object().shape({
  username: Yup.string().email("Invalid user").required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  // hCaptchaToken: Yup.string().required("Please complete the captcha."),
});

const Login = () => {
  const router = useRouter();
  const formikRef = useRef();
  const [captchaToken, setCaptchaToken] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const initialValues = {
    username: "",
    password: "",
    rememberMe: '',
    hCaptchaToken: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post(apiEndpoint.auth.login, values);
      const data = response?.data ?? {};
      if(Object.keys(data)?.length > 0){
        setAuthToken({
          ...data,
        });

        const { data: currentUser } = await apiClient.get(
          apiEndpoint.auth.user
        );
        
                  console.log(currentUser);
        if (Object.keys(currentUser).length > 0) {
          if (currentUser?.authenticated === true) {
            if (currentUser?.isUserVerified === true) {
              if (currentUser?.user?.userType == "Admin") {
                router.push(DASHBOARD_ROUTE);
              } else {
                if (
                  currentUser?.hasSubscription == false ||
                  currentUser?.isSubscriptionExpire == true

                ) {
                  router.push(USER_SELECTED_PACKAGE);
                } else {
                  router.push(DASHBOARD_ROUTE);
                }
              }
            } else {
              router.push(OTP_VERIFY_ROUTE);
            }
          }
        }
      }

      
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        setErrors(error?.errors);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  // Captcha
  const handleCaptchaVerification = (token) => {
    setCaptchaToken(token);
    // You can also update the Formik field value directly.
    formikRef.current.setFieldValue("hCaptchaToken", token);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#Ffffff] gap-11">
      {/* Image: Only show on screens larger than 'md' */}
      <div className="hidden md:block">
        <Image
          src={Img}
          alt="Truck Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center w-full px-5 md:px-0">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-semibold text-slate-900 text-center">
            Sign in
          </h2>
          <p className="text-gray-600 text-lg font-normal pb-6 text-center">
            Welcome back!
          </p>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, errors }) => (
              <Form>
                <div className="mb-4">
                  <TextInput
                    label="Email"
                    type="email"
                    name="username"
                    placeholder="example@example.com"
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="********"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Checkbox label="Remember Me" name="rememberMe"   />
                  <div>
                    
                    <Link
                      href={FORGET_PASSWORD_ROUTE}
                      className="text-sm text-[#D4AF37] hover:text-orange-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

               

                <Button
                  type="submit"
                  size="xlarge"
                  variant='base'
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link
              href={REGISTER_ROUTE}
              className="text-[#D4AF37] hover:text-orange-700"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
