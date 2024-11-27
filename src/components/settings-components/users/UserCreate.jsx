"use client";

import Button from "@/components/button/Button";
import SearchableSelect from "@/components/form/SearchableSelect";
import Switch from "@/components/form/Swtich";
import TextInput from "@/components/form/TextInput";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "",
  status: "",
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Invalid phone number"),
  password: Yup.string().when("passwordEdit", {
    is: true,
    then: Yup.string().required("Password is required"),
  }),
  confirmPassword: Yup.string().when("passwordEdit", {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  }),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
});

const roles = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Carrier",
    label: "carrier",
  },
  {
    value: "Shipper",
    label: "shipper",
  },
  {
    value: "Broker",
    label: "broker",
  },
];

const UserCreate = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // Handler to toggle the switch
  const handleToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Log the form values to the console
    console.log(values);

    // Perform any async operations here, e.g., API calls

    // Reset the form after successful submission if needed
    resetForm();

    // Set submitting to false
    setSubmitting(false);
  };

  return (
    <div className="w-full p-2 mt-2">
      <h4 className="text-xl font-bold my-1 text-slate-700">Create User</h4>

      <Formik
        initialValues={{
          ...initialValues,
          status: isSwitchOn ? "Active" : "Inactive",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form>
            {console.log(values)}
            <div>
              <TextInput
                name="fullName"
                label="Full Name"
                placeholder="Enter full name"
                type="text"
              />

              <TextInput
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
              />

              <TextInput
                name="phoneNumber"
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
                name="role"
                label="Role"
                placeholder="Select role"
                options={roles}
              />

              <Switch
                isOn={isSwitchOn}
                handleToggle={handleToggle}
                onColor="bg-[#34C759]"
                offColor="bg-gray-300"
                size="md"
                value="status"
                label={`${isSwitchOn ? "Active" : "Inactive"}`}
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
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserCreate;
