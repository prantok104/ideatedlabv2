import React from "react";
import Checkbox from "@/components/form/Checkbox"; // Assuming the given Checkbox component is imported
import { Formik, Form } from "formik"; // Import Formik and Form components

const FilterComponent = () => {
  const initialValues = {
    onboardedCompanies: false,
    favoriteCompanies: false,
    creditRating: false,
    daysToPay: false,
    shipper: false,
    trailerSpecifications: false,
    commodity: false,
    postedRate: false,
    teamDrivers: false,
    tl: false,
    ltl: false,
    withWeight: false,
    withLength: false,
  };

  const handleSubmit = (values) => {
    console.log("Filter applied:", values); // You can send this to an API or handle the filter logic
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="pl-14">
          <h2 className="mt-14 mb-4 font-semibold text-3xl text-gray-800">
            Filter
          </h2>

          {/* Company Preferences Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Company Preferences
            </h3>
            <Checkbox label="Onboarded Companies" name="onboardedCompanies" />
            <Checkbox label="Favorite Companies" name="favoriteCompanies" />
            <Checkbox
              label="Credit Rating (Trans credit)"
              name="creditRating"
            />
            <Checkbox label="Days-to-pay (Trans credit)" name="daysToPay" />
            <Checkbox label="Shipper" name="shipper" />
          </div>

          {/* Load Info Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Load info
            </h3>
            <Checkbox
              label="Trailer Specifications"
              name="trailerSpecifications"
            />
            <Checkbox label="Commodity" name="commodity" />
            <Checkbox label="Posted rate" name="postedRate" />
            <Checkbox label="Team drivers" name="teamDrivers" />
          </div>

          {/* Load Size Section */}
          <div className="mb-11">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Load size
            </h3>
            <Checkbox label="TL" name="tl" />
            <Checkbox label="LTL" name="ltl" />
            <Checkbox label="With weight" name="withWeight" />
            <Checkbox label="With length" name="withLength" />
          </div>

          {/* Apply Filter Button */}
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-6 py-2 font-semibold"
          >
            Apply Filter
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterComponent;
