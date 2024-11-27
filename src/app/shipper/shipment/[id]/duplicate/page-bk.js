// components/Page.jsx
"use client";

import Accordion from "@/components/accordion/Accordion";
import Button from "@/components/button/Button";
import DatePicker from "@/components/form/DatePicker";
import DateTimePicker from "@/components/form/DateTimePicker";
import RadioButton from "@/components/form/RadioButton";
import SearchableSelect from "@/components/form/SearchableSelect"; // Import the global component
import TextError from "@/components/form/TextError";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import { BsPlus, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import * as Yup from "yup";
import porfileAvatar from "../../../../../../public/asset/avatar.png";
import TextInputShipper from "../../_components/TextInputShipper";
import { useEffect, useState } from "react";

const PostingOptions = [
  { label: "Loadboard", value: "loadboard", id: "loadboard" },
  { label: "Entire private Network", value: "private", id: "private" },
  { label: "Specific Groups", value: "groups", id: "groups" },
];

// truck details
const truckDetails = [
  { label: "Full", value: "full", id: "full" },
  { label: "Partial", value: "Partial", id: "Partial" },
];

const lengthOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
];

const weightOptions = [
  { label: "10 kg", value: "10" },
  { label: "20 kg", value: "20" },
  { label: "30 kg", value: "30" },
];

const contactDetails = [
  { label: "Contact 1", value: "contact1" },
  { label: "Contact 2", value: "contact2" },
  { label: "Contact 3", value: "contact3" },
];

const validationSchema = Yup.object({
  postingOptions: Yup.string().required(
    "Please select the posting method here"
  ),
  pickup: Yup.array().required("PickUp location is required"),
  pickupEarliest: Yup.date().required("Pickup earliest is required"),
  pickUpTime: Yup.date()
    .typeError("Invalid date and time format")
    .required("Pickup date and time are required"),
  dropOff: Yup.array()
    .of(
      Yup.object().shape({
        location: Yup.string().required("Dropoff location is required"),
        time: Yup.date()
          .typeError("Invalid date and time format")
          .required("Dropoff date and time are required"),
      })
    )
    .required("Must have at least one dropoff location"),
  truckDetails: Yup.string().required("Truck details are required"),
  trailerType: Yup.string().required("Trailer type is required"),
  lengthOptions: Yup.string().required("Length is required"),
  weightOptions: Yup.string().required("Weight is required"),
  referenceId: Yup.string().required("Reference ID is required"),
  commodity: Yup.string().required("Commodity is required"),
  comment: Yup.string(),
  contactName: Yup.string().required("Contact Name is required"),
  contactDetails: Yup.string().required("Contact Details are required"),
});

const initialValues = {
  postingOptions: "",
  pickup: "",
  pickupEarliest: "",
  pickUpTime: "",
  dropOff: [
    {
      location: "",
      time: "",
    },
  ],
  truckDetails: "",
  trailerType: "",
  lengthOptions: "",
  weightOptions: "",
  referenceId: "2145#856",
  commodity: "",
  comment: "",
  teamDriver: "",
  contactName: "",
  contactDetails: "",
};

