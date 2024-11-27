"use client";

import Checkbox from "@/components/form/Checkbox";
import CKEditorComponent from "@/components/form/CKEditor";
import SearchableSelect from "@/components/form/SearchableSelect";
import Switch from "@/components/form/Swtich";
import TextArea from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  CURRENCY_TYPES,
  MODULE_BROKER,
  MODULE_CARRIER,
  MODULE_SHIPPER,
  MODULE_TYPES,
  SUBSCRIPTION_DURATION_TYPES,
  SUBSCRIPTION_TYPES,
} from "@/utils/static-const";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import * as Yup from "yup";
import PermissionTree from "../_components/PermissionTree";
import FeatureCheckbox from "../_components/FeaturesCheckbox";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";

// Define Yup validation schema
const validationSchema = Yup.object({
  // name: Yup.string().required("The name field must be defined"),
  type: Yup.string().required("The type field must be defined"),
  module: Yup.string().required("The module field must be defined"),
  fee: Yup.number()
    .typeError("Fee must be a number")
    .required("The fee field must be defined")
    .min(0, "Fee must be at least 0"),
  currency: Yup.string().required("The currency field must be defined"),
  durationType: Yup.string().required("The durationType field must be defined"),
  totalLoadPost: Yup.number()
    .typeError("Total Load Post must be a number")
    .required("The totalLoadPost field must be defined")
    .min(0, "Total Load Post must be at least 0"),
  totalTruckPost: Yup.number()
    .typeError("Total Truck Post must be a number")
    .required("The totalTruckPost field must be defined")
    .min(0, "Total Truck Post must be at least 0"),
  totalQuota: Yup.number()
    .typeError("Total Quota must be a number")
    .required("The totalQuota field must be defined")
    .min(0, "Total Quota must be at least 0"),
  description: Yup.string().nullable(), // Optional
  company: Yup.string().nullable(), // Optional, can be null or a valid string
  content: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.boolean().required("Value is required"),
        title: Yup.string().nullable(), // Optional
      })
    )
    .min(1, "At least one feature must be provided"),
  features: Yup.array()
    .of(Yup.string().required("Feature ID is required")) // Validates IDs as strings
    .min(1, "At least one feature is required"), // Requires at least one feature
});

