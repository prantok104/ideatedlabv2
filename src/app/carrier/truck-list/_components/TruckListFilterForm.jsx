"use client";

import TrailerType from "@/app/shipper/shipment/post-new-shipment/components/truck-details/TrailerType";
import Button from "@/components/button/Button";
import RadioButton from "@/components/form/RadioButton";
import SearchableSelect from "@/components/form/SearchableSelect";
import { useOptions } from "@/hooks/useOptions";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { AVAILABILITY_TYPES, EQUIPMENT_TYPES } from "@/utils/static-const";
import { Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Validation schema with custom rule
const validationSchema = Yup.object({
  equipmentType: Yup.string(),
  trailerType: Yup.string(),
  available: Yup.string(),
  status: Yup.string(),
}).test(
  "at-least-one-field",
  "Please provide at least one filter value",
  (values) =>
    values.equipmentType || values.trailerType || values.available || values.status
);

const initialValues = {
  equipmentType: "",
  trailerType: "",
  available: "",
  status: "",
};

const TruckListFilterForm = () => {
  

  const availabilityOptions = useOptions(AVAILABILITY_TYPES);

  const { data: trailerType } = apiClient.useAxiosSWR(apiEndpoint.trailers.default);

  const trailerOptions = trailerType?.data?.map((trailer) => ({
    label: trailer.title,
    value: trailer.type,
  }));

  const handleSubmit = (values, { resetForm }) => {
    // Check if no values are provided
    if (
      !values.equipmentType &&
      !values.trailerType &&
      !values.available &&
      !values.status
    ) {
      toast.error("No data provided. Please enter at least one filter value.");
    } else {
      console.log("Form Values:", values);
      toast.success("Form Submitted");
      resetForm();
    }
  };

  return (
    <div className="mt-10">
      <div className="text-[#1c252e] text-xl font-medium leading-7 mb-4">
        Filter
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors }) => (
          <Form>
            {/* Display error message if validation fails */}
            {errors["at-least-one-field"] && (
              <div className="text-red-500 mb-4">{errors["at-least-one-field"]}</div>
            )}

            <div className="mb-4">
              <div className="text-[#454f5b] text-sm font-medium leading-tight mb-4">
                Equipment Type
              </div>
              <div className="flex gap-4">
                {EQUIPMENT_TYPES.map((type) => (
                  <RadioButton
                    key={type.value}
                    name="equipmentType"
                    label={type.label}
                    value={type.value}
                    isSelected={values.equipmentType === type.value}
                  />
                ))}
              </div>

              <div className="my-5">
                <SearchableSelect
                  label="Trailer Type"
                  name="trailerType"
                  options={trailerOptions}
                  placeholder="Select"
                />
              </div>

              <div className="my-5">
                <SearchableSelect
                  label="Available"
                  name="available"
                  options={availabilityOptions}
                  placeholder="Select"
                />
              </div>

              <div className="my-5">
                <SearchableSelect
                  label="Status"
                  name="status"
                  options={availabilityOptions}
                  placeholder="Select"
                />
              </div>

              <div className="flex justify-center gap-2 mt-20">
                <Button variant="base" size="medium" type="submit">
                  Apply
                </Button>
                <Button variant="stroke" size="medium" type="reset">
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TruckListFilterForm;
