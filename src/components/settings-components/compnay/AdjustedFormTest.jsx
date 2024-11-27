"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import AddressInputs from "./AddressInputs";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { BiPencil } from "react-icons/bi";
import BasicInformation from "./BasicInformation";
import SettingsInformation from "./SettingsInformation";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import FileUploadField from "./local-components/FileUploadField";
import ContactInfro from "./ContactInfro";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import TextInput from "@/components/form/TextInput";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  // profileImage: Yup.mixed().nullable(), // Optional image
  country: Yup.string().when([], (value, schema, { isAddressEditable }) =>
    isAddressEditable ? schema.required("Country Name is required") : schema
  ),
  state: Yup.string().when([], (value, schema, { isAddressEditable }) =>
    isAddressEditable ? schema.required("State Name is required") : schema
  ),
  city: Yup.string().when([], (value, schema, { isAddressEditable }) =>
    isAddressEditable ? schema.required("City Name is required") : schema
  ),
  zipCode: Yup.string().when([], (value, schema, { isAddressEditable }) =>
    isAddressEditable ? schema.required("Zip Code is required") : schema
  ),
  streetAddress: Yup.string().when([], (value, schema, { isAddressEditable }) =>
    isAddressEditable ? schema.required("Street Address is required") : schema
  ),
  currency: Yup.string().when([], (value, schema, { isSettingsEditable }) =>
    isSettingsEditable ? schema.required("Currency is required") : schema
  ),
  timezone: Yup.string().when([], (value, schema, { isSettingsEditable }) =>
    isSettingsEditable ? schema.required("Timezone is required") : schema
  ),
  weekdays: Yup.string().when([], (value, schema, { isSettingsEditable }) =>
    isSettingsEditable ? schema.required("Weekdays is required") : schema
  ),
  openingHours: Yup.string().when([], (value, schema, { isSettingsEditable }) =>
    isSettingsEditable ? schema.required("Opening Hours is required") : schema
  ),
  closingHours: Yup.string().when([], (value, schema, { isSettingsEditable }) =>
    isSettingsEditable ? schema.required("Closing Hours is required") : schema
  ),
  // ContactPersonName: Yup.string(),
  // ContactPersonEmail: Yup.string().email("Invalid email"),
  // ContactPersonPhone: Yup.string(),
});

