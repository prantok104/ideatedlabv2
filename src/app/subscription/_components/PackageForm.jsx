"use client";

import Checkbox from "@/components/form/Checkbox";
import SearchableSelect from "@/components/form/SearchableSelect";
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
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { FaTrashAlt } from "react-icons/fa";
import { SUBSCRIPTION_PACKAGES_PLAN } from "@/utils/router";
import Module from "./Module";
import Accordion from "@/components/accordion/Accordion";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
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
  description: Yup.string().nullable(),
  company: Yup.string().nullable(),
  content: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.boolean(),
        title: Yup.string().required("Title is required"),
      })
    )
    .min(1, "At least one feature must be provided"),
  features: Yup.array()
    .of(Yup.string().required("Feature ID is required"))
    .min(1, "At least one feature is required"),
});

export default function PackageForm({ params }) {
  const [featuresModule, setFeaturesModule] = useState();
  const [isCompany, setCompany] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    type: "",
    module: "",
    durationType: "",
    fee: null,
    currency: "",
    company: null,
    totalLoadPost: null,
    totalTruckPost: null,
    totalQuota: null,
    description: "",
    content: [{ value: false, title: "" }],
    features: [],
  });

  const router = useRouter();
  const isEditMode = Boolean(params?.id);
  const apiURL = isEditMode
    ? `${apiEndpoint.subscription.default}/${params.id}?feature=true`
    : null;

  const { data } = apiClient.useAxiosSWR(isEditMode ? apiURL : null);
  const subscriptionPackages = data?.data;

  const handleModuleChange = async (newModule, setFieldValue) => {
    await fetchFeaturesByType(newModule);

    if (newModule !== initialValues.module) {
      setFieldValue("features", []); // Reset features if changing to a different module
    } else {
      setFieldValue("features", initialValues.features); // Keep current features if the same module is reselected
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
    if (value === "Custom") {
      const companyListEndPoint = apiEndpoint.packages.companyList;
      const { data } = await apiClient.get(companyListEndPoint);
      const companyOptions = data?.map((company) => ({
        label: company.title,
        value: company.id,
      }));
      setCompany(companyOptions);
    } else {
      setCompany([]);
    }
  };

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    let payload;

    // if (values.type !== "Custom") {
    //   setFieldValue("company", null); // Reset company field
    // }

    if (isEditMode) {
      payload = {
        ...values,
        ...{ id: `${params.id}` },
        content: values.content,
        features: values.features,
        type: values.type,
        name: values.type !== "Custom" ? values.type : values.name,
        company: values.type !== "Custom" ? null : values.company,
      };
    } else {
      payload = {
        ...values,
        content: values.content,
        features: values.features,
        name: values.type !== "Custom" ? values.type : values.name,
      };
    }

    try {
      const response = await apiClient.post(
        apiEndpoint.subscription.default,
        payload
      );

      toast.success(
        `Package ${isEditMode ? "updated" : "created"} successfully!`
      );
      resetForm();
      router.push(SUBSCRIPTION_PACKAGES_PLAN); // Redirect back to roles list
    } catch (error) {
      toast.error(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the package.`
      );
    }

    resetForm();
  };

  useEffect(() => {
    if (isEditMode) {
      setInitialValues({
        name: subscriptionPackages?.name,
        type: subscriptionPackages?.type,
        module: subscriptionPackages?.module,
        durationType: subscriptionPackages?.durationType,
        fee: subscriptionPackages?.fee,
        currency: subscriptionPackages?.currency,
        company: subscriptionPackages?.company,
        totalLoadPost: subscriptionPackages?.totalLoadPost,
        totalTruckPost: subscriptionPackages?.totalTruckPost,
        totalQuota: subscriptionPackages?.totalQuota,
        description: subscriptionPackages?.description,
        content: subscriptionPackages?.content?.map((item) => ({
          value: item.value || false,
          title: item.title || "",
        })) || [{ value: false, title: "" }],
        features:
          subscriptionPackages?.features?.map((feature) => feature.id) || [],
      });

      fetchFeaturesByType(subscriptionPackages?.module);

      handleCustom(subscriptionPackages?.type);
    }
  }, [subscriptionPackages]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue, resetForm, isValid }) => (
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
                    <div>
                      <SearchableSelect
                        label="Package Type"
                        name="type"
                        options={SUBSCRIPTION_TYPES}
                        onChange={(option) => {
                          setFieldValue("type", option.value);
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
                        placeholder="Package name"
                      ></TextInput>
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="User Type"
                        name="module"
                        options={MODULE_TYPES}
                        onChange={(option) => {
                          handleModuleChange(option.value, setFieldValue); // Use the new function here
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
                    <div className="mt-2">
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
                    <div className="mt-2">
                      <TextInput
                        label="Total Load Post"
                        name="totalLoadPost"
                        placeholder="Load"
                      ></TextInput>
                    </div>
                    <div className="mt-2">
                      <TextInput
                        label="Total Truck Post"
                        name="totalTruckPost"
                        placeholder="Truck load"
                      ></TextInput>
                    </div>
                    <div className="mt-2">
                      <TextInput
                        label="Total Quota "
                        name="totalQuota"
                        placeholder="Quota"
                      ></TextInput>
                    </div>
                  </div>
                  <div className="col-span-12 mt-3">
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
                        {values?.content?.map((feature, index) => (
                          <div
                            key={index}
                            className="flex gap-4 py-2 border-b items-center"
                          >
                            <div className="flex items-center justify-center w-1/12 -ml-5">
                              <Checkbox
                                size="h-5 w-5"
                                label=""
                                name={`content.${index}.value`}
                                checked={feature.value}
                                onChange={(e) => {
                                  setFieldValue(
                                    `content.${index}.value`,
                                    e.target.checked
                                  );
                                }}
                                placeholder="Enter content"
                              />
                            </div>
                            <div className="w-10/12 ml-5">
                              <TextInput
                                label=""
                                name={`content.${index}.title`}
                                value={feature.title}
                              />
                            </div>
                            <div className="w-1/12 ml-5 p-2">
                              {index > 0 && (
                                <FaTrashAlt
                                  className="cursor-pointer hover:text-red-500 "
                                  onClick={() => remove(index)}
                                />
                              )}
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

            <div className="mt-10">
              <Accordion title="Features">
                <div className="col-span-12">
                  {featuresModule?.map((moduleData) => {
                    return (
                      <Module
                        key={moduleData?.module}
                        moduleData={moduleData}
                        checkedList={values?.features}
                        setFieldValue={setFieldValue}
                      />
                    );
                  })}
                </div>
              </Accordion>
            </div>
            <div className="mt-36 flex justify-center gap-4">
              <button
                type="button"
                className="text-white px-4 py-3 bg-[#919eab] rounded-md text-base font-semibold font-['Public Sans'] leading-normal w-52"
                onClick={() => router.push(SUBSCRIPTION_PACKAGES_PLAN)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#73C002] text-white px-4 py-3 rounded-md text-base font-semibold font-['Public Sans'] leading-normal w-52"
                // disabled={isSubmitting || isValid}
                // onClick={() => router.push(SUBSCRIPTION_PACKAGES_PLAN)}
              >
                {isEditMode ? "Update Package" : "Create New Package"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
