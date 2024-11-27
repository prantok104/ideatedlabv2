"use client";

import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

const AddCard = ({ onClose, setAddCardOpen }) => {
  const router = useRouter();

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
  // const handleSubmit = async (values) => {
  //   if (values?.cardNumber) {
  //     const [month, year] = values?.expiryDate.split("/");
  //     const currentYear = String(new Date().getFullYear()).slice(0, 2);
  //     const finalYear = currentYear + year;
  //     const payload = {
  //       type: "card",
  //       number: values?.cardNumber?.replace(/\D/g, ""),
  //       cvv: values?.cvv,
  //       expiry_month: Number(month),
  //       expiry_year: Number(finalYear),
  //     };
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_CHECKOUT_TOKEN_URL}${apiEndpoint.payments.createToken}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY}`,
  //           },
  //           body: JSON.stringify(payload),
  //         }
  //       );
  //       if (!response.ok) {
  //         notify("Something went worng! Please try again leter.");
  //       }
  //       const getCardToken = await response.json();

  //       if (typeof getCardToken === "object" && getCardToken?.token) {
  //         const { data: addCard } = await apiClient.post(
  //           apiEndpoint.payments.addPaymentMethod,
  //           {
  //             cardToken: getCardToken?.token,
  //             cardNumber: payload?.number,
  //             isDefault: values?.isDefault,
  //           }
  //         );
  //         if (addCard) {
  //           setAddCardOpen((prev) => !prev);
  //         } else {
  //           notify("Something went worng in token ! Please try again leter.");
  //         }
  //       }
  //     } catch (error) {
  //       notify("Something went worng! Please try again leter.");
  //     }
  //   }
  // };

  const handleSubmit = async (values) => {
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

        const jsonResponse = await response.json();

        if (!response.ok) {
          // Check if error codes exist in the response and handle accordingly
          if (jsonResponse?.error_codes?.includes("cvv_invalid")) {
            notify(
              "Invalid CVV. Please check the CVV number and try again.",
              NOTIFY_MESSAGE_ERROR
            );
          } else if (jsonResponse?.error_codes?.includes("expiry_invalid")) {
            notify(
              "Invalid expiry date. Please check the expiry date and try again.",
              NOTIFY_MESSAGE_ERROR
            );
          } else if (jsonResponse?.error_codes) {
            // Handle other specific error codes from the token API
            notify(
              `Error: ${jsonResponse.error_codes[0]}. Please check your card details.`,
              NOTIFY_MESSAGE_ERROR
            );
          } else {
            notify(
              "Something went wrong! Please try again later.",
              NOTIFY_MESSAGE_ERROR
            );
          }
          return;
        }

        // Token creation was successful
        if (jsonResponse?.token) {
          const { data: addCard } = await apiClient.post(
            apiEndpoint.payments.addPaymentMethod,
            {
              cardToken: jsonResponse?.token,
              cardNumber: payload?.number,
              isDefault: values?.isDefault,
            }
          );

          // If card was added successfully, close the add card modal
          if (addCard) {
            setAddCardOpen((prev) => !prev);
          }
        }
      } catch (error) {
        // Catch any errors thrown by the fetch or API client and notify
        console.error("Error during card submission: ", error);
        notify(
          "Something went wrong! Please try again later.",
          NOTIFY_MESSAGE_ERROR
        );
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-[#141a21] text-xl font-semibold font-['Public Sans'] leading-7 mb-3">
        Add Card
      </h1>
      <hr className="w-full" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="bg-white rounded-lg mt-5">
              <div className="relative">
                <div className="bg-white w-full pb-3 mx-auto mt-4 border-b">
                  <h1 className="text-[#1c252e] text-xl font-medium font-['Public Sans'] leading-6 mb-4">
                    Account Information
                  </h1>

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

                  {/* Card Holder */}
                  <TextInput
                    label="Card Holder"
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

              {/*Button */}
              <div className="flex justify-start gap-7 mt-10">
                <div className="w-[134px]">
                  <Button
                    //   type="button"
                    size="xlarge"
                    variant="reactangleStroke"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="w-[134px]">
                  <Button type="submit" size="xlarge" variant="rectangleFill">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCard;
