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
import { SETTINGS_ROLES } from "@/utils/router";
import TextArea from "@/components/form/TextArea";
import Module from "@/app/settings/roles/_component/Module";
import { useEffect, useState } from "react";

const RoleForm = ({ params, permissionList }) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    permissions: [],
  });

  const router = useRouter();
  const isEditMode = Boolean(params?.id);
  const apiURL = isEditMode
    ? `${apiEndpoint.role.default}/${params.id}?withPermissions=true`
    : null;

  const { data } = apiClient.useAxiosSWR(isEditMode ? apiURL : null);
  const role = data?.data;

  const validationSchema = Yup.object({
    title: Yup.string().required("Role name is required"),
    description: Yup.string(),
    permissions: Yup.array().required("Permission is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      title: values.title,
      description: values.description,
      permissions: values.permissions,
    };
    // console.log(values.permissions);

    try {
      let response;
      if (isEditMode) {
        response = await apiClient.put(apiURL, payload); // Update role
      } else {
        response = await apiClient.post(apiEndpoint.role.default, payload); // Create new role
      }
      toast.success(`Role ${isEditMode ? "updated" : "created"} successfully!`);
      resetForm();
      router.push(SETTINGS_ROLES); // Redirect back to roles list
    } catch (error) {
      toast.error(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the role.`
      );
    }
  };

  useEffect(() => {
    setInitialValues({
      title: role?.title,
      description: role?.description,
      permissions: role?.permissions?.map((permission) => permission.id) || [],
    });
  }, [role]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, isValid }) => {
        // const handleSelectAll = (event) => {
        //   setFieldValue(
        //     "permission",
        //     values.permission.map((item) => ({
        //       ...item,
        //       checked: event.target.checked,
        //     }))
        //   );
        // };

        // const handlePermissionChange = (index) => (event) => {
        //   setFieldValue(
        //     "permission",
        //     values.permission.map((item, i) =>
        //       i === index ? { ...item, checked: event.target.checked } : item
        //     )
        //   );
        // };

        // const allSelected = values.permission.every((item) => item.checked);
        // const noneSelected = values.permission.every((item) => !item.checked);
        // const isIndeterminate = !allSelected && !noneSelected;

        return (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4">
              <div className="col-span-12">
                <TextInput
                  label="Role Name"
                  type="text"
                  name="title"
                  placeholder="Enter role name"
                />
              </div>
              <div className="col-span-12">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="mt-10">
              <Accordion title="Assign Permission">
                <div className="col-span-12">
                  {permissionList.map((moduleData) => {
                    console.log("Permissions", values.permissions);

                    return (
                      <Module
                        key={moduleData.module}
                        moduleData={moduleData}
                        checkedList={values.permissions}
                        setFieldValue={setFieldValue}
                      />
                    );
                  })}
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
