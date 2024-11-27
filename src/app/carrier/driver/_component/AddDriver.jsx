
"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import TextInput from "@/components/form/TextInput";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/button/Button";
import CustomFileUpload from "./CustomFileUpload";
import { useOptions } from "@/hooks/useOptions";
import { AVAILABILITY_TYPES, ratingOptions } from "@/utils/static-const";

const validationSchema = Yup.object({
  identificationNumber: Yup.string().required("Driver ID is required"),
  name: Yup.string().required("Driver Name is required"),
  phone: Yup.string().required("Driver phone is required"),
  email: Yup.string().required("Driver email is required"),
  address: Yup.string().required("Driver address is required"),
  status: Yup.string().required("Driver status is required"),
  attachments: Yup.array(),
  avatar: Yup.mixed(),
});

const AddDriver = ({ id}) => {
  const [file, setFile] = useState([]);
  const options = useOptions(AVAILABILITY_TYPES);

  const { data: driverList, error, mutate } = apiClient.useAxiosSWR(
    apiEndpoint.driver.default
  );

  useEffect(() => {
    if (driverList) {
      mutate();
    }
  }, [driverList]);

  // Check for loading state
  if (!driverList) {
    return <div>Loading...</div>;
  }

  // Check for error state
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  // Accessing the truck data
  const driver = driverList.data.find((driver) => driver.id === id) || [];

  const initialValues = {
    id: id,
    avatar: driver.avatar, // Change to null for mixed type
    identificationNumber: driver.identificationNumber,
    name: driver.name,
    phone: driver.phone,
    email: driver.email,
    address: driver.address,
    status: driver.status,
    attachments: driver.attachments,
    ratingCount: driver.ratingCount,
    totalRatings: driver.totalRatings,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "attachments") {
        values.attachments.forEach((file) =>
          formData.append("attachments[]", file)
        );
      } else if (values[key]) {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await apiClient.post(
        apiEndpoint.driver.default,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Driver added successfully!");
        setSubmitting(true);
        setFile([]); // Clear the file state after successful submission
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (event, setFieldValue) => {
    const files = event.target.files;
    const newFileLinks = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await apiClient.post(
          apiEndpoint.upload.default,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const uploadedFileLink = response.data; // Assuming the link is in response.data
          newFileLinks.push(uploadedFileLink);
          toast.success("File uploaded successfully!");
        }
      } catch (error) {
        toast.error("File upload failed: " + error.message);
      }
    }

    // Update Formik's field value for attachments
    setFieldValue("attachments", [...file, ...newFileLinks]);
    setFile([...file, ...newFileLinks]); // Update local state as well
  };

  const handleDeleteFile = (fileId) => {
    setFile((prevFile) => prevFile.filter((file) => file.id !== fileId));
  };

  return (
    <div>
      {id ? (
        <h2 className="text-xl font-medium my-8">Update Driver</h2>
      ) : (
        <h2 className="text-xl font-medium my-8">Add Driver</h2>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
      >
        {({ setFieldValue, isSubmitting, values, errors, touched, resetForm, setValues }) => (
          <Form>
            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <CustomFileUpload
                label="Driver Image"
                name="avatar"
                accept="image/*"
                onChange={(image) => setFieldValue("avatar", image)}
                existingImage={initialValues.avatar}
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <TextInput
                label="Driver ID"
                name="identificationNumber"
                type="text"
                placeholder="Enter ID"
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <TextInput
                label="Driver Name"
                name="name"
                type="text"
                placeholder="Adib Nur"
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <TextInput
                label="Phone Number"
                name="phone"
                type="text"
                placeholder="41511 744552"
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <TextInput
                label="Email Address"
                name="email"
                type="text"
                placeholder="Enter Email"
              />
            </div>

            <div className="mb-4">
              <SearchableSelect
                label="Rating"
                name="ratingCount"
                options={ratingOptions}
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <TextInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter Address"
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <SearchableSelect
                label="Status"
                name="status"
                options={options}
              />
            </div>

            <div className="mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Files (Max size: 5MB each)
              </label>
              <input
                id="fileUpload"
                type="file"
                multiple
                onChange={(event) => handleFileUpload(event, setFieldValue)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>

            <div className="mt-4">
              {file.length > 0 && (
                <div className="space-y-2">
                  {file.map((fileItem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            fileItem.preview || "/path/to/placeholder-image.png"
                          }
                          alt={fileItem.name}
                          className="w-10 h-10 mr-3 object-cover rounded"
                        />
                        <div className="text-sm text-gray-700">
                          <p>{fileItem.name}</p>
                          <p className="text-xs text-gray-400">
                            {fileItem.size} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteFile(fileItem.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {" "}
              {/* Margin top for spacing */}
              <Button type="submit">
                {id ? "Update Driver" : "Add Driver"}
              </Button>
              <Button type="reset" variant="stroke" size="medium">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDriver;
