"use client";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";
import ShipmentPostForm from "../../post-new-shipment/components/ShipmentPostForm";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { DUPLICATE_SHIPMENT } from "@/utils/permission";

const ShipmentDuplicate = () => {
  const { id } = useParams();

  // ! fetch details page
  const {
    data: details,
    isLoading: loader,
    mutate,
  } = apiClient.useAxiosSWR(`${apiEndpoint?.shipment?.default}/${id}`, {});

  const {
    postingOptions,
    shipmentStatus,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffLocations,
    dropOffDate,
    dropOffTime,
    trailer,
    commodity,
    isHazardous,
    hazardType,
    hazardDescription,
    comments,
    height,
    heightUnit,
    weight,
    weightUnit,
    length,
    lengthUnit,
    flatRate,
    allowBids,
    contactPersons,
    carrierType,
  } = details?.data ?? {};

  // ! Time formatter
  function parseApiTimeToInitialValue(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);

    return date;
  }

  const updatedValues = {
    postingOptions: postingOptions,
    specificGroup: null,
    pickUpLocation: pickUpLocation
      ? {
          name: pickUpLocation?.name,
          city: pickUpLocation?.city,
          country: pickUpLocation?.country,
          zipCode: pickUpLocation.zipCode,
          type: pickUpLocation?.type,
          coordinates: pickUpLocation?.coordinates,
          label: pickUpLocation?.name,
          value:
            `${pickUpLocation?.name}_${pickUpLocation?.coordinates[0]}_${pickUpLocation?.coordinates[1]}`
              .replace(/\s+/g, "")
              .toLowerCase(),
        }
      : null,
    pickUpDatePicker: null,
    pickupTime: 'any',
    dropoffLocations: dropOffLocations
      ? dropOffLocations.map((dropOffLocation) => ({
          dropoffLocation: {
            name: dropOffLocation.name,
            city: dropOffLocation.city,
            country: dropOffLocation.country,
            zipCode: dropOffLocation.zipCode,
            type: dropOffLocation.type,
            coordinates: dropOffLocation.coordinates,
            label: dropOffLocation.name,
            value:
              `${dropOffLocation.name}_${dropOffLocation.coordinates[0]}_${dropOffLocation.coordinates[1]}`
                .replace(/\s+/g, "")
                .toLowerCase(),
          },
        }))
      : [{ dropoffLocation: "" }],
    dropoffDate: null,
    dropoffTime: 'any',
    trailerType: trailer?.id ?? null,
    commodities: commodity?.id ?? null,
    isHazardous: isHazardous,
    hazardType: hazardType,
    hazardDescription: hazardDescription,
    height,
    heightUnit,
    weight,
    weightUnit,
    length,
    lengthUnit,
    rate: flatRate,
    allowBids,
    contactPersons: contactPersons?.map((person) => person?.id),
    radioGroup: carrierType,
    comments,
  };

  if (loader) {
    return "Loading..";
  }

  return (
    <ShipmentPostForm
      initialForUpdate={updatedValues}
      postType="Duplicate"
      id={id}
    />
  );
};


export default WithAuthorization(ShipmentDuplicate, [DUPLICATE_SHIPMENT]);
