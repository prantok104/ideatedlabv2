"use client";

import Button from "@/components/button/Button";
import SearchableSelect from "@/components/form/SearchableSelect";
import Switch from "@/components/form/Swtich";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

// validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Invalid phone number"),
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

const UserCreatePage = () => {
  const router = useRouter();
  const { data: roleList } = apiClient.useAxiosSWR(apiEndpoint.role.default);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    roles: [],
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post(apiEndpoint.user.default, values);
      notify(response?.message, NOTIFY_MESSAGE_SUCCESS);
      router.push(`/admin/users-management/users`);
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        setErrors(error?.errors);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="relative">
        <h1 className="text-xl font-bold my-1 text-slate-700">Create User</h1>
        <div className="w-full p-2 mt-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting, resetForm }) => (
              <Form>
                <div>
                  <div className="grid grid-cols-2 gap-5">
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
                  </div>
                  <div className="grid grid-cols-2 gap-5">
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
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <SearchableSelect
                      isMulti={true}
                      name="roles"
                      label="Role"
                      placeholder="Select role"
                      options={(roleList?.data ?? []).map((_item) => ({
                        label: _item?.title,
                        value: _item.id,
                      }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5">
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
                </div>

                <div className="mt-10 flex justify-center mx-1 gap-4 flex-col md:flex-row w-1/3 float-end">
                  <Button variant="removeBtn" size="medium" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="medium"
                    variant="base"
                  >
                    Create User
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserCreatePage;
