"use client";

import Forget_password_image from "../../../../../../public/asset/forget-passowrd-image.webp";
import Image from "next/image";

import Button from "@/components/button/Button";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_ROUTE, SET_PASSWORD } from "@/utils/router";
import { REDIRECT_RESET_URL } from "@/utils/static-const";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import VerifyOTP from "../../verify-otp/page";

const LinkSending = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const email = searchParam?.get("_e");

  if (!email) {
    router.push(LOGIN_ROUTE);
  }

  // check valid
  function isValidBase64(str) {
    try {
      atob(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  // password resenr link
  const resentPasswordGenerateLink = async (e, email) => {
    if (!isValidBase64(email)) {
      notify("Invalid", NOTIFY_MESSAGE_ERROR);
      return true;
    }
    try {
      if (email) {
        const payload = {
          email: atob(email),
          redirectUrl: `${window.location.origin}${REDIRECT_RESET_URL.URL}`,
        };
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
          return true;
        }
      } else {
        notify("Email is required", NOTIFY_MESSAGE_ERROR);
        return true;
      }
    } catch (error) {
      notify(error, NOTIFY_MESSAGE_ERROR);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#Ffffff] gap-11">
      {/* Image: Only show on screens larger than 'md' */}
      <div className="hidden md:block">
        <Image
          src={Forget_password_image}
          alt="Truck Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* {atob(_e)} */}
      {/* Form Section */}
      <div className="flex items-center justify-center md:justify-start w-full px-5 md:px-0">
        <VerifyOTP
          email={email}
          resentPasswordGenerateLink={resentPasswordGenerateLink}
        />
      </div>
    </div>
  );
};

export default LinkSending;
