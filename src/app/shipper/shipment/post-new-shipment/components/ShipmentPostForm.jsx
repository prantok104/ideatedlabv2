"use client";

import Button from "@/components/button/Button";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@/components/accordion/Accordion";
import TruckDetailsCheckbox from "./truck-details/TruckDetailsCheckbox";
import FlatRate from "./flat_rate/FlatRate";
import { useEffect, useRef, useState } from "react";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { HTTP_OK } from "@/utils/static-const";
import { useRouter, useSearchParams } from "next/navigation";
import { SHIPPER } from "@/utils/router";
import MapModal from "./MapModal";
import { FaMapMarker } from "react-icons/fa";
import ReactSelectField from "./ReactSelectField";
import { POSTING_OPTIONS } from "./Utilities";
import dayjs from "dayjs";
import ReactDatePickerField from "./ReactDatePickerField";
import OnlyTimePicker from "./OnlyTimePicker";
import TextInput from "@/components/form/TextInput";
import ReactMultiSelectField from "./ReactMultiSelectField";
import { FaTrash } from "react-icons/fa6";
import Checkbox from "@/components/form/Checkbox";

// Yup Validation Schema
const validationSchema = Yup.object({
  postingOptions: Yup.string().required("Post option is required"),
  specificGroup: Yup.object()
    .nullable()
    .when("postOption", {
      is: (option) => option?.id === 3,
      then: Yup.object().nullable().required("Specific group is required"),
    }),
  pickUpLocation: Yup.object()
    .nullable()
    .required("Pickup location is required"),
  pickUpDatePicker: Yup.string().required("Pickup date is required"),
  pickupTime: Yup.string().required("Pickup time is required"),
  dropoffDate: Yup.string().required("Required"),
  dropoffTime: Yup.string().required("Required"),
  dropoffLocations: Yup.array().of(
    Yup.object().shape({
      dropoffLocation: Yup.object().required("Required"),
    })
  ),

  trailerType: Yup.string().required("Trailer type is required"),
  commodities: Yup.string().required("Commodities is required"),
  hazardType: Yup.string().when("isHazardous", {
    is: true,
    then: (schema) => schema.required("Hazmat type is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  hazardDescription: Yup.string().when("isHazardous", {
    is: true,
    then: (schema) => schema.required("Description is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  length: Yup.string().required("Length is required"),
  lengthUnit: Yup.string().required("Length unit is required"),
  height: Yup.string().required("Height is required"),
  heightUnit: Yup.string().required("Height unit is required"),
  weight: Yup.string().required("Weight is required"),
  weightUnit: Yup.string().required("Weight unit is required"),
  rate: Yup.number().nullable(),
  receiverBOLNumber: Yup.string().required("Receiver BOL Number is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  receiverPhone: Yup.string().required("Receiver Phone is required"),
  receiverEmail: Yup.string().required("Receiver Email is required"),
});

const ShipmentPostForm = ({
  initialForUpdate = {},
  postType = "Submit",
  id,
}) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const innerRef = useRef();
  const router = useRouter();
  const [buttonType, setButtonType] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [locationFor, setLocationFor] = useState("pickup");

  // ! Initial Values
  const [initialValues, setInitialValues] = useState({
    postingOptions: "",
    specificGroup: null,
    pickUpLocation: null,
    pickUpDatePicker: "",
    pickupTime: "any",
    dropoffLocations: [{ dropoffLocation: "" }],
    dropoffDate: "",
    dropoffTime: "any",
    trailerType: null,
    commodities: null,
    isHazardous: false,
    hazardType: "",
    hazardDescription: "",
    height: "",
    heightUnit: "",
    weight: "",
    weightUnit: "",
    length: "",
    lengthUnit: "",
    rate: null,
    allowBids: false,
    contacts: [],
    radioGroup: "full",
    comments: "",
    receiverBOLNumber: null,
    receiverName: null,
    receiverPhone: null,
    receiverEmail: null,
  });

  // ! Initial value update
  useEffect(() => {
    if (Object.keys(initialForUpdate)?.length > 0) {
      setInitialValues(initialForUpdate);
    }
  }, [initialForUpdate]);

  // ! Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    let notifyMessage = "Sucessfully created";
    const payload = {
      postingOptions: values?.postingOptions?.toLowerCase(),
      specificGroup: null,
      carrierType: values?.radioGroup ?? "full",
      pickUpLocation: {
        name:
          values?.pickUpLocation?.center?.name ?? values?.pickUpLocation?.name,
        city:
          values?.pickUpLocation?.center?.name ?? values?.pickUpLocation?.city,
        country:
          values?.pickUpLocation?.country?.name ??
          values?.pickUpLocation?.country,
        zipCode: values?.pickUpLocation?.zipCode ?? "",
        type:
          values?.pickUpLocation?.center?.type ?? values?.pickUpLocation?.type,
        coordinates:
          values?.pickUpLocation?.center?.coordinates ??
          values?.pickUpLocation?.coordinates,
      },
      pickUpDate: dayjs(values?.pickUpDatePicker).format("YYYY-MM-DD"),
      pickUpTime:
        values?.pickupTime == "any"
          ? null
          : dayjs(values?.pickupTime).format("HH:mm:ss"),
      dropOffLocations: values?.dropoffLocations.map((location) => ({
        name:
          location?.dropoffLocation?.center?.name ??
          location?.dropoffLocation?.name,
        city:
          location?.dropoffLocation?.name ?? location?.dropoffLocation?.city,
        country:
          location?.dropoffLocation?.country?.name ??
          location?.dropoffLocation?.country,
        zipCode: "",
        type: location?.dropoffLocation?.type ?? "Point",
        coordinates:
          location?.dropoffLocation?.coordinates ??
          location?.dropoffLocation?.center?.coordinates,
      })),
      dropOffDate: dayjs(values?.dropoffDate).format("YYYY-MM-DD"),
      dropOffTime:
        values?.dropoffTime == "any"
          ? null
          : dayjs(values?.dropoffTime).format("HH:mm:ss"),
      trailer: values?.trailerType,
      commodity: values?.commodities,
      isHazardous: values?.isHazardous,
      hazardType: isHazardous ? values?.hazardType : "",
      hazardDescription: isHazardous ? values?.hazardDescription : "",
      length: Number(values?.height),
      lengthUnit: values?.heightUnit,
      height: Number(values?.height),
      heightUnit: values?.heightUnit,
      weight: Number(values?.weight),
      weightUnit: values?.weightUnit,
      flatRate: Number(values?.rate),
      allowBids: values?.allowBids,
      comments: values?.comments,
      contactPersons: values?.contactPersons,
      shipmentStatus: buttonType,
      receiverBOLNumber: values?.receiverBOLNumber,
      receiverName: values?.receiverName,
      receiverPhone: values?.receiverPhone,
      receiverEmail: values?.receiverEmail,
    };

    if (buttonType == "Draft") {
      notifyMessage = "Shipment Draft.";
    }
    if (page == "Draft" && postType == "Update" && buttonType == "Draft") {
      payload.shipmentStatus = "Draft";
    }
    if (postType == "Update") {
      payload.id = id;
      notifyMessage = "Successfully updated";
    }
    if (postType == "Duplicate") {
      notifyMessage = "Successfully duplicated";
    }

    try {
      const responseData = await apiClient.post(
        apiEndpoint.shipment.default,
        payload
      );
      if (responseData?.status == HTTP_OK) {
        notify(notifyMessage, NOTIFY_MESSAGE_SUCCESS);
        router.push(`${SHIPPER.GET_SHIPMENT_DEATILS}?type=${buttonType}`);
      }
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    if (locationFor == "pickup") {
      innerRef.current.setFieldValue(`pickUpLocation`, location);
    }

    if (locationFor == "dropoff") {
      innerRef.current.setFieldValue(
        `dropoffLocations.${currentIndex}.dropoffLocation`,
        location
      );
    }

    setModalOpen(false);
  };

  // ! Fetch cities data
  const {
    data: cities,
    isLoading: cityLoader,
    error,
  } = apiClient.useAxiosSWR(apiEndpoint.address.city, {
    params: { withCountry: true },
  });

  // ! Fetch trailers data
  const { data: trailerData } = apiClient.useAxiosSWR(
    apiEndpoint.trailers.default
  );

  //  ! Commodities data
  const { data: commodityData } = apiClient.useAxiosSWR(
    apiEndpoint.commodities.default
  );

  // ! Units data
  const { data: unit } = apiClient.useAxiosSWR(
    apiEndpoint.utils.measurements,
    {}
  );
  const { length, weight } = unit?.data ?? {};

  console.log("unites", length, weight);

  // ! Contact persons
  const { data: userData } = apiClient.useAxiosSWR(apiEndpoint.user.default);

  return (
    <div className="w-full">
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          isSubmitting,
          resetForm,
          values,
          errors,
          submitForm,
          setFieldValue,
        }) => (
          <Form>
            {/* // ! Posting option area start */}
            <Accordion title="Posting Options">
              <div className="grid grid-cols-1 lg:grid-cols-4 pt-2 ">
                <ReactSelectField
                  name="postingOptions"
                  options={POSTING_OPTIONS}
                  placeholder="Select an option"
                  isObject={false}
                />
              </div>
            </Accordion>
            {/* // ! Posting option area end */}

            {/* // ! Load details area start */}
            <Accordion title="Load Details">
              <div className="grid grid-cols-10 gap-5  pt-4">
                {/* Pickup */}
                <div className="col-span-5">
                  <div className="flex-1 relative flex items-center gap-2">
                    <ReactSelectField
                      label="Pick Up"
                      name="pickUpLocation"
                      options={[
                        ...(Object.keys(selectedLocation)?.length > 0
                          ? [selectedLocation]
                          : []),
                        ...(cities?.data || []),
                      ]?.map((city) => ({
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
                      placeholder="Pickup the location"
                    />
                    <div className="w-[50px] mt-5">
                      <Button
                        type="button"
                        variant="base"
                        size="large"
                        onClick={() => {
                          setModalOpen(true);
                          setLocationFor("pickup");
                        }}
                      >
                        <FaMapMarker />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <ReactDatePickerField
                    label="Pick Date"
                    name="pickUpDatePicker"
                    placeholder="Pickup date"
                  />
                </div>
                <div className="col-span-2">
                  <OnlyTimePicker
                    label="Pick Time"
                    name="pickupTime"
                    placeholder="Pickup time"
                  />
                </div>
              </div>

              {/* // ! location stop  Location */}
              <div className="grid grid-cols-10 gap-5 ">
                <div className="col-span-5">
                  <FieldArray name="dropoffLocations">
                    {({ push, remove }) => (
                      <div>
                        {values?.dropoffLocations?.map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 mb-2"
                          >
                            {/* Select Field and Map Icon */}
                            <div className="flex-1 relative flex items-center gap-2">
                              <ReactSelectField
                                label={`${
                                  index === 0
                                    ? "Dropoff Location*"
                                    : `Location stop ${index}*`
                                }`}
                                name={`dropoffLocations.${index}.dropoffLocation`}
                                options={[
                                  ...(Object.keys(selectedLocation)?.length > 0
                                    ? [selectedLocation]
                                    : []),
                                  ...(cities?.data || []),
                                ]?.map((city) => ({
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
                                placeholder="Pick up the location"
                                className="w-full"
                              />

                              <div className="w-[50px] mt-5">
                                <Button
                                  type="button"
                                  variant="base"
                                  size="large"
                                  onClick={() => {
                                    setCurrentIndex(index);
                                    setModalOpen(true);
                                    setLocationFor("dropoff");
                                  }}
                                >
                                  <FaMapMarker />
                                </Button>
                              </div>
                            </div>

                            {/* Remove Icon */}
                            {index > 0 && (
                              <div className="w-[50px] mt-5">
                                {" "}
                                <button
                                  type="button"
                                  className="text-red-500 ml-2 flex-shrink-0"
                                  onClick={() => remove(index)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="w-[150px]">
                          <Button
                            type="button"
                            variant="base"
                            size="medium"
                            onClick={() => push({ dropoffLocation: "" })}
                          >
                            Add Stops
                          </Button>
                        </div>

                        <MapModal
                          isOpen={isModalOpen}
                          onClose={() => setModalOpen(false)}
                          onSelectLocation={handleSelectLocation}
                        />
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="col-span-3">
                  <ReactDatePickerField
                    label="Dropoff date"
                    name="dropoffDate"
                    placeholder="Dropoff date"
                  />
                </div>

                <div className="col-span-2">
                  <OnlyTimePicker
                    label="Dropoff Time"
                    name="dropoffTime"
                    placeholder="Dropoff time"
                  />
                </div>
              </div>
            </Accordion>
            {/* // ! Load details area end */}

            <Accordion title="Equipment Details/Truck Details">
              <div>
                <TruckDetailsCheckbox value={values?.radioGroup ?? "full"} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
                <div>
                  <ReactSelectField
                    label="Trailer Type"
                    name="trailerType"
                    options={trailerData?.data?.map((item) => ({
                      label: item?.title,
                      value: item?.id,
                    }))}
                    placeholder="Select an option"
                    isObject={false}
                  />
                </div>
                <div>
                  <ReactSelectField
                    label="Commodities"
                    name="commodities"
                    options={commodityData?.data?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))}
                    placeholder="Select an option"
                    isObject={false}
                  />
                </div>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4
              "
              >
                <div>
                  <Checkbox
                    label="Hazmat"
                    name="isHazardous"
                    value={values?.isHazardous}
                    checked={Boolean(values?.isHazardous)}
                  />
                </div>
                {values?.isHazardous && (
                  <>
                    <div>
                      <ReactSelectField
                        name="hazardType"
                        label="UN Hazmat Code"
                        options={commodityData?.data
                          ?.filter((_i) => _i?.isHazardous == true)
                          ?.map((item) => ({
                            label: item?.hazardCode,
                            value: item?.hazardCode,
                          }))}
                        isObject={false}
                      />
                    </div>
                    <div>
                      <TextInput
                        name="hazardDescription"
                        label="Hazmat item description"
                        transForm="normal"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Height field */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4
              "
              >
                <div className="grid  gap-5 lg:grid-cols-12">
                  <div className="col-span-6">
                    <TextInput
                      name="length"
                      label="Length"
                      placeholder="Enter length"
                      transForm="normal"
                    />
                  </div>
                  <div className="col-span-6">
                    <ReactSelectField
                      label="Unit"
                      name="lengthUnit"
                      options={length?.map((item) => ({
                        label: item?.label,
                        value: item?.value,
                      }))}
                      placeholder="Unit"
                      isObject={false}
                    />
                  </div>
                </div>

                <div className="grid  gap-5 lg:grid-cols-12">
                  <div className="col-span-6">
                    <TextInput
                      name="height"
                      label="Height"
                      placeholder="Enter height"
                      transForm="normal"
                    />
                  </div>
                  <div className="col-span-6">
                    <ReactSelectField
                      label="Unit"
                      name="heightUnit"
                      options={length?.map((item) => ({
                        label: item?.label,
                        value: item?.value,
                      }))}
                      placeholder="Unit"
                      isObject={false}
                    />
                  </div>
                </div>

                <div className="grid  gap-5 lg:grid-cols-12">
                  <div className="col-span-6">
                    <TextInput
                      name="weight"
                      label="Weight"
                      placeholder="Enter weight"
                      transForm="normal"
                    />
                  </div>
                  <div className="col-span-6">
                    <ReactSelectField
                      label="Unit"
                      name="weightUnit"
                      options={weight?.map((item) => ({
                        label: item?.label,
                        value: item?.value,
                      }))}
                      placeholder="Unit"
                      isObject={false}
                    />
                  </div>
                </div>
              </div>
            </Accordion>

            {/* // ! Rate here */}
            <Accordion title="Flat Rate">
              <FlatRate
                label="Rate *"
                name="rate"
                placeholder="1000"
                prefix="$"
                suffix="/Trip"
                checkboxLabel="Allow Bids"
                checkboxName="allowBids"
              />
            </Accordion>

            {/* // ! contacts part here */}
            <Accordion title="Contact & Additional Information">
              <div>
                <ReactMultiSelectField
                  name="contactPersons"
                  label="Contact person"
                  placeholder="Select and person"
                  options={userData?.data?.map((user) => ({
                    label: `${user?.firstName} ${user?.lastName}`,
                    value: user?.id,
                    customLabel: `${user?.firstName} ${user?.lastName}<br />Email: ${user?.email} <br />Phone: ${user?.phone}`,
                  }))}
                />
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 mb-4">
                {userData?.data?.reduce((acc, user) => {
                  if (values?.contactPersons?.includes(user?.id)) {
                    acc.push(
                      <div
                        key={user?.id}
                        className="p-2 rounded-md bg-[#73c002] text-sm border shadow text-white"
                      >
                        <p>
                          {user.firstName} {user?.lastName}
                        </p>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                      </div>
                    );
                  }
                  return acc;
                }, [])}
              </div>

              <div className="col-span-12 md:col-span-12 w-1/2">
                <label className="text-gray-600 text-sm font-medium leading-tight">
                  Additional Notes (optional)
                </label>
                <textarea
                  onChange={(e) => {
                    setFieldValue("comments", e.target.value);
                  }}
                  placeholder="Add additional notes..."
                  className="w-full mt-2 border border-gray-300 rounded-lg py-2 px-3"
                  rows={3}
                  name="comments"
                />
              </div>
            </Accordion>

            {/* receiver contact information */}
            <Accordion title="Receiver Contact Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mt-4 mb-4">
                <TextInput
                  name="receiverName"
                  label="Receiver Name"
                  placeholder="Enter receiver name"
                  transForm="normal"
                />

                <TextInput
                  name="receiverEmail"
                  label="Receiver Email"
                  placeholder="Enter receiver email"
                  transForm="normal"
                />

                <TextInput
                  name="receiverPhone"
                  label="Receiver Phone"
                  placeholder="Enter receiver phone"
                  transForm="normal"
                />

                <TextInput
                  name="receiverBOLNumber"
                  label="Receiver BOL Number (Bill of Lading)"
                  placeholder="Enter receiver BOL number"
                  transForm="normal"
                />
              </div>
            </Accordion>

            {/* // ! button group bottom */}
            <div className="flex justify-center items-center mt-8 ">
              <div className="flex gap-4 flex-col md:flex-row">
                {/* // ! Reset Button */}
                <Button
                  variant={isSubmitting ? "disabled" : "stroke"}
                  size="medium"
                  disabled={isSubmitting}
                  onClick={() => resetForm({ values: initialValues })}
                >
                  Cancel
                </Button>

                {/* // ! Draft Button */}
                {page != "Draft" && (
                  <Button
                    variant={isSubmitting ? "disabled" : "stroke"}
                    size="medium"
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => {
                      setButtonType("Draft");
                      submitForm();
                    }}
                  >
                    Draft
                  </Button>
                )}

                {/* // ! Submit Button */}
                <Button
                  type="button"
                  variant="base"
                  size="medium"
                  onClick={() => {
                    setButtonType(page == "Draft" ? "Draft" : "Published");
                    submitForm();
                  }}
                >
                  {postType}
                </Button>
                {page == "Draft" && (
                  <Button
                    type="button"
                    variant="base"
                    size="medium"
                    onClick={() => {
                      setButtonType("Published");
                      submitForm();
                    }}
                  >
                    Published
                  </Button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShipmentPostForm;
