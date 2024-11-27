"use client";

import Button from "@/components/button/Button";
import SearchableSelect from "@/components/form/SearchableSelect";
import Switch from "@/components/form/Swtich";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  firstName: "asd",
  lastName: "sdf",
  email: "asdfasdf@g.com",
  phone: "1234567890",
  password: "12345678aA@",
};

// validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Invalid phone number"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// here will roles api applied
const roles = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Moderator",
    label: "Moderator",
  },
  {
    value: "Maintainer",
    label: "Maintainer",
  },
];

const CreateUserForm = ({ onClose }) => {
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post("/users", values);

      notify(response?.message, NOTIFY_MESSAGE_SUCCESS);
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        setErrors(error?.errors);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
      setSubmitting(false);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full p-2 mt-2">
      <h4 className="text-xl font-bold my-1 text-slate-700">Create User</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, resetForm }) => (
          <Form>
            <div>
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                type="text"
              />

              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                type="text"
              />

              <TextInput
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
              />

              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                type="text"
              />

              <TextInput
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
              />

              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter confirm password"
                type="password"
              />

              <SearchableSelect
                name="responsibility"
                label="Role"
                placeholder="Select role"
                options={roles}
              />

              <Switch
                isOn={values.docStatus === "Active"}
                handleToggle={() =>
                  setFieldValue(
                    "docStatus",
                    values.docStatus === "Active" ? "Inactive" : "Active"
                  )
                }
                onColor="bg-[#34C759]"
                offColor="bg-gray-300"
                size="md"
                label={`${values.docStatus}`}
              />
            </div>

            <div className="mt-10 flex justify-center mx-1 gap-4 flex-col md:flex-row">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="medium"
                variant="base"
              >
                Create User
              </Button>

              <Button variant="removeBtn" size="medium" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
