'use client'

import Button from "@/components/button/Button";
import RadioButton from "@/components/form/RadioButton";
import TextInput from "@/components/form/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
  userType: "",
  compnayName: "",
  numberOfEmployee: "",
  numberOfVehicle: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters long"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+?\d{1,4}|\d{1,4})?\s?\d{7,10}$/, "Phone number is not valid"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters long"),

  userType: Yup.string().required("User type is required"),

  compnayName: Yup.string().when("userType", {
    is: "company",
    then: Yup.string().required("Company name is required"),
    otherwise: Yup.string(),
  }),

  numberOfEmployee: Yup.number()
    .nullable()
    .when("userType", {
      is: "company",
      then: Yup.number()
        .required("Number of employees is required")
        .min(1, "Must have at least 1 employee"),
      otherwise: Yup.number().nullable(),
    }),

  numberOfVehicle: Yup.number()
    .nullable()
    .when("userType", {
      is: "company",
      then: Yup.number()
        .required("Number of vehicles is required")
        .min(1, "Must have at least 1 vehicle"),
      otherwise: Yup.number().nullable(),
    }),
});

const userSelectType = [
  { label: "Carrier", value: "Carrier" },
  { label: "Shipper", value: "Shipper" },
  { label: "Broker", value: "Broker" },
];

const ContactForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", JSON.stringify(values, null, 2)); // Log form values for debugging
    toast.success("Form Submitted");
    setSubmitting(false); // Reset submitting state after handling
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm, values, errors }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4">
              <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                <div className="col-span-1">
                  <TextInput
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                <div className="col-span-1">
                  <TextInput
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="+880123456789"
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <TextInput
                  label="Message"
                  type="text"
                  name="message"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="col-span-1 flex flex-col">
                {userSelectType.map((option) => (
                  <RadioButton
                    key={option.value}
                    name="userType"
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </div>

              {values.userType === "company" && (
                <>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="col-span-1">
                      <TextInput
                        label="Company Name"
                        type="text"
                        name="compnayName"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className="col-span-1">
                      <TextInput
                        label="Number of Employees"
                        type="text"
                        name="numberOfEmployee"
                        placeholder="Enter number of employees"
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <TextInput
                      label="Number of Vehicles"
                      type="text"
                      name="numberOfVehicle"
                      placeholder="Enter number of vehicles"
                    />
                  </div>
                </>
              )}

              <div className="col-span-1 mt-10">
                <Button variant="base" size="large" type='submit' disabled={isSubmitting}>
                  Send Message
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
