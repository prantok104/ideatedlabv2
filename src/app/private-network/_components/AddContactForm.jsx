"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/button/Button";

// Authority options for the dropdown
const authorityOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "User", label: "User" },
];

const AddContactForm = ({ onClose }) => {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    authority: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    authority: Yup.string().required("Authority is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Values:", values);
    // You can handle the form submission logic here
    resetForm();
    onClose();
  };

  return (
    <div>
      <h2 className="mb-4 mt-11 text-xl font-medium font-['Inter'] leading-7">
        Add Contact
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            {/* Name Input */}
            <div className="mb-4">
              <TextInput
                label="Name"
                name="name"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Authority Dropdown */}
            <div className="mb-6">
              <SearchableSelect
                label="Authority"
                name="authority"
                options={authorityOptions}
                placeholder="Select authority"
              />
            </div>

            {/* Buttons */}
            {/* <div className="flex justify-between">
              <button
                type="button"
                className="py-2 px-6 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`py-2 px-6 bg-[#73C002] text-white font-bold rounded hover:bg-[#5FA002] ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                Add
              </button>
            </div> */}
            <div className="flex justify-center items-center space-x-4 mt-16">
              <div className="w-32">
                <Button
                  type="button"
                  variant="reactangleStroke"
                  size="large"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-32">
                <Button
                  type="submit"
                  variant="rectangleFill"
                  size="large"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddContactForm;