const AdjustedFormTest = () => {
  const [isAddressEditable, setAddressEditable] = useState(false);
  const [isSettingsEditable, setSettingsEditable] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  // State for the right drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const initialValues = {
  //   // profileImage: companyDetails?.profileImage, // Accepts URL or null
  //   companyName: companyDetails?.title,
  //   companyType: companyDetails?.industryType,
  //   binNumber: companyDetails?.binNumber,
  //   emailAddress: companyDetails?.email,
  //   phoneNumber: companyDetails?.phone,
  //   ...(isAddressEditable && {
  //     country: companyDetails?.country ?? "",
  //     state: companyDetails?.state ?? "",
  //     city: companyDetails?.city ?? "",
  //     zipCode: companyDetails?.zipCode ?? "",
  //     address: companyDetails?.address ?? ""
  //   }),
  //   ...(isSettingsEditable && {
  //     currency: companyDetails?.currency ?? "",
  //     timezone: companyDetails?.timezone ?? "",
  //     weekdays: companyDetails?.weekdays ?? "",
  //     openingHours: companyDetails?.openingHours ?? "",
  //     closingHours: companyDetails?.closingHours ?? ""
  //   })
  // };

  const initialValues = {
    // profileImage: companyDetails?.profileImage, // Accepts URL or null
    companyName: companyDetails?.title,
    companyType: companyDetails?.industryType,
    binNumber: companyDetails?.binNumber,
    emailAddress: companyDetails?.email,
    phoneNumber: companyDetails?.phone,
    country: companyDetails?.country ?? "",
    state: companyDetails?.state ?? "",
    city: companyDetails?.city ?? "",
    zipCode: companyDetails?.zipCode ?? "",
    address: companyDetails?.address ?? "",
    currency: companyDetails?.currency ?? "",
    timezone: companyDetails?.timezone ?? "",
    weekEnd: companyDetails?.weekEnd ?? "",
    openingHours: companyDetails?.openingHours ?? "",
    closingHours: companyDetails?.closingHours ?? "",
  };

  const toggleEditMode = (resetForm) => {
    setAddressEditable((prev) => !prev);
    resetForm();
  };

  const toggleEditModeSettings = (resetForm) => {
    setSettingsEditable((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await apiClient.put(
        `${apiEndpoint.compnay.editInfo}/${companyDetails?.id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Company details updated successfully!");
        setCompanyDetails(response.data); // Update displayed details
      }
    } catch (error) {
      toast.error("Failed to update company details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await apiClient.get(apiEndpoint.compnay.default);
        setCompanyDetails(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };
    fetchCompanyDetails();
  }, []);

  console.log("companyDetails", companyDetails);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange
        validateOnBlur
        context={{ isAddressEditable, isSettingsEditable }}
      >
        {({ values, resetForm, setFieldValue }) => (
          <Form>
            <div className="px-3.5 mb-3 bg-white rounded-xl flex items-start">
              <FileUploadField
                name="profileImage"
                label=""
                isImage
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("profileImage", file);
                }}
              />
            </div>

            <BasicInformation companyType={values.companyType} />

            {/* Address Section */}
            <div className="px-6 py-6 mb-3 bg-white rounded-xl">
              <div className="flex justify-between">
                <div className="text-[#454f5b] text-xl font-semibold leading-7">
                  Address Information
                </div>
                <div>
                  {!isAddressEditable ? (
                    <Button
                      variant="stroke"
                      size="small"
                      iconRight={<BiPencil />}
                      onClick={() => toggleEditMode(resetForm)}
                    >
                      Update Address
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        variant="stroke"
                        size="small"
                        type="button"
                        onClick={() => {
                          setFieldValue("isAddressEditable");
                          toggleEditMode(resetForm);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="base" size="small" type="submit">
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <AddressInputs
                isEditable={isAddressEditable}
                resetForm={resetForm}
                companyDetails={companyDetails}
              />
            </div>

            {/* Settings Section */}
            <div className="px-6 py-6 mb-3 bg-white rounded-xl">
              <div className="flex justify-between">
                <div className="text-[#454f5b] text-xl font-semibold leading-7">
                  Settings
                </div>
                <div>
                  {!isSettingsEditable ? (
                    <Button
                      variant="stroke"
                      size="small"
                      iconRight={<BiPencil />}
                      onClick={() => toggleEditModeSettings(resetForm)}
                    >
                      Update Settings
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        variant="stroke"
                        size="small"
                        type="button"
                        onClick={() => {
                          setFieldValue("isSettingsEditable");
                          toggleEditModeSettings(resetForm);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="base" size="small" type="submit">
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <SettingsInformation
                isEditableSettings={isSettingsEditable}
                resetForm={resetForm}
                companyDetails={companyDetails}
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="w-full p-4 mb-3 bg-white rounded-xl">
        {/* <div className="flex justify-between">
          <div className="text-[#454f5b] text-xl font-semibold leading-7">
            Contact
          </div>
          <div>
            <Button
              variant="stroke"
              size="small"
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Contact
            </Button>
          </div>
        </div> */}

        <ContactInfro />
      </div>

      {/* <RightDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        style="w-1/4"
      >
        <h2 className="text-lg font-semibold mt-10 mb-10">Add New Contact</h2>

        <TextInput
          label="Name"
          name="ContactPersonName"
          type="text"
          placeholder="Enter first name"
        />

        <div className="mt-4">
          <TextInput
            label="Email"
            name="ContactPersonEmail"
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="mt-4">
          <TextInput
            label="Phone"
            name="ContactPersonPhone"
            type="text"
            placeholder="Enter phone number"
          />
        </div>

        <div className="mt-40 flex justify-center gap-2">
          <div className="w-full">
            <Button
              variant="stroke"
              size="small"
              onClick={() => {
                setIsDrawerOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="w-full">
            <Button variant="base" size="small" type="submit">
              Save
            </Button>
          </div>
        </div>
      </RightDrawer> */}
    </div>
  );
};

export default AdjustedFormTest;
