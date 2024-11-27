"use client";

import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
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
import { CREATE_ROLE, UPDATE_USER } from "@/utils/permission";
import { SETTINGS_USERS } from "@/utils/router";
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
    .matches(
      /^\+\d{1,3}\d+$/,
      "Invalid phone number. Must start with country code, e.g., +08801705565342"
    ),
});

const UserUpdatePage = ({ params }) => {
  const router = useRouter();
  const getUserEndpoint = params?.id
    ? `${apiEndpoint.user.default}/${params?.id}`
    : null;

  const { data: user } = apiClient.useAxiosSWR(getUserEndpoint);
  const { data: roleList } = apiClient.useAxiosSWR(apiEndpoint.role.default);
  const initialValues = {
    firstName: user?.data?.firstName ?? "",
    lastName: user?.data?.lastName ?? "",
    email: user?.data?.email ?? "",
    phone: user?.data?.phone ?? "",
    roles: user?.data?.roles ?? [],
    docStatus: "Active",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      let response = {};
      if (params?.id) {
        response = await apiClient.put(
          `${apiEndpoint.user.default}/${params?.id}`,
          values
        );
      } else {
        response = await apiClient.post(`${apiEndpoint.user.default}`, values);
      }
      notify(response?.message, NOTIFY_MESSAGE_SUCCESS);
      router.push(SETTINGS_USERS);
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
        <h1 className="text-xl font-bold my-1 text-slate-700">
          {params?.id ? "Update" : "Create"} User
        </h1>
        <div className="w-full p-2 mt-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
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
                      label={`${values.docStatus}`}
                      isOn={values.docStatus === "Active"}
                      handleToggle={() =>
                        setFieldValue(
                          "docStatus",
                          values.docStatus === "Active" ? "Inactive" : "Active"
                        )
                      }
                      onColor="bg-[#73c002]"
                      offColor="bg-gray-300"
                      size="md"
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

export default WithAuthorization(UserUpdatePage, [CREATE_ROLE, UPDATE_USER]);
