"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import { BsPaypal } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";

const page = () => {
  const [cityOptions, setCityOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const initialValues = {
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvvCode: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    termsAccepted: false,
  };

  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required("Payment method is required"),
    cardNumber: Yup.string().when("paymentMethod", {
      is: (method) => method === "card",
      then: (schema) => schema.required("Card Number is required"),
      otherwise: (schema) => schema.nullable(), // Allow null or empty when not 'card'
    }),
    expiryDate: Yup.string().when("paymentMethod", {
      is: (method) => method === "card",
      then: (schema) => schema.required("Expiry Date is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    cvvCode: Yup.string().when("paymentMethod", {
      is: (method) => method === "card",
      then: (schema) => schema.required("CVV Code is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
    termsAccepted: Yup.bool().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/geolocation.json");
        const data = await res.json();

        const cities = data
          .map((item) => {
            // Determine the label and value based on the addresstype
            let label, value;
            if (item.addresstype === "city") {
              label = item.address.city;
              value = item.address.city;
            }
            // } else if (item.addresstype === "country") {
            //   label = item.address.country;
            //   value = item.address.country;
            // } else if (item.addresstype === "state") {
            //   label = item.address.state;
            //   value = item.address.state;
            // }

            // Only include options where the label is defined
            return label ? { label, value } : null;
          })
          .filter((option) => option !== null); // Filter out null options

        setCityOptions(cities);

        const states = data
          .map((item) => {
            // Determine the label and value based on the addresstype
            let label, value;
            if (item.addresstype === "state") {
              label = item.address.state;
              value = item.address.state;
            }

            // Only include options where the label is defined
            return label ? { label, value } : null;
          })
          .filter((option) => option !== null); // Filter out null options

        setStateOptions(states);

        const countries = await data
          .map((item) => {
            // Determine the label and value based on the addresstype
            let label, value;
            if (item.address.country) {
              label = item.address.country;
              value = item.address.country;
            }

            // Only include options where the label is defined
            return label ? { label, value } : null;
          })
          .filter((option) => option !== null); // Filter out null options

        setCountryOptions(countries);
        console.log(countries);
      } catch (error) {
        console.error("Failed to fetch city data:", error);
      }
    };

    fetchData();
  }, []);

  // Example options for select inputs
  // const cityOptions = [
  //   { value: "new-york", label: "New York" },
  //   { value: "los-angeles", label: "Los Angeles" },
  //   // Add more options as needed
  // ];

  // const stateOptions = [
  //   { value: "california", label: "California" },
  //   { value: "new-york", label: "New York" },
  //   // Add more options as needed
  // ];

  // const countryOptions = [
  //   { value: "usa", label: "United States" },
  //   { value: "canada", label: "Canada" },
  //   // Add more options as needed
  // ];

  return (
    <div>
      <h1 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7 mb-1">
        Billing Details
      </h1>
      <hr className="w-full mb-7" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="max-w-xl">
            <h2 className="text-black text-xl font-semibold font-['Public Sans'] leading-7">
              Billing Details
            </h2>
            <p className="text-[#454f5b] text-base font-normal font-['Public Sans'] leading-normal mt-6 mb-3">
              Choose Payment method
            </p>

            {/* Payment Method */}
            {/* <div className="mb-6">
            <p className="font-semibold mb-3">Choose Payment method</p>
            <div className="space-y-4">
              <RadioButton
                label="Credit or Debit Card"
                name="paymentMethod"
                value="card"
              />
              <RadioButton label="Paypal" name="paymentMethod" value="paypal" />
            </div>
          </div> */}

            <div className="flex items-center mb-3 p-3 border border-spacing-2 rounded-md">
              <Field
                type="radio"
                name="paymentMethod"
                id="card"
                value="card"
                className="mr-8 w-4 h-4"
              />
              <label
                htmlFor="card"
                className="text-[#637381] text-sm font-normal font-['Public Sans'] leading-tight"
              >
                Credit or Debit Card
              </label>
              <div className="ml-auto flex space-x-1">
                <RiVisaLine size={24} />
                <FaCcMastercard size={24} />
                <SiAmericanexpress size={24} />
              </div>
            </div>

            <div className="flex items-center mb-4 p-3 border border-spacing-2 rounded-md">
              <Field
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="paypal"
                className="mr-8 w-4 h-4"
              />
              <label
                htmlFor="paypal"
                className="text-[#637381] text-sm font-normal font-['Public Sans'] leading-tight"
              >
                Paypal
              </label>
              <div className="ml-auto flex">
                <BsPaypal size={24} />
              </div>
            </div>

            {/* Card Details */}
            {values.paymentMethod === "card" && (
              <>
                <div className="mb-3">
                  <TextInput
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    placeholder="Enter card Number"
                  />
                </div>
                <div className="flex space-x-6 mb-6">
                  <div className="w-1/2">
                    <TextInput
                      label="Expiry Date"
                      name="expiryDate"
                      type="text"
                      placeholder="Ex.07/36"
                    />
                  </div>
                  <div className="w-1/2">
                    <TextInput
                      label="CVV Code"
                      name="cvvCode"
                      type="text"
                      placeholder="69-259"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Billing Address */}
            <h3 className="text-xl font-semibold mb-6">Billing Address</h3>
            <div className="mb-3">
              <TextInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter your address"
              />
            </div>

            <div className="flex space-x-6 mb-6">
              <div className="w-1/2">
                <SearchableSelect
                  label="City"
                  name="city"
                  options={cityOptions}
                  placeholder="Select city"
                />
              </div>
              <div className="w-1/2">
                <SearchableSelect
                  label="State"
                  name="state"
                  options={stateOptions}
                  placeholder="Select state"
                />
              </div>
            </div>

            <div className="flex space-x-6 mb-3">
              <div className="w-1/2 -my-2">
                <TextInput
                  label="Zip Code"
                  name="zipCode"
                  type="text"
                  placeholder="Enter zip code"
                />
              </div>
              <div className="w-1/2">
                <SearchableSelect
                  label="Country"
                  name="country"
                  options={countryOptions}
                  placeholder="Select country"
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            {/* <div className="mb-6">
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="termsAccepted"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm">
                  I have read and agree to the{" "}
                  <span className="font-semibold">terms condition</span> and{" "}
                  <span className="font-semibold">privacy policy</span>
                </span>
              </label>
              <ErrorMessage
                name="termsAccepted"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div> */}
            <div className="mb-6">
              <Checkbox
                name="termsAccepted"
                label="I have read and agree to the terms condition and privacy policy"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-9">
              <Button type="button" variant="reactangleStroke">
                Back
              </Button>
              <Button type="submit" variant="rectangleFill">
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