const Duplicate = () => {
  const [cityOptions, setCityOptions] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [commoditiesOptions, setCommoditiesOptions] = useState([]);
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const res = await fetch("/geolocation.json");
        const data = await res.json();

        const cities = data
          .map((item) => {
            // Determine the label and value based on the addresstype
            let label, value;
            if (item.addresstype === "city") {
              label = item.address.city;
              value = item.address.city;
            } else if (item.addresstype === "town") {
              label = item.address.town;
              value = item.address.town;
            } else if (item.addresstype === "village") {
              label = item.address.village;
              value = item.address.village;
            }

            // Only include options where the label is defined
            return label ? { label, value } : null;
          })
          .filter((option) => option !== null); // Filter out null options

        setCityOptions(cities);
      } catch (error) {
        console.error("Failed to fetch city data:", error);
      }
    };

    fetchCityData();
  }, []);

  useEffect(() => {
    const fetchTrailerData = async () => {
      const res = await fetch("/trailerType.json");
      const commoditiesRes = await fetch("/commodities.json");
      const data = await res.json();
      const commoditiesData = await commoditiesRes.json();
      setTrailer(data);
      setCommoditiesOptions(commoditiesData);
    };

    fetchTrailerData();
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", JSON.stringify(values, null, 2)); // Log form values for debugging
    toast.success("Form Submitted");
    setSubmitting(false); // Reset submitting state after handling
  };

  const handleDraft = (values) => {
    console.log("Draft Saved:", JSON.stringify(values, null, 2)); // Log draft data for debugging
    toast.info("Draft Saved");
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Ensure this function is set for onSubmit
        enableReinitialize
      >
        {({ isSubmitting, resetForm, values, errors }) => (
          <Form>
            <Accordion title="Posting Options">
              <div className="flex gap-5">
                {PostingOptions.map((option) => (
                  <RadioButton
                    key={option.value}
                    label={option.label}
                    name="postingOptions"
                    value={option.value}
                  />
                ))}
              </div>
              <div className="mt-2">
                <ErrorMessage name="postingOptions" component={TextError} />
              </div>
            </Accordion>

            <Accordion title="Load Details">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                {/* Pickup */}
                <div className="z-30">
                  <SearchableSelect
                    label="Pickup"
                    name="pickup"
                    options={cityOptions}
                    placeholder="Select pickup options"
                    isMulti
                  />
                </div>

                <div>
                  <DatePicker label="Pickup Earliest" name="pickupEarliest" />
                </div>

                <div>
                  <DateTimePicker
                    label="Pickup Time & Date"
                    name="pickUpTime"
                  />
                </div>
              </div>

              {/* Dropoff Location */}
              <FieldArray
                name="dropOff"
                render={(arrayHelpers) => (
                  <div className=" ">
                    {values.dropOff && values.dropOff.length > 0 ? (
                      values.dropOff.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-3 lg:grid-cols-4 gap-5"
                          >
                            <div className="z-20">
                              <SearchableSelect
                                label="Dropoff Location"
                                name={`dropOff.${index}.location`}
                                options={cityOptions}
                                placeholder="Select dropoff location"
                              />
                            </div>

                            <div>
                              <DateTimePicker
                                label="Dropoff Time & Date"
                                name={`dropOff.${index}.time`}
                              />
                            </div>
                            {/* Show delete button only for index 1 and beyond */}
                            {index > 0 && (
                              <div className="self-center">
                                <div className="w-32">
                                  <Button
                                    type="button"
                                    variant="removeBtn"
                                    size="small"
                                    iconLeft={<BsTrashFill />}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    <div className="self-center mt-3 flex">
                      <div></div>
                      <div>
                        <Button
                          type="button"
                          variant="base"
                          size="small"
                          iconLeft={<BsPlus size={20} />}
                          onClick={() => {
                            arrayHelpers.push({
                              location: "",
                              date: "",
                              time: "",
                            });
                          }}
                        >
                          Add Stops
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </Accordion>

            {/* truck details */}
            <Accordion title="Truck Details">
              {/* truck details */}
              <div className="flex gap-5">
                {truckDetails.map((option) => (
                  <RadioButton
                    key={option.value}
                    label={option.label}
                    name="truckDetails"
                    value={option.value}
                  />
                ))}

                <ErrorMessage name="postingOptions" component={TextError} />
              </div>

              <div className="grid grid-cols-4 gap-5">
                <SearchableSelect
                  label="Trailer Type"
                  name="trailerType"
                  options={trailer}
                  placeholder="Type"
                />

                <SearchableSelect
                  label="Length"
                  name="lengthOptions"
                  options={lengthOptions}
                  placeholder="All"
                />

                <SearchableSelect
                  label="Weight"
                  name="weightOptions"
                  options={weightOptions}
                  placeholder="Select weight"
                />
              </div>

              {/* Error Message */}
            </Accordion>

            {/* additional information area */}
            <Accordion title="Contact & Additional Information">
              <div className="grid grid-cols-4 gap-5 ">
                <TextInputShipper
                  label="Reference ID"
                  type="text"
                  name="referenceId"
                  placeholder="Reference ID"
                  disabled
                />

                <div className="mt-3">
                  <SearchableSelect
                    label="Commodities"
                    name="commodity"
                    options={commoditiesOptions}
                    placeholder="Type"
                  />
                </div>
              </div>

              <div>
                <TextInputShipper
                  label="comment"
                  name="comment"
                  placeholder="comment"
                />
              </div>

              {/* more options */}
              <h4 className="py-6 text-lg font-semibold text-[#454F5B]">
                Contact Information
              </h4>

              <div className="flex gap-5">
                <div>
                  <Image
                    src={porfileAvatar}
                    alt="image"
                    width={54}
                    height={54}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-[#454F5B]">
                    Trion
                  </h3>
                  <p className="text-sm text-[#919EAB]">Contact</p>
                </div>
              </div>

              <div className="flex mt-6">
                <TextInputShipper
                  label="Contact Name"
                  type="text"
                  name="contactName"
                  placeholder="Name here"
                />
              </div>

              <div className="mt-3">
                {contactDetails.map((option) => (
                  <RadioButton
                    key={option.value}
                    label={option.label}
                    name="contactDetails"
                    value={option.value}
                  />
                ))}

                <ErrorMessage name="postingOptions" component={TextError} />
              </div>
            </Accordion>

            {/* button group bottom */}
            <div className="flex justify-center items-center mt-8">
              <div className="flex gap-4">
                {/* Reset Button */}
                <Button
                  variant={isSubmitting ? "disabled" : "stroke"} // Disable only if submitting
                  size="medium"
                  disabled={isSubmitting}
                  onClick={() => resetForm({ values: initialValues })}
                >
                  Cancel
                </Button>

                {/* Draft Button */}
                <Button
                  variant={isSubmitting ? "disabled" : "stroke"} // Disable only if submitting
                  size="medium"
                  disabled={isSubmitting}
                  onClick={() => handleDraft(values)} // Handle draft save
                >
                  Draft
                </Button>

                {/* Submit Button */}
                <Button
                  type={"submit"}
                  variant={isSubmitting ? "disabled" : "base"} // Disable only if submitting
                  size="medium"
                >
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

export default Duplicate;
