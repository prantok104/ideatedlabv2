"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Button from "@/components/button/Button";
import DatePicker from "@/components/form/DatePicker";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import SearhSelectPostTruck from "./SearhSelectPostTruck";

import { parseISO } from "date-fns";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useOptions } from "@/hooks/useOptions";
import { lenghtUnits, loadOptions, weightUnits } from "@/utils/static-const";

// Validation schema
const validationSchema = Yup.object().shape({
  pickUpLocation: Yup.object()
    .nullable()
    .required("Pickup location is required"),
  dropoffLocations: Yup.object()
    .nullable()
    .required("Drop off location is required"),
  pickUpDate: Yup.date().required("Pick-up date is required"),
  truck: Yup.string().required("Truck type is required"),
  driver: Yup.string().required("Driver is required"),
  load: Yup.string().required("Load type is required"),
  length: Yup.string().required("Length is required"),
  lengthUnit: Yup.string().required("Length unit is required"),
  weight: Yup.string().required("Weight is required"),
  weightUnit: Yup.string().required("Weight unit is required"),
  contactPerson: Yup.string().required("Preferred contact method is required"),
  description: Yup.string(),
});

export default function PostTruck({ id, setTruckModified }) {
  // Hook calls
  const lengths = useOptions(lenghtUnits);
  const weights = useOptions(weightUnits);
  const loads = useOptions(loadOptions);

  const { data: cities } = apiClient.useAxiosSWR(apiEndpoint.address.city, {
    params: { withCountry: true },
  });

  const { data: driverList } = apiClient.useAxiosSWR(
    apiEndpoint.driver.driverList
  );

  const { data: userData } = apiClient.useAxiosSWR(apiEndpoint.user.default);

  const { data: truckData } = apiClient.useAxiosSWR(
    apiEndpoint.truck.trucksList
  );

  const { data: truckPostUpdate } = apiClient.useAxiosSWR(
    `${apiEndpoint.truck.postTruckList}/${id}`
  );

  // Options preparation
  const citiesOptions = cities?.data.map((city) => ({
    label: city.name,
    value: city,
  }));

  const driverOptions = driverList?.data.map((driver) => ({
    label: driver?.name,
    value: driver.id,
  }));

  const contactUserPerson = userData?.data.map((user) => ({
    label: user.userName,
    value: user.id,
  }));

  const truckLists =
    truckData?.data?.map((truck) => ({
      label: truck.title,
      value: truck.id,
    })) || [];

  // Initial values
  const initialValues = {
    id: truckPostUpdate?.data?.id || "",
    pickUpLocation: truckPostUpdate?.data?.pickUpLocation || {},
    dropoffLocations: truckPostUpdate?.data?.dropOffLocation || {},
    pickUpDate: truckPostUpdate?.data?.pickUpDate
      ? parseISO(truckPostUpdate.data.pickUpDate)
      : null,
    truck: truckPostUpdate?.data?.truck?.id || "",
    driver: truckPostUpdate?.data?.driver || "",
    load: truckPostUpdate?.data?.loadSize || "",
    length: truckPostUpdate?.data?.length || "",
    lengthUnit: truckPostUpdate?.data?.lengthUnit || "",
    weight: truckPostUpdate?.data?.weight || "",
    weightUnit: truckPostUpdate?.data?.weightUnit || "",
    contactPerson: truckPostUpdate?.data?.contactPerson?.id || "",
    description: truckPostUpdate?.data?.description || "",
  };

  // Submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      id: values.id,
      pickUpLocation: {
        name: "Pickup location",
        city: values.pickUpLocation?.name || "",
        zipCode: values.pickUpLocation?.zipCode || "",
        country: values.pickUpLocation?.country?.name || "",
        type: "Point",
        coordinates: values.pickUpLocation?.center?.coordinates || [0, 0],
      },
      dropOffLocation: {
        name: "Dropoff location",
        city: values.dropoffLocations?.name || "",
        zipCode: values.dropoffLocations?.zipCode || "",
        country: values.dropoffLocations?.country?.name || "",
        type: "Point",
        coordinates: values.dropoffLocations?.center?.coordinates || [0, 0],
      },
      pickUpDate: values.pickUpDate || "",
      truck: values.truck || "",
      driver: values.driver || "",
      loadSize: values.load || "",
      length: values.length || 0,
      lengthUnit: values.lengthUnit || "",
      weight: values.weight || 0,
      weightUnit: values.weightUnit || "",
      contactPerson: values.contactPerson || "",
      description: values.description || "",
    };

    try {
      const response = await apiClient.post(
        apiEndpoint.truck.postTruck,
        payload
      );
      if (response.status === 200) {
        toast.success(response.message);
        setTruckModified(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="bg-white rounded pl-[25px] pr-[23px] pt-[50px] pb-[39px]">
            <div className="flex justify-between">
              <div className="text-[#454f5b] text-xl font-semibold leading-7 mt-10 mb-5">
                {id ? "Update Post" : "Post Truck"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-2">
              {/* Locations */}
              <div className="col-span-2">
                <SearhSelectPostTruck
                  label="Pick Up"
                  name="pickUpLocation"
                  options={citiesOptions}
                />
              </div>
              <div className="col-span-2">
                <SearhSelectPostTruck
                  label="Drop Off"
                  name="dropoffLocations"
                  options={citiesOptions}
                />
              </div>
              <div className="col-span-2">
                <DatePicker label="Pickup Date" name="pickUpDate" />
              </div>

              {/* Truck and Load Details */}
              <div className="col-span-2">
                <SearchableSelect
                  label="Truck"
                  name="truck"
                  options={truckLists}
                />
              </div>
              <div className="col-span-2">
                <SearchableSelect
                  label="Driver"
                  name="driver"
                  options={driverOptions}
                />
              </div>
              <div className="col-span-2">
                <SearchableSelect
                  label="Load Type"
                  name="load"
                  options={loads}
                />
              </div>

              {/* Length and Weight */}
              <div className="col-span-2 pt-5">
                <TextInput label="Length" name="length" />
              </div>
              <div className="col-span-1 pt-5">
                <SearchableSelect
                  label="Length Unit"
                  name="lengthUnit"
                  options={lengths}
                />
              </div>
              <div className="col-span-2 pt-5">
                <TextInput label="Weight" name="weight" />
              </div>
              <div className="col-span-1 pt-5">
                <SearchableSelect
                  label="Weight Unit"
                  name="weightUnit"
                  options={weights}
                />
              </div>

              {/* Contact and Description */}
              <div className="col-span-3 pt-5">
                <SearchableSelect
                  label="Contact Person"
                  name="contactPerson"
                  options={contactUserPerson}
                />
              </div>
              <div className="col-span-3 mt-5">
                <TextInput label="Description" name="description" />
              </div>
            </div>

            <div className="mt-24 flex justify-between gap-3">
              <Button
                type="submit"
                variant="base"
                size="medium"
                disabled={isSubmitting}
              >
                {id ? "Update Truck" : "Post Truck"}
              </Button>
              {id ? (
                <div>
                  <div className="hidden">''</div>
                </div>
              ) : (
                <Button variant="base" size="medium" type="reset">
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
