"use client";
import Button from "@/components/button/Button";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import "./style.css";

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  console.log(childrenArray);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  function handleStepClick(index) {
    console.log("diidid", index);
    setStep(index);
  }

  return (
    <>
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setStep((s) => s + 1);
          }
        }}
        enableReinitialize={true}
      >
        {({ resetForm, isValid, dirty, isSubmitting }) => (
          <Form autoComplete="off">
            <div className="stepper horizontal mb-6">
              {childrenArray.map((child, index) => (
                <>
                  <div
                    key={child.props.label}
                    className={`step ${
                      (step > index || completed) && "active"
                    }`}
                  >
                    <button
                      className="step-icon-btn"
                      disabled={!(isValid && dirty) || isSubmitting}
                      onClick={() => handleStepClick(index)}
                    >
                      {index + 1}
                    </button>
                    <div className="step-label">{child.props.label}</div>
                  </div>
                  {childrenArray?.length - 1 > index && (
                    <div className="step-line"></div>
                  )}
                </>
              ))}
            </div>
            {currentChild}
            <div className="flex justify-between mt-4 gap-4 mb-14">
              <Button
                type="button"
                size="large"
                variant="reactangleStroke"
                onClick={() => setStep((s) => s - 1)}
                disabled={!(isValid && dirty) || isSubmitting || step > 0}
                className="font-bold py-2 px-4 float-end w-full bg-green-100 border-green-500 border hover:bg-green-300 text-green-800 rounded-lg"
              >
                Back
              </Button>
              <Button
                type="submit"
                size="large"
                variant="rectangleFill"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 float-end w-full rounded-lg"
              >
                {isSubmitting
                  ? "Submitting"
                  : isLastStep()
                  ? "Submit"
                  : "Continue"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export function FormikArray({ name, children }) {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => <div>{children(arrayHelpers)}</div>}
    />
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}
