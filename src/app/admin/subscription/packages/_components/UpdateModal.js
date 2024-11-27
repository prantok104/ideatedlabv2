// UpdateModal.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateModal = ({
  visible,
  formData,
  onSubmit,
  onCancel,
  moduleOptions,
  durationTypeOptions,
}) => {
  if (!visible) return null;

  const validationSchema = Yup.object({
    type: Yup.string().required("Required"),
    fee: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    durationType: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    docStatus: Yup.string().required("Required"),
  });

  console.log(moduleOptions);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 w-96 rounded shadow-lg">
        <h2 className="text-xl mb-4">Update Subscription</h2>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  as="select"
                  name="module"
                  className="p-2 border border-gray-300 rounded focus:outline-none w-full"
                >
                  {/* <option value="">Select Module</option> */}
                  {moduleOptions.slice(1).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="module"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="fee"
                  placeholder="Fee"
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="fee"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="currency"
                  placeholder="Currency"
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  as="select"
                  name="durationType"
                  className="p-2 border border-gray-300 rounded focus:outline-none w-full"
                >
                  {/* <option value="">Select Duration Type</option> */}
                  {durationTypeOptions?.slice(1).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="durationType"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="docStatus"
                  placeholder="Document Status"
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="docStatus"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#73C002] text-white p-2 rounded w-full"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-4 bg-red-500 text-white p-2 rounded w-full"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateModal;
