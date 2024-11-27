"use client";

import Button from "@/components/button/Button";
import TextInput from "@/components/form/TextInput";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import DatePicker from "@/components/form/DatePicker";
import SearchableSelect from "@/components/form/SearchableSelect";
import LoadList from "./_components/LoadList";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import HistoryCard from "./_components/HistoryCard";
import fakeData from "./_components/FakeData";
import RecentHistory from "./_components/RecentHistory";
import SavedSearch from "./_components/SavedSearch";
import FilterComponent from "./_components/FilterComponent";
import { updateQueryParams } from "@/utils/helper";
import { useApp } from "@/contexts/AppContext";

const truckOptions = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Big", value: "Big" },
];

export default function Page() {
  const [isRecentOpen, setRecentOpen] = useState(false);
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const initialValues = {
    pickup: "",
    destination: "",
    radiusPickup: "",
    radiusDestination: "",
    truckType: "",
    dateRange: "",
  };

  const { appConfig, updateAppConfig } = useApp();

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
        onSubmit={(values) => {
          console.log(values);
          updateQueryParams(appConfig, updateAppConfig, values);
        }}
      >
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
            <div className="mt-4">
              <FaArrowRightArrowLeft size={24} className="text-gray-500" />
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
                  label="Truck Type"
                  name="truckType"
                  options={truckOptions}
                  placeholder="Select Truck Type"
                />
              </div>
              <div className="col-span-2 mt-6">
                <DatePicker label="Date Range" name="dateRange" />
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
