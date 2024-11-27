"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/button/Button";

// Sample options for SearchableSelect
const reasonsOption = [
  { value: "budget_constraint", label: "Budget constraints have arisen" },
  {
    value: "scope_change",
    label: "The project scope has changed significantly",
  },
  {
    value: "competitive_factors",
    label: "Stronger competition has influenced my decision",
  },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  packageType: Yup.string().required("Reason is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});

const RejectBid = ({ onClose }) => {
  const initialValues = {
    packageType: "",
    description: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Data:", values);

    onClose();
    resetForm({ values: "" });
  };

  return (
    <div>
      <h2 className="mt-12 mb-4 text-[#1c252e] text-xl font-medium font-['Inter'] leading-7">
        Reject Bid
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <SearchableSelect
                label="What is the reason for reject? *"
                name="packageType"
                options={reasonsOption}
                placeholder="Select a reason"
              />
              {errors.packageType && touched.packageType ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.packageType}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <TextArea
                label="Description"
                name="description"
                placeholder="Enter rejection description"
                rows={5}
              />
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#73C002] hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button> */}

            <div className="flex justify-center items-center space-x-4 mt-16">
              <div className="w-32">
                <Button type="submit" variant="rectangleFill" size="large">
                  ok
                </Button>
              </div>

              <div className="w-32">
                <Button
                  type="button"
                  variant="reactangleStroke"
                  size="large"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RejectBid;
