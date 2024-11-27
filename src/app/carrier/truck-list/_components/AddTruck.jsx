"use client";

import Button from "@/components/button/Button";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

// Validation schema for numerical input
const validationSchema = Yup.object({
  title: Yup.string().required("Truck name is required"),
  type: Yup.string().required("Trailer type is required"),
  truckNumber: Yup.string().required("Truck number is required"),
  length: Yup.number()
    .typeError("Length must be a number")
    .required("Length is required"),
  lengthUnit: Yup.string().required("Length unit is required"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .required("Weight is required"),
  weightUnit: Yup.string().required("Weight unit is required"),
  height: Yup.number()
    .typeError("Height must be a number")
    .required("Height is required"),
  heightUnit: Yup.string().required("Height unit is required"),
  waitingCharge: Yup.number()
    .typeError("Waiting charge must be a number")
    .required("Waiting charge is required"),
});

const lengthHeightUnitOptions = [
  { label: "ft", value: "ft" },
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
  { label: "in", value: "in" },
];

const weightUnitOptions = [
  { label: "kg", value: "kg" },
  { label: "lb", value: "lb" },
  { label: "t", value: "t" },
];

const AddTruck = ({ id, setTruckModified = false }) => {
  const [file, setFile] = useState([]);
  const [fileData, setFileData] = useState();

  const { data: type } = apiClient.useAxiosSWR(apiEndpoint.trailers.default);
  const { data: truckListData, error } = apiClient.useAxiosSWR(
    apiEndpoint.carrier.truckList
  );

 

  // Check for loading state
  if (!truckListData) {
    return <div>Loading...</div>;
  }

  // Check for error state
  if (error) {
    return <div>Error loading truck data: {error.message}</div>;
  }

  // Accessing the truck data
  const trucks = truckListData.data.find((truck) => truck.id === id) || [];

  const trailerOptions = type?.data.map((trailer) => ({
    label: trailer.title,
    value: trailer.type,
  }));

  

  const handleFileUpload = async (event, setFieldValue) => {
    const files = event.target.files;
    const newFileLinks = []; // Array to store links for the current upload batch

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

        const uploadedFileLink = response.data;
        if (response.status === 200) {
          toast.success(response.message);
          newFileLinks.push(uploadedFileLink); // Collect uploaded file links
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    // Update Formik's field value for attachments
    setFieldValue("attachments", [...file, ...newFileLinks]);
  };

  const initialValues = {
    id: id,
    title: trucks?.title,
    type: trucks?.type,
    truckNumber: trucks?.truckNumber,
    length: trucks?.length,
    lengthUnit: trucks?.lengthUnit,
    weight: trucks?.weight,
    weightUnit: trucks?.weightUnit,
    height: trucks?.height,
    heightUnit: trucks?.heightUnit,
    waitingCharge: trucks?.waitingCharge,
    attachments: file,
  };

  const handleSubmit = async (values) => {
    try {
      const response = await apiClient.post(apiEndpoint.carrier.truck, values);
      toast.success(response?.message);
      setTruckModified(true);
    } catch (e) {
      toast.error(e?.message);
    }
  };

  const handleDeleteFile = (fileId) => {
    setFile((prevFile) => prevFile.filter((file) => file.id !== fileId));
  };

  return (
    <div>
      {id ? (
        <h1 className="text-[#1c252e] text-xl font-medium mt-10 mb-[11px] leading-7">
          Update Truck {trucks?.title || "not come"}
        </h1>
      ) : (
        <h1 className="text-[#1c252e] text-xl font-medium mt-10 mb-[11px] leading-7">
          Add Truck
        </h1>
      )}

      <h5 className="text-[#919eab] text-sm font-medium uppercase leading-tight mb-8">
        Truck Specifications
        {/* {JSON.stringify(file)} */}
      </h5>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
        validateOnBlur
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="col-span-full">
              <TextInput
                name="title"
                label="Truck Name"
                placeholder="Truck Name"
                values={trucks?.title}
              />
            </div>

            <div className="col-span-full">
              <SearchableSelect
                label="Trailer Type"
                name="type"
                options={trailerOptions}
                placeholder="Select"
              />
            </div>

            <div className="col-span-full">
              <TextInput
                name="truckNumber"
                label="Truck Number"
                placeholder="Truck Number"
                value={trucks?.truckNumber}
              />
            </div>

            <div className="col-span-1">
              <TextInput name="length" label="Length" placeholder="Length" />
            </div>

            <div className="col-span-1">
              <SearchableSelect
                name="lengthUnit"
                label="Length Unit"
                options={lengthHeightUnitOptions}
                placeholder="Unit"
              />
            </div>

            <div className="col-span-1">
              <TextInput
                name="weight"
                label="Weight"
                placeholder="Weight"
                value={trucks?.weight}
              />
            </div>

            <div className="col-span-1">
              <SearchableSelect
                name="weightUnit"
                label="Weight Unit"
                options={weightUnitOptions}
                placeholder="Unit"
              />
            </div>

            <div className="col-span-1">
              <TextInput
                name="height"
                label="Height"
                placeholder="Height"
                value={trucks?.height}
              />
            </div>

            <div className="col-span-1">
              <SearchableSelect
                name="heightUnit"
                label="Height Unit"
                options={lengthHeightUnitOptions}
                placeholder="Unit"
              />
            </div>

            <div className="col-span-full">
              <TextInput
                name="waitingCharge"
                label="Waiting Charge"
                placeholder="Waiting Charge"
                value={trucks?.waitingCharge}
              />
            </div>

            {/* <div className="mt-2 mb-8">
              <input
                type="file"
                multiple
                onChange={(event) => handleFileUpload(event, setFieldValue)} // Pass setFieldValue here
              />
              <p>Minimum file size: 5MB</p>
            </div> */}

            {/* file uplaod section here */}
            <div className="mt-2 mb-8">
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
                              fileItem.preview ||
                              "/path/to/placeholder-image.png"
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
            </div>

            {/* file uplaod section here end */}

            <div className="col-span-full mt-4">
              <Button type="submit">{id ? "Update Truck" : "Add Truck"}</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTruck;
