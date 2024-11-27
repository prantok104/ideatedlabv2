import React, { useState } from "react";
import GroupList from "./GroupList";
import SearchField from "@/components/table/tool/SearchField";
import { allContactData } from "./tempData";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import Button from "@/components/button/Button";

// Validation Schema using Yup
const validationSchema = Yup.object({
  groupName: Yup.string()
    .required("Group Name is required")
    .min(3, "Group Name must be at least 3 characters")
    .max(50, "Group Name cannot exceed 50 characters"),
});

const AddGroup = ({ onClose }) => {
  // const handleSearch = (value) => {
  //   updateQueryParams(appConfig, updateAppConfig, {
  //     search: value,
  //   });
  // };

  const handleSubmit = (values) => {
    console.log("Form Submitted", values);

    // You can add additional logic here
    // For example: send values to an API
    // axios.post('/api/submit', values).then(response => console.log(response));
  };

  return (
    <div className="mt-12">
      <h2 className="mb-4 mt-8 text-xl font-medium font-['Inter'] leading-7">
        Add Group
      </h2>
      <Formik
        initialValues={{ groupName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, resetForm }) => (
          <Form>
            {/* Group Name Field */}
            <div className="w-4/12">
              <TextInput
                label="Enter Group Name"
                name="groupName"
                placeholder="Group Name"
              />
            </div>

            {/* <div className="flex items-center gap-4 mt-4 mb-2">
              <div className="w-4/12">
                <SearchField
                  placeholder="Search Contacts"
                  // onChange={handleSearch}
                  bottomText="Search name, email, authority, company or affiliate ID"
                />
              </div>
            </div> */}

            {/* Data display */}
            {/* <div>
              <GroupList rows={allContactData} />
            </div> */}

            {/* Submit Button (Optional for testing) */}
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
                  // disabled={isSubmitting}
                >
                  Create
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGroup;