export default function Page() {
  const router = useRouter();
  const [expandedFeatures, setExpandedFeatures] = useState([]); // Track which features are expanded
  const [isAccordion, setAccordion] = useState(false);
  const contentRef = useRef(null); // Reference to the content
  const [isfeaturesModule, setFeaturesModule] = useState();
  const [isCompany, setCompany] = useState([]);
  // const [isCustom, setCustom] = useState();
  // console.log("custom", isCustom);

  const toggleAccordion = () => {
    setAccordion((prev) => !prev);
  };

  const initialValues = {
    name: "", // String
    type: "", // String
    module: "", // String
    durationType: "", // String
    fee: null, // Number, defaults to 0
    currency: "", // String
    company: null, // Optional
    totalLoadPost: null, // Number
    totalTruckPost: null, // Number
    totalQuota: null, // Number
    description: "", // Optional
    content: [{ value: false, title: "" }], // Array of objects
    features: [], // Array of IDs (expected to be strings)
  };

  // Toggle a feature (expand or collapse its permissions)
  const toggleFeature = (featureName) => {
    if (expandedFeatures.includes(featureName)) {
      setExpandedFeatures(
        expandedFeatures.filter((name) => name !== featureName)
      );
    } else {
      setExpandedFeatures([...expandedFeatures, featureName]);
    }
  };

  // Handle feature selection (select/deselect all permissions under the feature)
  const handleFeatureSelect = (
    featureName,
    featurePermissions,
    values,
    setFieldValue
  ) => {
    const isSelected = featurePermissions.every((id) =>
      values.features.includes(id)
    );

    if (isSelected) {
      // Deselect all permissions under this feature
      setFieldValue(
        "features",
        values.features.filter((id) => !featurePermissions.includes(id))
      );
      toggleFeature(featureName); // Collapse the tree if the feature is deselected
    } else {
      // Select all permissions under this feature
      setFieldValue("features", [
        ...values.features,
        ...featurePermissions.filter((id) => !values.features.includes(id)),
      ]);
      setExpandedFeatures([...expandedFeatures, featureName]); // Ensure the tree is expanded
    }
  };

  const fetchFeaturesByType = async (type) => {
    const featuresEndPoint = apiEndpoint.packages.features;

    const { data: featuresByType } = await apiClient.get(featuresEndPoint, {
      params: {
        module:
          type === MODULE_BROKER ? `${MODULE_SHIPPER},${MODULE_CARRIER}` : type,
      },
    });

    setFeaturesModule(featuresByType);
  };

  const handleCustom = async (value) => {
    // Check if input value is "Custom"
    if (value === "Custom") {
      // try {
      const companyListEndPoint = apiEndpoint.packages.companyList;

      // Make the API call and wait for the result
      const { data } = await apiClient.get(companyListEndPoint);

      const companyOptions = data?.map((company) => ({
        label: company.title,
        value: company.id,
      }));
      setCompany(companyOptions);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const filteredFeatures = values.content.filter(
      (feature) =>
        (feature.value === true && feature.title) || // Keep if value is true and title is non-empty
        (feature.value === false && feature.title) // Keep if value is false and title exists
    );

    const payload = {
      ...values,
      content: filteredFeatures, // Use filtered content
      name: values.type !== "Custom" ? values.type : values.name,
    };

    try {
      const subscriptionEndPoint = apiEndpoint.subscription.default;
      await apiClient.post(subscriptionEndPoint, payload); // Ensure correct payload structure
      notify("Package has created successfully", NOTIFY_MESSAGE_SUCCESS);
      resetForm({ values: initialValues });
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }

    // console.log(filteredFeatures);
  };

  return (
    <div>
      <h1 className="font-semibold text-xl text-[#454F5B] mb-9">
        Package Details
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          isSubmitting,
          isValid,
          errors,
          values,
          setFieldValue,
          resetForm,
        }) => (
          <Form>
            <div className="flex gap-5">
              <div className="w-full">
                <h2 className="text-[#454f5b] text-base font-semibold font-['Public Sans'] leading-normal">
                  Plan Information
                </h2>
                <div
                  className="p-4"
                  style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="mt-2">
                      <SearchableSelect
                        label="Package Type"
                        name="type"
                        options={SUBSCRIPTION_TYPES}
                        onChange={(option) => {
                          handleCustom(option.value);
                        }}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Package Name"
                        name="name"
                        value={
                          values.type !== "Custom" ? values.type : values.name
                        }
                        disabled={values.type !== "Custom"}
                      ></TextInput>
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="User Type"
                        name="module"
                        options={MODULE_TYPES}
                        onChange={(option) => {
                          fetchFeaturesByType(option.value);
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="Package Duration"
                        name="durationType"
                        options={SUBSCRIPTION_DURATION_TYPES}
                      ></SearchableSelect>
                    </div>
                    <div>
                      <TextInput label="Fee" name="fee"></TextInput>
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="Currency"
                        name="currency"
                        options={CURRENCY_TYPES}
                      ></SearchableSelect>
                    </div>
                    {values.type === "Custom" && (
                      <div className="mt-2">
                        <SearchableSelect
                          label="Company"
                          name="company"
                          // disabled={values.type !== "Custom"} // Disable when name is not "Custom"
                          options={isCompany}
                        ></SearchableSelect>
                      </div>
                    )}
                    <div>
                      <TextInput
                        label="Total Load Post"
                        name="totalLoadPost"
                      ></TextInput>
                    </div>
                    <div>
                      <TextInput
                        label="Total Truck Load"
                        name="totalTruckPost"
                      ></TextInput>
                    </div>
                    <div>
                      <TextInput
                        label="Total Quota "
                        name="totalQuota"
                      ></TextInput>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <TextArea label="Short Description" name="description" />
                  </div>

                  <h2 className="text-[#454f5b] text-base font-semibold font-['Public Sans'] leading-normal mt-4">
                    Feature Content
                  </h2>
                  <FieldArray name="content">
                    {({ remove, push }) => (
                      <div>
                        {/* Table Header */}
                        <div className="flex gap-4 bg-gray-100 py-2 rounded-t-md">
                          <div className="font-semibold w-1/12 px-2">
                            Available
                          </div>
                          <div className="font-semibold w-11/12">Title</div>
                        </div>

                        {/* Table Rows */}
                        {values.content.map((feature, index) => (
                          <div key={index} className="flex gap-4 py-2 border-b">
                            <div className="flex items-center justify-center w-1/12 -ml-5">
                              <Checkbox
                                size="h-5 w-5"
                                label=""
                                name={`content.${index}.value`}
                                value={feature.value}
                                onChange={(e) => {
                                  setFieldValue(
                                    `content.${index}.value`,
                                    e.target.checked
                                  );
                                }}
                              />
                            </div>
                            <div className="w-11/12 ml-5">
                              {/* <Field
                          type="text"
                          name={`features.${index}.title`}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Feature title"
                        /> */}
                              <TextInput
                                label=""
                                name={`content.${index}.title`}
                              />
                            </div>
                          </div>
                        ))}

                        {/* Add More Button */}
                        <button
                          type="button"
                          className="mt-4 mb-6 text-white px-4 py-2 bg-[#73C002] rounded-md"
                          onClick={() => push({ value: false, title: null })}
                        >
                          Add More
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            </div>

            <h2 className="text-[#1c252e] text-2xl font-semibold font-['Public Sans'] leading-loose mt-6">
              Features
            </h2>
            {/* <PermissionTree
              modules={isfeaturesModule?.features}
              values={values}
              setFieldValue={setFieldValue}
            /> */}

            <h2
              className="text-[#454f5b] text-base font-semibold font-['Public Sans'] inline-flex items-center cursor-pointer"
              onClick={toggleAccordion}
            >
              <BiChevronDown
                size={24}
                className={`transform transition-transform duration-300 mr-3 ${
                  isAccordion ? "rotate-180" : ""
                }`}
              />
              {values.module}
            </h2>

            <div
              ref={contentRef}
              className={`overflow-hidden transition-all duration-500 ease-in-out`} // Slow transition for height
              style={{
                maxHeight: isAccordion
                  ? `${contentRef.current.scrollHeight}px`
                  : "0", // Animate max height
              }}
            >
              {isfeaturesModule?.features.map((feature) => {
                const featurePermissions = feature.permissions.map((p) => p.id);
                // console.log("featurePermissions", featurePermissions);

                // Check if at least one permission is selected to expand the feature tree
                const isExpanded =
                  expandedFeatures.includes(feature.name) ||
                  featurePermissions.some((id) => values.features.includes(id));
                // console.log(values);

                return (
                  <div key={feature.name} className="ml-9">
                    {/* Feature Checkbox */}
                    <Checkbox
                      label={feature.name}
                      name={`features`}
                      value={feature.name}
                      checked={featurePermissions.every((id) =>
                        values.features.includes(id)
                      )}
                      onChange={() =>
                        handleFeatureSelect(
                          feature.name,
                          featurePermissions,
                          values,
                          setFieldValue
                        )
                      }
                    />

                    {/* Expand permissions if at least one permission is selected or the feature is manually expanded */}
                    {isExpanded &&
                      feature.permissions.map((permission) => {
                        const permissionId = permission.id;
                        const isChecked =
                          values.features.includes(permissionId);
                        return (
                          <div key={permissionId} className="ml-4">
                            <Checkbox
                              label={permission.title}
                              name={`features`}
                              value={permissionId}
                              checked={isChecked}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const currentPermissions = values.features;

                                if (isChecked) {
                                  // Add permission ID to features
                                  setFieldValue("features", [
                                    ...currentPermissions,
                                    permissionId,
                                  ]);
                                } else {
                                  // Remove permission ID if unchecked
                                  const updatedPermissions =
                                    currentPermissions.filter(
                                      (id) => id !== permissionId
                                    );
                                  setFieldValue("features", [
                                    ...updatedPermissions,
                                  ]);

                                  // If all permissions under the feature are unchecked, uncheck the feature checkbox
                                  if (
                                    featurePermissions.every(
                                      (id) => !updatedPermissions.includes(id)
                                    )
                                  ) {
                                    toggleFeature(feature.name);
                                  }
                                }
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>

            <div className="mt-36 flex justify-center gap-4">
              <button
                type="button"
                className="text-white px-4 py-3 bg-[#919eab] rounded-md text-base font-semibold font-['Public Sans'] leading-normal w-52"
                onClick={() => router.push("/admin/subscription/packages")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#73C002] text-white px-4 py-3 rounded-md text-base font-semibold font-['Public Sans'] leading-normal w-52"
                disabled={isSubmitting}
              >
                Create New Package
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
