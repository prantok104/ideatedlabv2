"use client";

import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { notify, NOTIFY_MESSAGE_ERROR } from "@/utils/helper";
import { REDIRECT_URL } from "@/utils/static-const";
import { Formik, Form } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import * as Yup from "yup";

const Payment = ({ onClose, plan, setPaid }) => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);

  const cardImages = [
    {
      name: "VISA",
      icon: <FaCcVisa size={30} />,
    },
    {
      name: "VISA ELECTRON",
      icon: <FaCcVisa size={30} />,
    },
    {
      name: "VISAELECTRON",
      icon: <FaCcVisa size={30} />,
    },
    {
      name: "MASTERCARD",
      icon: <FaCcMastercard size={30} />,
    },
    {
      name: "MASTER CARD",
      icon: <FaCcMastercard size={30} />,
    },
    {
      name: "AMERICAN EXPRESS",
      icon: <SiAmericanexpress size={30} />,
    },
    {
      name: "AMERICANEXPRESS",
      icon: <SiAmericanexpress size={30} />,
    },
    {
      name: "AMEX",
      icon: <FaCcAmex size={30} />,
    },
  ];

  const { data: savedCards } = apiClient.useAxiosSWR(
    apiEndpoint.payments.savedCards,
    {}
  );

  const errorMessages = {
    cvv_invalid: "The CVV code is invalid. Please check and try again.",
    card_expired: "The card has expired. Please use a different card.",
    card_number_invalid:
      "The card number is invalid. Please check and try again.",
    default: "An unknown error occurred. Please try again.",
  };
  const sanitizeError = (errorCode) => {
    return errorMessages[errorCode] || errorMessages.default;
  };

  const initialValues = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    isDefault: false,
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .transform((value) => value.replace(/\s+/g, "")) // Remove spaces before validation
      .required("Card number is required")
      .matches(/^\d{14,19}$/, "Card number must be between 14 and 19 digits")
      .test("is-valid-luhn", "Invalid card number", (value) =>
        luhnCheck(value.replace(/\s+/g, ""))
      ),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(/^\d{2}\/\d{2}$/, "Expiry date must be MM/YY")
      .test("is-valid-month", "Month between 01 and 12", function (value) {
        if (!value) return false;
        const month = parseInt(value.split("/")[0], 10);
        return month >= 1 && month <= 12;
      }),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    cardholderName: Yup.string().required("Cardholder name is required"),
  });

  // Luhn algorithm to validate credit card numbers
  const luhnCheck = (num) => {
    if (!num) return false;
    num = num.replace(/\s+/g, ""); // Remove spaces before running the Luhn check
    let arr = (num + "")
      .split("")
      .reverse()
      .map((x) => parseInt(x));
    let lastDigit = arr.shift();
    let sum = arr
      .map((x, idx) => {
        if (idx % 2 === 0) {
          let doubled = x * 2;
          return doubled > 9 ? doubled - 9 : doubled;
        } else {
          return x;
        }
      })
      .reduce((a, b) => a + b, 0);
    sum += lastDigit;
    return sum % 10 === 0;
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    // return values?.isDefault;
    if (values?.cardNumber) {
      const [month, year] = values?.expiryDate.split("/");
      const currentYear = String(new Date().getFullYear()).slice(0, 2);
      const finalYear = currentYear + year;
      const payload = {
        type: "card",
        number: values?.cardNumber?.replace(/\D/g, ""),
        cvv: values?.cvv,
        expiry_month: Number(month),
        expiry_year: Number(finalYear),
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CHECKOUT_TOKEN_URL}${apiEndpoint.payments.createToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY}`,
            },
            body: JSON.stringify(payload),
          }
        );
        // Clone the response so the body can be used multiple times
        const responseClone = response.clone();
        let responseData;

        try {
          responseData = await responseClone.json(); // Parse the response body as JSON
        } catch (error) {
          notify("Failed!", NOTIFY_MESSAGE_ERROR);
          return true;
        }

        if (
          Array.isArray(responseData?.error_codes) &&
          responseData?.error_codes.length > 0
        ) {
          const sanitizedErrors = responseData.error_codes
            .map(sanitizeError)
            .join(", ");

          notify(sanitizedErrors, NOTIFY_MESSAGE_ERROR); 
          return true;
        } else {
          if (!response.ok) {
            notify(
              "Something went worng! Please try again leter.",
              NOTIFY_MESSAGE_ERROR
            );
            return true;
          }
        }

        if (response.ok) {
          const getCardToken = await response.json();

          if (typeof getCardToken === "object" && getCardToken?.token) {
            if (plan?.id) {
              const { data: billPay } = await apiClient.post(
                apiEndpoint.payments.billPay,
                {
                  selectedPackage: plan?.id,
                  cardToken: getCardToken?.token,
                  cardNumber: payload?.number,
                  isDefault: values?.isDefault,
                  successUrl: `${window.location.origin}${REDIRECT_URL.SUCCESS}`,
                  failedUrl: `${window.location.origin}${REDIRECT_URL.FAILED}`,
                }
              );
              if (billPay?.status == "Approved" || billPay?.status == "Paid") {
                const params = new URLSearchParams();
                params.set("invoice", billPay?.invoiceNumber);
                onClose();
                setPaid((prev) => !prev);
                // router.push(
                //   `${billPay?.others?.redirect?.successUrl}?${params.toString()}`
                // );
              } else {
                notify("Payment failed!", NOTIFY_MESSAGE_ERROR);
                onClose();
                setPaid(false);
                // router.push(billPay?.others?.redirect?.failedUrl);
              }
            }
          }
        }
      } catch (error) {
        setPaid(false);
        notify(error?.message, NOTIFY_MESSAGE_ERROR);
      }
    }
    // Handle form data here
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-[#141a21] text-xl font-semibold font-['Public Sans'] leading-7 mb-3">
        Payment
      </h1>
      <hr className="w-full" />
      <div
        className="bg-white px-6 py-3 w-full mx-auto mt-5"
        style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <h3 className="text-[#1c252e] text-xl font-medium font-['Public Sans'] leading-7">
          Plan Summary
        </h3>
        <div className="mt-4 space-y-3">
          <p className="flex justify-between">
            <span className="text-center text-[#637381] text-base font-semibold font-['Public Sans'] leading-normal">
              User Type
            </span>
            <span className="text-center text-[#637381] text-base font-normal font-['Public Sans'] leading-normal">
              {plan?.module}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-center text-[#637381] text-base font-semibold font-['Public Sans'] leading-normal">
              Plan
            </span>
            <span className="text-center text-[#637381] text-base font-normal font-['Public Sans'] leading-normal">
              {plan?.type}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-center text-[#637381] text-base font-semibold font-['Public Sans'] leading-normal">
              Price
            </span>
            <span className="text-center text-[#637381] text-base font-normal font-['Public Sans'] leading-normal">
              ${plan.fee}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-center text-[#637381] text-base font-semibold font-['Public Sans'] leading-normal">
              Tax/Vat
            </span>
            <span className="text-center text-[#637381] text-base font-normal font-['Public Sans'] leading-normal">
              $0.00
            </span>
          </p>
          <hr className="w-full" />
          <p className="flex justify-between">
            <span className="text-center text-[#141a21] text-lg font-semibold font-['Public Sans'] leading-normal">
              Total
            </span>
            <span className="text-center text-[#141a21] text-lg font-normal font-['Public Sans'] leading-normal">
              ${plan?.fee}
            </span>
          </p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <>
              {/* Card Information */}
              <div
                className="bg-white w-full px-6 py-3 mx-auto mt-5"
                style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#5c5c5c] text-lg font-normal font-['Lato'] leading-normal">
                    Credit or Debit Card
                  </h3>
                  <div className="flex items-center gap-2">
                    <Image src="/asset/visa.svg" width={31} height={14} />
                    <Image src="/asset/mastard.svg" width={24} height={16} />
                    <Image src="/asset/discover.svg" width={23} height={16} />
                  </div>
                </div>

                <h1 className="text-[#1c252e] text-xl font-medium font-['Public Sans'] leading-6 mb-4">
                  Account Information
                </h1>

                <div>
                  {/* Card Number */}
                  <TextInput
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 1234 1234 1234"
                  />

                  <div className="flex gap-4">
                    {/* Expire Date */}
                    <TextInput
                      label="Expire Date"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                    />
                    {/* CVV */}
                    <TextInput
                      label="CVV"
                      name="cvv"
                      type="text"
                      placeholder="CVV"
                    />
                  </div>

                  {/* Cardholder Name */}
                  <TextInput
                    label="Cardholder Name"
                    name="cardholderName"
                    type="text"
                    placeholder="Card Holder"
                  />
                  <div className="my-4">
                    <Checkbox
                      label="Set as default"
                      name="isDefault"
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-start gap-7 mt-10">
                <div className="w-[134px]">
                  <Button
                      type="button"
                    size="xlarge"
                    variant="reactangleStroke"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="w-[134px]">
                  <Button type="submit" size="xlarge" variant="rectangleFill">
                    Pay Now
                  </Button>
                </div>
              </div>
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
