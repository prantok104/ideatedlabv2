"use client";
import Button from "@/components/button/Button";
import CustomDateRangePicker from "@/components/form/CustomDateRangePicker";
import RadioButtonGroup from "@/components/form/RadioButtonGroup";
import ReactSelectField from "@/components/form/ReactSelectField";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import RightSideDrawer from "@/components/rightDrawer/RightSideDrawer";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowRightArrowLeft } from "react-icons/fa6";
import * as Yup from "yup";
import SingleHistory from "./SingleHistory";
import dayjs from "dayjs";
import moment from "moment";
import {
  HTTP_OK,
  RECENT_SEARCH_LOAD,
  SAVE_SEARCH_LOAD,
} from "@/utils/static-const";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  updateLocalStorageArray,
  getLocalStorageWithExpiry,
  generateUUID,
} from "@/utils/helper";
const SearchFilter = ({ setSearchData }) => {
  const [showLoadDetailsDropdown, setShowLoadDetailsDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showBidDropdown, setShowBidDropdown] = useState(false);
  const [recentSearch, setRecentSearch] = useState(false);
  const [saveSearch, setSaveSearch] = useState(false);
  const innerRef = useRef(null);
  const [recentSearchMutate, setRecentSearchMutate] = useState(false);
  const [recentSearchItems, setRecentSearchItems] = useState([]);
  const [saveSearchItems, setSaveSearchItems] = useState([]);

  // ! Handle Swipe
  const handleSwipe = () => {
    const tempPickup = innerRef.current.values.pickup;
    const tempPickupRadius = innerRef.current.values.pickup_radius;

    // Swap the values
    innerRef.current.setFieldValue("pickup", innerRef.current.values.dropoff);
    innerRef.current.setFieldValue(
      "pickup_radius",
      innerRef.current.values.dropoff_radius
    );
    innerRef.current.setFieldValue("dropoff", tempPickup);
    innerRef.current.setFieldValue("dropoff_radius", tempPickupRadius);
  };

  // ! Fetch cities data
  const {
    data: cities,
    isLoading: cityLoader,
    error,
  } = apiClient.useAxiosSWR(apiEndpoint.address.city, {
    params: { withCountry: true },
  });

  // ! Load details options
  const LOAD_DETAILS_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Full", value: "full" },
    { label: "Partial", value: "partial" },
  ];

  // ! Company options
  const COMPANY_OPTIONS = [
    { label: "Show all Non-Blocked Companies", value: "all" },
    { label: "Show Only Preferred Companies", value: "preferred" },
    { label: "Show Only Blocked Companies", value: "blocked" },
  ];
  // ! Bid options
  const BID_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Only Bid", value: "bid" },
    { label: "Only Book", value: "book" },
  ];

  // ! Handle Recent Search
  const handleRecentSearch = () => {
    const data = getLocalStorageWithExpiry(RECENT_SEARCH_LOAD);
    setRecentSearchItems(data || []);
    setRecentSearch(true);
  };

  // ! Handle Save Search
  const handleSaveSearch = () => {
    const data = getLocalStorageWithExpiry(SAVE_SEARCH_LOAD);
    setSaveSearchItems(data || []);
    setSaveSearch(true);
  };

  // ! Initial values
  const [initialValues, setInitialValues] = useState({
    pickup: "",
    pickup_radius: "",
    dropoff: "",
    dropoff_radius: "",
    date_range: [null, null],
    carrierType: "all",
  });
  const validationSchema = Yup.object().shape({
    pickup: Yup.object().required(" "),
    pickup_radius: Yup.number()
      .required(" ")
      .min(0, "Min:0")
      .max(100, "Max:100"),
    date_range: Yup.array()
      .nullable()
      .test("date-range-required", "Date range is required", (value) => {
        return value && value.length === 2 && value[0] && value[1];
      })
      .of(Yup.date().nullable().required(" ")),
  });

  // ! Handle submit
  const handleSubmit = async (values) => {
    const payload = {
      pickUpLocation: {
        coordinates: values?.pickup?.coordinates ?? [],
      },
      pickUpRadius: values?.pickup_radius,
      carrierType: values?.carrierType == "all" ? null : values?.carrierType,
      startDate: moment(values?.date_range[0])
        .utc()
        .startOf("day")
        .toISOString(),
      endDate: moment(values?.date_range[1]).utc().startOf("day").toISOString(),
    };

    // ! Recent search load store in locastorage
    const recentSearch = {
      id: generateUUID(),
      pickUpLocation: values?.pickup,
      pickupRadius: values?.pickup_radius,
      carrierType: values?.carrierType == "all" ? null : values?.carrierType,
      startDate: moment(values?.date_range[0])
        .utc()
        .startOf("day")
        .toISOString(),
      endDate: moment(values?.date_range[1]).utc().startOf("day").toISOString(),
      timer: new Date().toISOString(),
      isSave: false,
    };

    if (recentSearch) {
      updateLocalStorageArray(RECENT_SEARCH_LOAD, recentSearch);
      setRecentSearchMutate((prev) => !prev);
    }

    await loadSearch(payload);
  };

  // ! Load Search
  const loadSearch = async (payload) => {
    // ! Api call
    try {
      const responseData = await apiClient.post(
        apiEndpoint.loadSearch.default,
        payload
      );
      if (responseData?.status === HTTP_OK) {
        setSearchData(responseData?.data);
        setRecentSearch(false);
        setSaveSearch(false);
      } else {
        notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
      }
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  // ! Get recent search load data
  useEffect(() => {
    const data = getLocalStorageWithExpiry(RECENT_SEARCH_LOAD);
    setRecentSearchItems(data || []);
  }, [recentSearchMutate]);

  // ! Handle recent search
  const handleRecentSearchToLoadList = async (values) => {
    const payload = {
      pickUpLocation: {
        coordinates: values?.pickUpLocation?.coordinates ?? [],
      },
      pickUpRadius: values?.pickupRadius,
      carrierType: values?.carrierType == "all" ? null : values?.carrierType,
      startDate: values?.startDate,
      endDate: values?.endDate,
    };
    try {
      await loadSearch(payload);
      console.log("Search loaded successfully");
    } catch (error) {
      console.error("Error in loadSearch:", error);
    }
  };

  // ! Handle remove item from local storage
  const removeLoadFromStorage = (id) => {
    // Get the data from localStorage
    const storedData = JSON.parse(localStorage.getItem(SAVE_SEARCH_LOAD));

    if (!storedData || !Array.isArray(storedData.value)) {
      console.error("Invalid localStorage data");
      return;
    }

    const filteredValue = storedData.value.filter((item) => item.id !== id);

    const updatedData = {
      value: filteredValue,
      expiry: storedData.expiry,
    };

    setSaveSearchItems(filteredValue);

    localStorage.setItem(SAVE_SEARCH_LOAD, JSON.stringify(updatedData));
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
        <div>
          <h1 className="text-xl font-bold">New Search</h1>
        </div>
        <div className="flex gap-4">
          <button
            className="text-gray-400 font-semibold px-2 hover:text-gray-500"
            onClick={handleRecentSearch}
          >
            Recent Search
          </button>
          <button
            className="text-gray-400 font-semibold px-2 hover:text-gray-500"
            onClick={handleSaveSearch}
          >
            Save Search
          </button>
        </div>
      </div>
      {/* Recent search drawer area start */}
      <RightSideDrawer
        isOpen={recentSearch}
        onClose={() => setRecentSearch(false)}
        style="w-1/3"
        title="Recent Search"
      >
        <div className="mt-6">
          {Array.isArray(recentSearchItems) && recentSearchItems?.length > 0
            ? recentSearchItems
                ?.slice()
                ?.reverse()
                ?.map((item, index) => (
                  <div
                    onClick={() => handleRecentSearchToLoadList(item)}
                    className="w-full"
                  >
                    <SingleHistory
                      key={`recent_${index}`}
                      type="recent"
                      item={item}
                    />
                  </div>
                ))
            : "No Load Found!"}
        </div>
      </RightSideDrawer>
      {/* Recent search drawer area end */}

      {/* Recent search drawer area start */}
      <RightSideDrawer
        isOpen={saveSearch}
        onClose={() => setSaveSearch(false)}
        style="w-1/3"
        title="Save Search"
      >
        <div className="mt-6">
          {Array.isArray(saveSearchItems) && saveSearchItems?.length > 0
            ? saveSearchItems
                ?.slice()
                ?.reverse()
                ?.map((item, index) => (
                  <div
                    onClick={() => handleRecentSearchToLoadList(item)}
                    className="w-full"
                  >
                    <SingleHistory
                      key={`save_${index}`}
                      type="save"
                      item={item}
                      removeLoadFromStorage={removeLoadFromStorage}
                    />
                  </div>
                ))
            : "No load found!"}
        </div>
      </RightSideDrawer>
      {/* Recent search drawer area end */}

      {/* Filter form area start */}
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors }) => (
          <Form>
            <div className="grid gap-4 grid-cols-12 items-start mt-4 z-[100]">
              <div className="col-span-3">
                <ReactSelectField
                  label="PICKUP"
                  name="pickup"
                  options={(cities?.data || [])?.map((city) => ({
                    name: city?.center?.name,
                    city: city?.name,
                    country: city?.country?.name,
                    zipCode: city?.center?.zipCode ?? "",
                    type: city?.center?.type,
                    coordinates: city?.center?.coordinates,
                    label: city?.center?.name,
                    value:
                      `${city?.center?.name}_${city?.center?.coordinates[0]}_${city?.center?.coordinates[1]}`
                        .replace(/\s+/g, "")
                        .toLowerCase(),
                  }))}
                  placeholder="Origin"
                  mb={0}
                  radius="5px"
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  name="pickup_radius"
                  label="RADIUS(km)"
                  transForm="capitalise"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Value"
                />
              </div>
              <div className="col-span-3 flex items-center gap-4 ">
                <FaArrowRightArrowLeft
                  size={16}
                  className="text-gray-400 mt-5 cursor-pointer hover:text-gray-500"
                  onClick={handleSwipe}
                />
                <ReactSelectField
                  label="DROPOFF"
                  name="dropoff"
                  options={(cities?.data || [])?.map((city) => ({
                    name: city?.center?.name,
                    city: city?.name,
                    country: city?.country?.name,
                    zipCode: city?.center?.zipCode ?? "",
                    type: city?.center?.type,
                    coordinates: city?.center?.coordinates,
                    label: city?.center?.name,
                    value:
                      `${city?.center?.name}_${city?.center?.coordinates[0]}_${city?.center?.coordinates[1]}`
                        .replace(/\s+/g, "")
                        .toLowerCase(),
                  }))}
                  placeholder="Origin"
                  mb={0}
                  radius="5px"
                />
              </div>
              <div className="col-span-1">
                <TextInput
                  name="dropoff_radius"
                  label="RADIUS"
                  transForm="capitalise"
                />
              </div>
              <div className="col-span-2">
                <SearchableSelect
                  name="truck_type"
                  label="Truck/Trailer Type"
                  options={[
                    { label: "One", value: "one" },
                    { label: "One", value: "one" },
                    { label: "One", value: "one" },
                    { label: "One", value: "one" },
                  ]}
                  placeholder="Origin"
                />
              </div>
              <div className="col-span-2">
                <CustomDateRangePicker name="date_range" label="DATE RANGE" />
              </div>
              <div className="col-span-1">
                <div class="relative inline-block text-left">
                  <button
                    type="button"
                    className={`inline-flex gap-1 bg-white px-1 py-3 text-sm font-medium ${
                      showLoadDetailsDropdown
                        ? "text-[#73c002]"
                        : "text-gray-500"
                    }`}
                    id="dropdown-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() =>
                      setShowLoadDetailsDropdown(!showLoadDetailsDropdown)
                    }
                  >
                    Load Details
                    {showLoadDetailsDropdown ? (
                      <FaAngleUp
                        style={{
                          color: showLoadDetailsDropdown
                            ? "#73c002"
                            : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    ) : (
                      <FaAngleDown
                        style={{
                          color: showLoadDetailsDropdown
                            ? "#73c002"
                            : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </button>

                  {showLoadDetailsDropdown && (
                    <div
                      className="absolute left-0 z-10 mt-2 min-w-96 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="p-3">
                        <h2 className="font-bold text-lg">Load Details</h2>
                        <div className="mt-4">
                          <RadioButtonGroup
                            name="carrierType"
                            options={LOAD_DETAILS_OPTIONS}
                            value={values?.carrierType}
                          />

                          <div className="mt-4">
                            <TextInput
                              name="length"
                              label="Length"
                              transForm="capitalize"
                            />
                          </div>
                          <div className="mt-4">
                            <TextInput
                              name="weight"
                              label="Weight"
                              transForm="capitalize"
                            />
                          </div>
                          <div className="flex  gap-2 mt-4">
                            <div className="w-[90px]">
                              <Button size="large" variant="base">
                                Done
                              </Button>
                            </div>
                            <button className="text-[#73c002] font-bold">
                              Clear All
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div class="relative inline-block text-left">
                  <button
                    type="button"
                    className={`inline-flex gap-1 bg-white px-1 py-3 text-sm font-medium ${
                      showCompanyDropdown ? "text-[#73c002]" : "text-gray-500"
                    }`}
                    id="dropdown-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                  >
                    Company
                    {showCompanyDropdown ? (
                      <FaAngleUp
                        style={{
                          color: showCompanyDropdown ? "#73c002" : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    ) : (
                      <FaAngleDown
                        style={{
                          color: showCompanyDropdown ? "#73c002" : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </button>

                  {showCompanyDropdown && (
                    <div
                      className="absolute left-0 z-10 mt-2 min-w-96 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="p-3">
                        <h2 className="font-bold text-lg">Company</h2>
                        <h4 className="font-semibold text-md mt-1 mb-4">
                          Preferred and Blocked list
                        </h4>
                        <div className="mt-4">
                          <RadioButtonGroup
                            name="company"
                            options={COMPANY_OPTIONS}
                            direction="col"
                          />

                          <div className="flex  gap-2 mt-4">
                            <div className="w-[90px]">
                              <Button size="large" variant="base">
                                Done
                              </Button>
                            </div>
                            <button className="text-[#73c002] font-bold">
                              Clear All
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div class="relative inline-block text-left">
                  <button
                    type="button"
                    className={`inline-flex gap-1 bg-white px-1 py-3 text-sm font-medium ${
                      showBidDropdown ? "text-[#73c002]" : "text-gray-500"
                    }`}
                    id="dropdown-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setShowBidDropdown(!showBidDropdown)}
                  >
                    Bid/Book
                    {showBidDropdown ? (
                      <FaAngleUp
                        style={{
                          color: showBidDropdown ? "#73c002" : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    ) : (
                      <FaAngleDown
                        style={{
                          color: showBidDropdown ? "#73c002" : "#6b7280",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </button>

                  {showBidDropdown && (
                    <div
                      className="absolute left-0 z-10 mt-2 min-w-96 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="p-3">
                        <h2 className="font-bold text-lg">Type</h2>
                        <div className="mt-4">
                          <RadioButtonGroup
                            name="company"
                            options={BID_OPTIONS}
                            direction="col"
                          />

                          <div className="flex  gap-2 mt-4">
                            <div className="w-[90px]">
                              <Button size="large" variant="base">
                                Done
                              </Button>
                            </div>
                            <button className="text-[#73c002] font-bold">
                              Clear All
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-8"></div>
              <div className="col-span-1">
                <Button size="large" variant="base" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* Filter form area end */}
    </div>
  );
};

export default SearchFilter;
