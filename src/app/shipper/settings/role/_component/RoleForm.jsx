"use client";

import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import * as Yup from "yup";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import Accordion from "@/components/accordion/Accordion";
import Button from "@/components/button/Button";
import TextInput from "@/components/form/TextInput";

// Dynamically import CKEditor for SSR compatibility
const CKEditorComponent = dynamic(() => import("@/components/form/CKEditor"), {
  ssr: false,
});

// Custom checkbox component for handling checked/unchecked state
const CustomCheckbox = ({ checked, indeterminate, onChange, className }) => (
  <div className="relative">
    <input
      type="checkbox"
      className={`absolute opacity-0 cursor-pointer w-6 h-6 ${className}`}
      checked={checked}
      onChange={onChange}
      ref={(input) => {
        if (input) input.indeterminate = indeterminate;
      }}
    />
    <div
      className={`w-4 h-4 border border-gray-300 rounded ${
        checked ? "bg-green-600" : "bg-white"
      } ${className}`}
    >
      {checked && (
        <svg
          className="w-2 h-2 text-white mx-auto mt-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </div>
  </div>
);

const RoleForm = ({ params, permissionList }) => {
  const router = useRouter();
  const isEditMode = Boolean(params?.id);
  const apiURL = isEditMode
    ? `${apiEndpoint.role.default}/${params.id}?withPermissions=true`
    : apiEndpoint.role.default;

  const { data } = apiClient.useAxiosSWR(isEditMode ? apiURL : null);
  const role = data?.data;
  const initialPermissions = permissionList.map((permission) => ({
    name: permission.title,
    value: permission.code,
    checked:
      role?.assignedPermissions?.some(
        (assigned) => assigned.code === permission.code
      ) || false,
  }));

  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role name is required"),
    des: Yup.string(),
    permission: Yup.array().required("Permission is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      description: values.des,
      title: values.roleName,
      permissions: values.permission
        .filter((permission) => permission.checked)
        .map((permission) => permission.value),
    };

    try {
      let response;
      if (isEditMode) {
        response = await apiClient.put(apiURL, payload); // Update role
      } else {
        response = await apiClient.post(apiEndpoint.role.default, payload); // Create new role
      }
      toast.success(`Role ${isEditMode ? "updated" : "created"} successfully!`);
      resetForm();
      router.push("/admin/user-management/role"); // Redirect back to roles list
    } catch (error) {
      toast.error(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the role.`
      );
    }
  };

  return (
    <Formik
      initialValues={{
        roleName: role?.title || "",
        des: role?.description || "",
        permission: initialPermissions,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, isValid }) => {
        const handleSelectAll = (event) => {
          setFieldValue(
            "permission",
            values.permission.map((item) => ({
              ...item,
              checked: event.target.checked,
            }))
          );
        };

        const handlePermissionChange = (index) => (event) => {
          setFieldValue(
            "permission",
            values.permission.map((item, i) =>
              i === index ? { ...item, checked: event.target.checked } : item
            )
          );
        };

        const allSelected = values.permission.every((item) => item.checked);
        const noneSelected = values.permission.every((item) => !item.checked);
        const isIndeterminate = !allSelected && !noneSelected;

        return (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4">
              <div className="col-span-12">
                <TextInput
                  label="Role Name"
                  type="text"
                  name="roleName"
                  placeholder="Enter role name"
                />
              </div>
              <div className="col-span-12">
                <CKEditorComponent
                  label="Description"
                  name="des"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="mt-10">
              <Accordion title="Assign Permission">
                <div className="col-span-12">
                  <div className="flex items-center rounded-lg">
                    <div className="flex items-center bg-[#fff] rounded-lg p-3 mb-3">
                      <label className="flex items-center">
                        <CustomCheckbox
                          checked={allSelected}
                          indeterminate={isIndeterminate}
                          onChange={handleSelectAll}
                        />
                        <p className="ml-2 text-sm text-gray-600">Admin</p>
                        <p className="text-xs text-gray-500 text-center ms-5">
                          {
                            values.permission.filter((item) => item.checked)
                              .length
                          }{" "}
                          item(s) selected
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {values.permission.map((item, index) => (
                      <div
                        key={item.value}
                        className="flex items-center border rounded-md px-4 py-2"
                      >
                        <label className="flex items-center">
                          <CustomCheckbox
                            checked={item.checked}
                            onChange={handlePermissionChange(index)}
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {item.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion>
            </div>

            <div className="w-44 mt-10">
              <Button
                type="submit"
                variant="base"
                size="medium"
                disabled={isSubmitting || !isValid}
              >
                {isEditMode ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RoleForm;
