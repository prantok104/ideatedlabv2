"use client";

import * as Yup from "yup";
import { Form, Formik } from "formik";
import PickUp from "../post-new-shipment/components/load_details/PickUp";
import DatePicker from "../post-new-shipment/components/load_details/DatePickerLoad";
import TimePickerLoad from "../post-new-shipment/components/load_details/TimePickerLoad";
import Button from "@/components/button/Button";

const initalValue = {
  pickUp: null,
  pickupDate: null,
  pickupTime: null,
  dropoffLocation: null,
  dropoffDate: null,
  dropoffTime: null,
};

const validationSchema = Yup.object().shape({
  pickUp: Yup.string().required("Pickup location is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  pickupTime: Yup.string().required("Pickup time is required"),
  dropoffLocation: Yup.string().required("Dropoff location is required"),
  dropoffDate: Yup.string().required("Dropoff date is required"),
  dropoffTime: Yup.string().required("Dropoff time is required"),
});

const FilterForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={initalValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 mt-[16px]">
            <div className="col-span-2">
              <PickUp name="pickUp" label="Pick Up" zIndex={20} />
            </div>

            <div>
              <DatePicker label="Pickup Date" />
            </div>

            <div>
              <TimePickerLoad label="Pickup Time" />
            </div>

            <div className="col-span-2">
              <PickUp label="Dropoff Location*" name="dropoffLocation" zIndex={30} />
            </div>

            <div>
              <DatePicker label="Dropoff date" name = 'dropoffDate' />
            </div>

            <div>
              <TimePickerLoad label="Dropoff Time" name = 'dropoffTime' />
            </div>

            <div className='mt-20'>
              <Button type="submit" variant="base" size="medium">
                Save
              </Button>
            </div>

            <div className='mt-20'>
              <Button variant="stroke" size="medium">
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FilterForm;
