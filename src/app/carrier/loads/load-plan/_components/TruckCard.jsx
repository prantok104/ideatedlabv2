"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/button/Button";

const TruckCard = () => {
  const optionTruck = [{ label: "David Willams", value: "David Willams" }];

  const initialValues = {
    truck: "",
    truckName: "",
    truckType: "",
    mpg: "",
  };

  const validationSchema = Yup.object({
    truck: Yup.string().required("Required"),
    truckName: Yup.string().required("Required"),
    truckType: Yup.string().required("Required"),
    mpg: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="flex item-center gap-5">
          {/* Truck Details */}
          <div
            className="relative p-6 rounded-lg shadow-md w-2/3 h-[300px] md:h-[400px] bg-cover bg-center "
            style={{
              backgroundImage: `url("/asset/LoadPlanTruck.svg")`, // Set SVG background
            }}
          >
            <div className="w-1/3">
              <SearchableSelect
                name="truck"
                label="Truck"
                options={optionTruck}
              />
            </div>

            <div className="w-1/3">
              <TextInput
                label="Truck Name"
                name="truckName"
                placeholder="David Willams"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1/4">
                <TextInput
                  label="Truck Type"
                  name="truckType"
                  placeholder="Van"
                />
              </div>
              <div className="w-1/4">
                <TextInput
                  label="Miles per gallon (MPG)"
                  name="mpg"
                  placeholder="4.0"
                />
              </div>
            </div>

            <div className="flex space-x-4 w-1/3 mt-7">
              <Button
                type="submit"
                // className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                variant="rectangleFill"
                size="large"
              >
                Add Truck
              </Button>
              <Button
                // className="px-4 py-2 bg-green-200 text-green-700 rounded-lg hover:bg-green-300"
                variant="reactangleStroke"
                size="large"
              >
                Edit Truck
              </Button>
            </div>
          </div>

          {/* State Service */}
          <div
            className="relative p-6 rounded-lg shadow-md h-[300px] md:h-[400px] bg-cover bg-center w-1/3"
            style={{
              backgroundImage: `url("/asset/LoadPlanMap.svg")`, // Set SVG background
            }}
          >
            <h3 className="text-lg font-semibold">State Service</h3>
            <div className="inline-block relative">
              <div className="absolute top-52 left-2 inline-flex flex-col gap-3">
                <button className="px-2 py-1 text-3xl text-gray-200 rounded-lg bg-gray-400">
                  +
                </button>
                <button className="px-2 py-1 text-3xl text-gray-200 rounded-lg bg-gray-400">
                  -
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TruckCard;
