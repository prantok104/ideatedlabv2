"use client";

import Button from "@/components/button/Button";
import DatePicker from "@/components/form/DatePicker";
import TextInput from "@/components/form/TextInput";
import SearchableSelect from "@/components/form/SearchableSelect";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import { useApp } from "@/contexts/AppContext";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import LoadList from "../carrier/loads/search-load/_components/LoadList";
import RecentHistory from "../carrier/loads/search-load/_components/RecentHistory";
import SavedSearch from "../carrier/loads/search-load/_components/SavedSearch";
import FilterComponent from "../carrier/loads/search-load/_components/FilterComponent";
import { updateQueryParams } from "@/utils/helper";
import DateRangePicker from "@/components/form/DataRangePicker";

const truckOptions = [
  { label: "Flatbed (F)", value: "Flatbed" },
  { label: "Power Only (PO)", value: "Power Only" },
  { label: "Reefer (R)", value: "Reefer" },
  { label: "Step deck (SD)", value: "Step deck" },
  { label: "Van (V)", value: "Van" },
  { label: "Animal Carrier (AC)", value: "Animal Carrier" },
  { label: "Auto (Auto)", value: "Auto" },
  { label: "Boat hauler (BH)", value: "Boat hauler" },
  { label: "Cargo Van (CV)", value: "Cargo Van" },
  { label: "Container (C)", value: "Container" },
  { label: "Double drop (DD)", value: "Double drop" },
  { label: "Dump Truck (DT)", value: "Dump Truck" },
  { label: "Heavy haulers (HH)", value: "Heavy haulers" },
  { label: "Hopper bottom (HB)", value: "Hopper bottom" },
  { label: "Landoll (LA)", value: "Landoll" },
  { label: "Low boy (LB)", value: "Low boy" },
  { label: "Maxi (MX)", value: "Maxi" },
];

// Validation schema
const validationSchema = Yup.object().shape({
  pickup: Yup.string().required("Pickup location is required"),
  radiusPickup: Yup.number()
    .typeError("Radius must be a number")
    .positive("Radius must be positive")
    .required("Radius for pickup is required"),
  destination: Yup.string().required("Destination is required"),
  radiusDestination: Yup.number()
    .typeError("Radius must be a number")
    .positive("Radius must be positive")
    .required("Radius for destination is required"),
  truckType: Yup.string().required("Please select a truck type"),
  dateRange: Yup.object().shape({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
  }),
});

export default function SearchLoads() {
  const [isRecentOpen, setRecentOpen] = useState(false);
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const initialValues = {
    pickup: "",
    radiusPickup: "",
    destination: "",
    radiusDestination: "",
    truckType: "",
    dateRange: { startDate: "", endDate: "" },
  };

  const { appConfig, updateAppConfig } = useApp();

  // Function to handle swapping values
  const handleSwap = (values, setFieldValue) => {
    setFieldValue("pickup", values.destination);
    setFieldValue("radiusPickup", values.radiusDestination);
    setFieldValue("destination", values.pickup);
    setFieldValue("radiusDestination", values.radiusPickup);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-[#454F5B] font-semibold text-xl">Search</p>
        <div className="flex items-center gap-5">
          <Button
            variant="reactangleStroke"
            size="xsmall"
            onClick={() => setRecentOpen((prev) => !prev)}
          >
            Recent Search
          </Button>
          <RightDrawer
            isOpen={isRecentOpen}
            onClose={() => setRecentOpen(false)}
            style="w-1/3"
          >
            <RecentHistory />
          </RightDrawer>

          <Button
            variant="reactangleStroke"
            size="xsmall"
            onClick={() => setSaveOpen((prev) => !prev)}
          >
            Save Search
          </Button>
          <RightDrawer
            isOpen={isSaveOpen}
            onClose={() => setSaveOpen(false)}
            style="w-1/3"
          >
            <SavedSearch />
          </RightDrawer>
        </div>
      </div>
      <hr className="w-full mt-3 mb-6" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          updateQueryParams(appConfig, updateAppConfig, values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex items-center space-x-6">
              {/* Pickup and Radius */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-2">
                  <TextInput label="Pickup" name="pickup" />
                </div>
                <div className="col-span-1">
                  <TextInput label="Radius" name="radiusPickup" />
                </div>
              </div>

              {/* Arrow Icon */}
              <div
                className="mt-4"
                onClick={() => handleSwap(values, setFieldValue)}
              >
                <FaArrowRightArrowLeft
                  size={24}
                  className="text-gray-500 cursor-pointer"
                />
              </div>

              {/* Destination, Radius, Truck Type, Date Range */}
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="col-span-2">
                  <TextInput label="Destination" name="destination" />
                </div>
                <div className="col-span-1">
                  <TextInput label="Radius" name="radiusDestination" />
                </div>
                <div className="col-span-2">
                  <SearchableSelect
                    label="Truck/Trailer Type"
                    name="truckType"
                    options={truckOptions}
                    placeholder="Select Truck Type"
                  />
                </div>
                <div className="col-span-2 mt-6">
                  <DateRangePicker label="Date Range" name="dateRange" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <Button type="submit" variant="primary" size="medium">
                  Search
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex justify-end mt-9 mb-7">
        <div>
          <Button
            variant="reactangleStroke"
            size="medium"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            Filter
          </Button>
          <RightDrawer
            isOpen={isFilterOpen}
            onClose={() => setFilterOpen(false)}
            style="w-1/3"
          >
            <FilterComponent />
          </RightDrawer>
        </div>
      </div>
      <LoadList />
    </div>
  );
}
