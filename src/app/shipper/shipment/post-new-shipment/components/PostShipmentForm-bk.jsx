"use client";

import Button from "@/components/button/Button";
import { FieldArray, Form, Formik, useFormikContext } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PostOptions from "./PostOptions";
import Accordion from "@/components/accordion/Accordion";
import PickUp from "./load_details/PickUp";
import TruckDetailsCheckbox from "./truck-details/TruckDetailsCheckbox";
import TrailerType from "./truck-details/TrailerType";
import Commodities from "./truck-details/Commodities";
import HazmatHandle from "./truck-details/HazmatHandle";
import Measurement from "./truck-details/Measurement";
import FlatRate from "./flat_rate/FlatRate";
import ContactInputs from "./contacts/ContactInputs";
import { useRef, useState } from "react";
import DatePicker from "@/components/form/DatePicker";
import TimePicker from "@/components/form/TimePicker";
import AutoComplete from "./AutoComplete";
import { BsPlus, BsTrashFill } from "react-icons/bs";
import ContactPickup from "./contacts/ContactPickUp";
import { notify, NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { HTTP_OK } from "@/utils/static-const";
import { useRouter } from "next/navigation";
import { SHIPPER } from "@/utils/router";
import MapModal from "./MapModal";
import { FaMapMarker } from "react-icons/fa";

// Yup Validation Schema
const validationSchema = Yup.object({
  postOption: Yup.object().required("Post option is required"),
  specificGroup: Yup.object()
    .nullable()
    .when("postOption", {
      is: (option) => option?.id === 3,
      then: Yup.object().nullable().required("Specific group is required"),
    }),
  pickUpLocation: Yup.object()
    .nullable()
    .required("Pickup location is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  pickupTime: Yup.string().required("Pickup time is required"),
  dropoffLocations: Yup.array().of(
    Yup.object().shape({
      dropoffLocation: Yup.object().required("Required"),
      dropoffDate: Yup.string().required("Required"),
      dropoffTime: Yup.string().required("Required"),
    })
  ),

  trailerType: Yup.object().nullable().required("Trailer type is required"),
  commodities: Yup.object().nullable().required("Commodities is required"),
  hazmatType: Yup.string().when("hazmat", {
    is: true,
    then: (schema) => schema.required("Hazmat type is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  hazmatValue: Yup.string().when("hazmat", {
    is: true,
    then: (schema) => schema.required("Hazmat value is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  length: Yup.string().required("Length is required"),
  lengthUnit: Yup.string().required("Length unit is required"),
  height: Yup.string().required("Height is required"),
  heightUnit: Yup.string().required("Height unit is required"),
  weight: Yup.string().required("Weight is required"),
  weightUnit: Yup.string().required("Weight unit is required"),
  rate: Yup.string().required("Flat rate is required"),
});

const PostShipmentForm = () => {
  const innerRef = useRef();
  const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

  const [initialValues, setInitialValues] = useState({
    postOption: "",
    specificGroup: null,
    pickUpLocation: null,
    pickupDate: null,
    pickupTime: null,
    dropoffLocations: [
      { dropoffLocation: "", dropoffDate: "", dropoffTime: "" },
    ],
    dropoffDate: null,
    dropoffTime: null,
    trailerType: null,
    commodities: null,
    hazmat: false,
    hazmatType: "",
    hazmatValue: "",
    height: "",
    heightUnit: "",
    weight: "",
    weightUnit: "",
    length: "",
    lengthUnit: "",
    rate: null,
    allowBids: false,
    contacts: [{ contact: {} }],
    radioGroup: "full",
    comments: "",
  });


function formatToISO(pickupDate, pickupTime) {
  const combinedDateTime = `${pickupDate}T${pickupTime}:00.000Z`;
  return combinedDateTime;
}

  const handleSubmit = async (values, { setSubmitting }) => {
    const paylaod = {
      postingOptions: values?.postOption?.title?.toLowerCase(),
      specificGroup: null,
      carrierType: values?.radioGroup ?? "full",
      pickUpLocation: {
        name: values?.pickUpLocation?.center?.name,
        city: values?.pickUpLocation?.name,
        country: values?.pickUpLocation?.country?.name,
        zipCode: "",
        type: values?.pickUpLocation?.center?.type,
        coordinates: values?.pickUpLocation?.center?.coordinates,
      },
      pickUpDate: formatToISO(values?.pickupDate, values?.pickupTime),
      dropOffLocations: values?.dropoffLocations.map((location) => ({
        name: location.dropoffLocation.center.name,
        city: location.dropoffLocation.name,
        country: location.dropoffLocation.country.name,
        zipCode: "",
        type: location.dropoffLocation.center.type,
        coordinates: location.dropoffLocation.center.coordinates,
      })),
      dropOffDate: formatToISO(
        values?.dropoffLocations[0]?.dropoffDate,
        values?.dropoffLocations[0]?.dropoffTime
      ),
      trailer: values?.trailerType?.id,
      commodity: values?.commodities?.id,
      hazmat: values?.hazmat,
      hazmatType: values?.hazmatType,
      length: Number(values?.height),
      lengthUnit: values?.heightUnit,
      height: Number(values?.height),
      heightUnit: values?.heightUnit,
      weight: Number(values?.weight),
      weightUnit: values?.weightUnit,
      flatRate: Number(values?.rate),
      allowBids: values?.allowBids,
      comments: values?.comments,
      contactPersons: values?.contacts?.map((contact) => contact.contact.id),
      shipmentStatus: "published",
    };


    try{
      const responseData = await apiClient.post(apiEndpoint.shipment.default, paylaod);
      if(responseData?.status == HTTP_OK){
        notify("Suscessfully created", NOTIFY_MESSAGE_SUCCESS);
        router.push(`${SHIPPER.GET_SHIPMENT_DEATILS}?type=published`);
      }
    } catch(error){
      notify(error?.message, NOTIFY_MESSAGE_ERROR)
    }
    
  };

  const handleDraft = async (values) => {
      const paylaod = {
        postingOptions: values?.postOption?.title?.toLowerCase(),
        specificGroup: null,
        carrierType: values?.radioGroup ?? "full",
        pickUpLocation: {
          name: values?.pickUpLocation?.center?.name,
          city: values?.pickUpLocation?.name,
          country: values?.pickUpLocation?.country?.name,
          zipCode: "",
          type: values?.pickUpLocation?.center?.type,
          coordinates: values?.pickUpLocation?.center?.coordinates,
        },
        pickUpDate: formatToISO(values?.pickupDate, values?.pickupTime),
        dropOffLocations: values?.dropoffLocations.map((location) => ({
          name: location.dropoffLocation.center.name,
          city: location.dropoffLocation.name,
          country: location.dropoffLocation.country.name,
          zipCode: "",
          type: location.dropoffLocation.center.type,
          coordinates: location.dropoffLocation.center.coordinates,
        })),
        dropOffDate: formatToISO(
          values?.dropoffLocations[0]?.dropoffDate,
          values?.dropoffLocations[0]?.dropoffTime
        ),
        trailer: values?.trailerType?.id,
        commodity: values?.commodities?.id,
        hazmat: values?.hazmat,
        hazmatType: values?.hazmatType,
        length: Number(values?.height),
        lengthUnit: values?.heightUnit,
        height: Number(values?.height),
        heightUnit: values?.heightUnit,
        weight: Number(values?.weight),
        weightUnit: values?.weightUnit,
        flatRate: Number(values?.rate),
        allowBids: values?.allowBids,
        comments: values?.comments,
        contactPersons: values?.contacts?.map((contact) => contact.contact.id),
        shipmentStatus: "draft",
      };


    try{
      const responseData = await apiClient.post(apiEndpoint.shipment.default, paylaod);
      if(responseData?.status == HTTP_OK){
        notify("Suscessfully created", NOTIFY_MESSAGE_SUCCESS);
        router.push(`${SHIPPER.GET_SHIPMENT_DEATILS}?type=draft`);
      }
    } catch(error){
      notify(error?.message, NOTIFY_MESSAGE_ERROR)
    }
  };

  const handlePlaceSelect = (place) => {
    console.log(place); // Place details available here
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    console.log("picked", location);
    
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm, values, errors, setFieldValue }) => (
          <Form>
            <Accordion title="Posting Options">
              <PostOptions name="postOption" />
            </Accordion>

            {/* {JSON.stringify(errors)} */}

            <Accordion title="Load Details">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5">
                {/* Pickup */}
                <div className="col-span-2">
                  <PickUp label="Pick Up" name="pickUpLocation" zIndex={20} />
                </div>

                <div>
                  <DatePicker label="Pickup Date" name="pickupDate" />
                </div>

                <div>
                  <TimePicker label="Pickup Time" name="pickupTime" />
                </div>

                {/* <div>
                  <AutoComplete onPlaceSelected={handlePlaceSelect} />
                </div> */}
              </div>

              {/* location stop  Location */}
              <FieldArray name="dropoffLocations">
                {({ push, remove }) => (
                  <div>
                    {values?.dropoffLocations?.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5"
                      >
                        <div className="col-span-2 relative flex items-center gap-2">
                          <PickUp
                            label="Dropoff Location*"
                            zIndex={30}
                            name={`dropoffLocations.${index}.dropoffLocation`}
                            selectedLocation={selectedLocation}
                          />
                          <button
                            type="button"
                            className="transform -translate-y-1/2 bg-green-500 text-white py-1 px-3 rounded mt-5"
                            onClick={() => {
                              setCurrentIndex(index);
                              setModalOpen(true);
                            }}
                          >
                            <FaMapMarker />
                          </button>
                        </div>

                        <div>
                          <DatePicker
                            label="Dropoff date"
                            name={`dropoffLocations.${index}.dropoffDate`}
                          />
                        </div>

                        <div>
                          <TimePicker
                            label="Dropoff Time"
                            name={`dropoffLocations.${index}.dropoffTime`}
                          />
                        </div>

                        <div className="flex items-center">
                          {index > 0 && (
                            <button
                              type="button"
                              className="text-red-500 ml-2"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() =>
                        push({
                          dropoffLocation: "",
                          dropoffDate: "",
                          dropoffTime: "",
                        })
                      }
                    >
                      Add Drop-off Location
                    </button>

                    <MapModal
                      isOpen={isModalOpen}
                      onClose={() => setModalOpen(false)}
                      onSelectLocation={handleSelectLocation}
                    />
                  </div>
                )}
              </FieldArray>
            </Accordion>

            <Accordion title="Equipment Details/Truck Details">
              <div>
                <TruckDetailsCheckbox />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <TrailerType
                    name="trailerType"
                    zIndex={40}
                    label="Trailer Type"
                  />
                </div>

                <div>
                  <Commodities
                    label="Commodities"
                    zIndex={50}
                    name="commodities"
                  />
                </div>
              </div>

              <div className="mt-4">
                <HazmatHandle
                  label="Hazmat"
                  name="hazmat"
                  selectName="hazmatType"
                  inputName="hazmatValue"
                  zIndex={50}
                />
              </div>

              {/* Height field */}
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-4
              "
              >
                <div className="col-span-6">
                  <Measurement
                    label="Length"
                    name="length"
                    unitName="lengthUnit"
                    placeholder="Enter length"
                    type="length"
                  />
                </div>
                <div className="col-span-6">
                  <Measurement
                    label="Height"
                    name="height"
                    unitName="heightUnit"
                    placeholder="Enter height"
                    type="length"
                  />
                </div>

                {/* Weight field */}
                <div className="col-span-6">
                  <Measurement
                    label="Weight"
                    name="weight"
                    unitName="weightUnit"
                    placeholder="Enter weight"
                    type="weight"
                  />
                </div>
              </div>
            </Accordion>

            {/* Rate here */}
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

            {/* contacts part here */}
            <Accordion title="Contact & Additional Information">
              <FieldArray name="contacts">
                {({ push, remove }) => (
                  <div>
                    {values?.contacts?.map((_, index) => (
                      <div key={index} className="col-span-6 flex gap-2">
                        <ContactPickup
                          label={`Contact ${index}`}
                          zIndex={30}
                          name={`contacts.${index}.contact`}
                        />

                        <div className="flex items-center">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-150 ease-in-out mt-3"
                            >
                              <BsTrashFill size={24} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="ml-2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#73C002] text-[#73C002] hover:bg-[#73C002] hover:text-white transition duration-150 ease-in-out"
                      onClick={() =>
                        push({
                          conatct: "",
                        })
                      }
                    >
                      <BsPlus size={24} />
                    </button>
                  </div>
                )}
              </FieldArray>

              <div className="col-span-12 md:col-span-12 w-1/2">
                <label className="text-gray-600 text-sm font-medium leading-tight">
                  Additional Notes (optional)
                </label>
                <textarea
                  onChange={(e) => {
                    setFieldValue("comments", e.target.value);
                  }} // Handle note changes
                  placeholder="Add additional notes..."
                  className="w-full mt-2 border border-gray-300 rounded-lg py-2 px-3"
                  rows={3}
                  name="comments"
                />
              </div>
            </Accordion>

            {/* button group bottom */}
            <div className="flex justify-center items-center mt-8 ">
              <div className="flex gap-4 flex-col md:flex-row">
                {/* Reset Button */}
                <Button
                  variant={isSubmitting ? "disabled" : "stroke"}
                  size="medium"
                  disabled={isSubmitting}
                  onClick={() => resetForm({ values: initialValues })}
                >
                  Cancel
                </Button>

                {/* Draft Button */}
                <Button
                  variant={isSubmitting ? "disabled" : "stroke"}
                  size="medium"
                  disabled={isSubmitting}
                  onClick={() => handleDraft(values)} // Handle draft save
                  type="button"
                >
                  Draft
                </Button>

                {/* Submit Button */}
                <Button type="submit" variant="base" size="medium">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostShipmentForm;
