import Button from "@/components/button/Button";
import TextInput from "@/components/form/TextInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PlaceBid = ({ onClose }) => {
  const initialValues = {
    rate: "",
  };

  const validationSchema = Yup.object().shape({
    rate: Yup.number()
      .typeError("Rate must be a number")
      .required("Required: Flat rate in riyal"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    onClose(); // Close the modal after submission
  };

  return (
    <div>
      <h2 className="text-[#1c252e] text-base font-medium font-['Public Sans'] leading-normal">
        Place a Bid
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <div>
              <TextInput
                // label=""
                name="rate"
                placeholder="Rate/Flat*"
                type="text"
              />
            </div>

            <div className="mt-4">
              <Button
                variant="rectangleFill"
                size="small"
                type="submit"
                disabled={isSubmitting}
              >
                Place Bid
              </Button>
            </div>
            <div className="text-[#454f5b] mt-4 text-xs font-medium font-['Public Sans'] leading-tight">
              Attempts remaining: <span className="font-bold">5/5</span>
            </div>

            <p className="mt-1">
              <span className="text-[#919eab] text-xs font-normal font-['Public Sans'] leading-tight mr-1">
                If your bid is accepted, you will receive a confirmation from
                the broker at
              </span>
              {/* <span className="text-[#141a21] text-xs font-normal mr-1 font-['Public Sans'] leading-tight">
                at
              </span> */}
              <span className="text-[#454f5b] text-xs font-normal font-['Public Sans'] leading-tight">
                devid@email.com
              </span>
            </p>

            {/* <div className="text-sm text-gray-500">
              If your bid is accepted, you will receive a confirmation from the
              broker at <span className="font-bold">devid@email.com</span>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlaceBid;
