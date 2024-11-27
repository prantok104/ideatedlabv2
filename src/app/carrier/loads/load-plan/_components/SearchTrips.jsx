"use client";

import Button from "@/components/button/Button";
import DatePicker from "@/components/form/DatePicker";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const SearchTripsSchema = Yup.object().shape({
  maxLength: Yup.number().min(0, "Value must be non-negative"),
  maxWeight: Yup.number().min(0, "Value must be non-negative"),
  maxLoadsPerTrip: Yup.number().min(0, "Value must be non-negative"),
});

export default function SearchTrips() {
  const loadSizeOption = [
    { label: "Full", value: "Full" },
    { label: "Partial", value: "Partial" },
  ];

  const resultLayoutOption = [
    { label: "Leg View", value: "Leg View" },
    { label: "Map View", value: "Map View" },
  ];
  return (
    <div className="max-w-full mx-auto mt-16">
      <Formik
        initialValues={{
          currentDate: "",
          currentTime: "",
          originPoint: "",
          destinationDate: "",
          destinationTime: "",
          destination: "",
          maxLength: "",
          maxWeight: "",
          loadSize: "",
          maxLoadsPerTrip: "",
          maxPostingAge: "",
          resultLayout: "",
          radiusLimit: 50,
          loadMileageRange: 50,
        }}
        validationSchema={SearchTripsSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Where is your truck located? */}
            <div className="mb-8">
              <h2 className="text-[#1c252e] text-xl font-semibold font-['Public Sans'] leading-7 mb-4">
                Where is your truck located?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <DatePicker
                    label="Date"
                    name="currentDate"
                    placeholder="07-09-2024"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Time"
                    name="currentTime"
                    placeholder="8:00"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Origin Point"
                    name="originPoint"
                    placeholder="City, State or Zip"
                  />
                </div>
              </div>
            </div>

            {/* Where would you like to be in a few days? */}
            <div className="mb-8">
              <h2 className="text-[#1c252e] text-xl font-semibold font-['Public Sans'] leading-7 mb-4">
                Where would you like to be in a few days?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <DatePicker
                    label="Date"
                    name="destinationDate"
                    placeholder="07-09-2024"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Time"
                    name="currentTime"
                    placeholder="8:00"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Destination"
                    name="destination"
                    placeholder="Any"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Max Length"
                    name="maxWeight"
                    placeholder="800"
                    postfix="ft"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Max Weight  "
                    name="maxWeight"
                    placeholder="7845"
                    postfix="lbs"
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="Load Size"
                    name="loadSize"
                    options={loadSizeOption}
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Max Loads Per Trip"
                    name="maxLoadsPerTrip"
                    type="number"
                    placeholder="4"
                  />
                </div>
                <div className="-my-2">
                  <TextInput
                    label="Max Posting Age"
                    name="maxPostingAge"
                    placeholder="Any"
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="Result Layout"
                    name="resultLayout"
                    options={resultLayoutOption}
                  />
                </div>
                {/* Radius Limit Slider */}
                <div className="-my-2">
                  <TextInput
                    label="Radius Limit"
                    name="radiusLimit"
                    placeholder="4"
                    postfix="mi"
                  />
                </div>

                {/* Load Mileage Range Slider */}
                <div className="-my-2">
                  <TextInput
                    label="Load Mileage Range"
                    name="loadMileageRange"
                    placeholder="6"
                    postfix="mi"
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end">
              <div>
                <Button type="submit" variant="rectangleFill" size="xlarge">
                  Search Trips
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
