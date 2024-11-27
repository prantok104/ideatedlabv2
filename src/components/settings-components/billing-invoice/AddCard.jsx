"use client";

import Button from "@/components/button/Button";
import TextInput from "@/components/form/TextInput";
import { Form, Formik } from "formik";
import { BiCalendar, BiCreditCard } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
};

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d+$/, "Invalid card number"),

  cardHolder: Yup.string().required("Card holder is required"),

  expiryDate: Yup.string().required("Expiry date is required"),

  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d+$/, "Invalid CVV")
    .min(3, "CVV must be 3 digits")
    .max(3, "CVV must be 3 digits"),

  defaultCard: Yup.boolean(),
  saveCard: Yup.boolean(),
  cardType: Yup.string(),
});

const AddCard = () => {
  const handleSubmit = (values) => {
    console.log(values);
    toast.success("Card Added");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <h5 className="text-xl text-slate-500 font-semibold leading-7 py-3">
              Account Information
            </h5>

           

            {/* card number */}
            <TextInput
              rightIcon={<BiCreditCard />}
              label="Card Number"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Expire Date"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                rightIcon={<BiCalendar />}
              />

              <TextInput
                label="CVV"
                name="cvv"
                type="text"
                placeholder="123"
                rightIcon={<BiCreditCard />}
              />
            </div>

            <TextInput
              label="Card Holder"
              name="cardHolder"
              type="text"
              placeholder="John Doe"
            />

            <div className="flex flex-col md:flex-row gap-4 mt-10 mx-0 md:mx-20">
              <Button type="reset" variant="removeBtn" size="large">
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
                variant="base"
                size="large"
              >
                Save Card
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddCard;
