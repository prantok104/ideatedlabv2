"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useApp } from "@/contexts/AppContext";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  avatar: Yup.string(),
});

const PersonalInfoForm = () => {
  const [personalInfoEdit, setPersonalInfoEdit] = useState(false);
  const { user } = useApp();

  const initialSchema = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    avatar: user?.avatar || null,
  };

  const toggleEditMode = (resetForm) => {
    setPersonalInfoEdit((prev) => !prev);
    resetForm();
  };

  const handleSubmit = (values, { resetForm }) => {
    try {
      const response = apiClient.put(
        `${apiEndpoint.user.update}/${user?.id}`,
        values
      );
      if (response.status === 200) {
        NOTIFY_MESSAGE_SUCCESS("Profile updated successfully");
        setPersonalInfoEdit(false);
        resetForm();
      }
    } catch (e) {
      console.error("API Error:", e);
      NOTIFY_MESSAGE_ERROR("Failed to update profile");
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialSchema}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, resetForm }) => (
          <Form>
            <div className="flex justify-between">
              <div className="text-[#454f5b] text-xl font-semibold leading-7">
                Personal Information
              </div>
              <div>
                {!personalInfoEdit ? (
                  <Button
                    variant="stroke"
                    size="small"
                    iconRight={<BiPencil />}
                    onClick={() => toggleEditMode(resetForm)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      variant="stroke"
                      size="small"
                      type="button"
                      onClick={() => {
                        toggleEditMode(resetForm);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="base" size="small" type="submit">
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 mt-10">
              <div>
                <TextInput
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  disabled={!personalInfoEdit}
                  value={values.firstName} // Bind Formik values
                />
              </div>

              <div>
                <TextInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  disabled={!personalInfoEdit}
                  value={values.lastName} // Bind Formik values
                />
              </div>

              <div>
                <TextInput
                  name="phone"
                  label="Phone"
                  placeholder="Phone"
                  disabled={!personalInfoEdit}
                  value={values.Phone} // Bind Formik values
                />
              </div>

              <div>
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="email"
                  readOnly={true}
                  value={values.email} // Bind Formik values
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfoForm;
