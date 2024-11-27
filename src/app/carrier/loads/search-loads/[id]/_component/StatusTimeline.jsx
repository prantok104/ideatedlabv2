"use client";

import React, { useState, useRef, useEffect } from "react";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import dayjs from "dayjs";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ReactSelectField from "@/components/form/ReactSelectField";
import Button from "@/components/button/Button";
import { ACCEPTENCE_STATUS, HTTP_OK } from "@/utils/static-const";
import DateTimePicker from "@/components/form/DateTimePicker";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import TextInput from "@/components/form/TextInput";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
const StatusTimeline = ({
  bookingId,
  mutate,
  setIsDriverAssigned,
  directBook
}) => {
  const innerRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    truck: "",
    driver: "",
    pickup_date: "",
  });
  const validationSchema = Yup.object().shape({});
  const [statusAction, setStatusAction] = useState({
    modal: false,
    action: null,
  });

  // ! Status
  const {
    data: statusLine,
    isLoading: loader,
    mutate: statusMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.bookingActions, {
    params: { bookingId: bookingId },
  });

  // ! Trucks
  const {
    data: trucks,
    isLoading: truckLoader,
    mutate: truckMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.trucks, {});

  // ! Drivers
  const {
    data: drivers,
    isLoading: driverLoader,
    mutate: driverMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.drivers, {});

  const handleStatusUpdate = async (type) => {
    setStatusAction((prev) => ({
      ...prev,
      modal: true,
      action: type,
    }));
  };

  // ! handleSubmit
  const handleSubmit = async (values) => {
    let payload = {};
    if (statusAction?.action == ACCEPTENCE_STATUS?.TRUCK_ASSIGNED) {
      payload = {
        truckId: values?.truck,
      };
    }

    if (statusAction?.action == ACCEPTENCE_STATUS?.DRIVER_ASSIGNED) {
      payload = {
        driverId: values?.driver,
      };
    }

    if (statusAction?.action == ACCEPTENCE_STATUS?.SCHEDULE_PICKUP) {
      payload = {
        pickUpDate: values?.pickup_date,
      };
    }

    if (statusAction?.action == ACCEPTENCE_STATUS?.DELIVERED) {
      payload = {
        verificationCode: values?.verificationCode,
      };
    }

    try {
      const responseData = await apiClient.post(
        apiEndpoint?.loadSearch?.bookingAction,
        {
          bookingId,
          action: statusAction?.action,
          ...payload,
        }
      );
      if (responseData?.status == HTTP_OK) {
        await mutate();
        await statusMutate();
        setStatusAction((prev) => ({
          ...prev,
          modal: false,
          action: null,
        }));
        notify(responseData?.message, NOTIFY_MESSAGE_SUCCESS);
      } else {
        notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
      }
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  // ! Direct Booking
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        await statusMutate();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    fetchStatus();
  }, [directBook]);

  // ! Update InitialValues
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      truck: statusLine?.data?.allTrackingList?.find(
        (item) => item?.action == ACCEPTENCE_STATUS?.TRUCK_ASSIGNED
      )?.truck,
      driver: statusLine?.data?.allTrackingList?.find(
        (item) => item?.action == ACCEPTENCE_STATUS?.DRIVER_ASSIGNED
      )?.driver,
    }));

    setIsDriverAssigned(
      Boolean(
        statusLine?.data?.allTrackingList?.find(
          (item) => item?.action == ACCEPTENCE_STATUS?.DRIVER_ASSIGNED
        )?.driver
      )
    );
  }, [statusLine, statusAction]);

  return (
    <>
      {/* Status modal area start */}
      <Modal
        isOpen={statusAction?.modal}
        onClose={() =>
          setStatusAction((prev) => ({
            ...prev,
            modal: false,
            action: null,
          }))
        }
      >
        <div>
          <Formik
            innerRef={innerRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="p-3 rounded w-[450px] ">
                  <h5 className="mb-3 mt-2 text-center font-md font-bold ">
                    {statusAction?.action}
                  </h5>
                  {statusAction?.action ==
                    ACCEPTENCE_STATUS?.TRUCK_ASSIGNED && (
                    <div className="mb-2">
                      <ReactSelectField
                        name="truck"
                        options={
                          trucks?.data
                            ? trucks?.data?.map((item) => ({
                                label: `${item?.title} (${item?.carrierType}) - ${item?.truckNumber}`,
                                value: item?.id,
                              }))
                            : []
                        }
                        label="SELECT TRUCK"
                        isObject={false}
                      />
                    </div>
                  )}

                  {statusAction?.action ==
                    ACCEPTENCE_STATUS?.DRIVER_ASSIGNED && (
                    <div className="mb-2">
                      <ReactSelectField
                        name="driver"
                        options={
                          drivers?.data
                            ? drivers?.data?.map((item) => ({
                                label: `${item?.name} - ${item?.identificationNumber}`,
                                value: item?.id,
                              }))
                            : []
                        }
                        label="SELECT DRIVER"
                        isObject={false}
                      />
                    </div>
                  )}

                  {statusAction?.action ==
                    ACCEPTENCE_STATUS?.SCHEDULE_PICKUP && (
                    <div className="mb-2 w-full">
                      <DateTimePicker name="pickup_date" label="Pickup Date" />
                    </div>
                  )}

                  {statusAction?.action == ACCEPTENCE_STATUS?.DELIVERED && (
                    <>
                      <div className="mb-2 w-full">
                        <TextInput
                          name="verificationCode"
                          label="VERIFICATION CODE"
                          transForm="capitalise"
                          placeholder="123456"
                        />
                      </div>

                      <div className="my-6">
                        <h5 className="mb-4">Dropoff Locations</h5>
                        {statusLine?.data?.allTrackingList?.find(
                          (item) =>
                            item?.action === ACCEPTENCE_STATUS?.DELIVERED
                        )?.deliveryLocations ? (
                          <ul className="text-xs list-disc">
                            {statusLine.data.allTrackingList
                              .find(
                                (item) =>
                                  item?.action === ACCEPTENCE_STATUS?.DELIVERED
                              )
                              ?.deliveryLocations.map((location, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between gap-2 w-full mb-2"
                                >
                                  <p>
                                    {++index}) {location?.location?.name} (
                                    {`${location?.location?.coordinates?.join(
                                      ", "
                                    )}`}
                                    )
                                    <br />
                                    (City: {location?.location?.city})
                                  </p>
                                  {location?.isVerified ? (
                                    <FaCheckCircle />
                                  ) : (
                                    <FaTimes />
                                  )}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <p>No delivery locations available.</p>
                        )}
                      </div>
                    </>
                  )}

                  {statusAction?.action == ACCEPTENCE_STATUS?.SCHEDULE_PICKUP ||
                  statusAction?.action == ACCEPTENCE_STATUS?.DRIVER_ASSIGNED ||
                  statusAction?.action == ACCEPTENCE_STATUS?.TRUCK_ASSIGNED ||
                  statusAction?.action == ACCEPTENCE_STATUS?.DELIVERED ? (
                    <Button type="submit" size="small" variant="base">
                      {statusAction?.action == ACCEPTENCE_STATUS?.DELIVERED
                        ? "Delivered"
                        : "Status Update"}
                    </Button>
                  ) : (
                    <div className="text-center p-3">
                      <h2 className="text-2xl mb-4 font-bold">Are you sure?</h2>
                      <p className="mb-8 text-slate-500">
                        Do you want to proceed with assigning this status?
                      </p>
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          onClick={() =>
                            setStatusAction((prev) => ({
                              ...prev,
                              modal: false,
                              action: null,
                            }))
                          }
                          className="px-8 py-3 text-md font-semibold text-white bg-red-500 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                          No
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 text-md font-semibold text-white bg-green-500 rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      {/* Status modal area end */}

      {!loader && (
        <div className="px-6 py-4">
          <h1 className="text-[#141a21] text-sm font-semibold font-['Inter'] uppercase leading-tight mb-2">
            Status
          </h1>
          <div className="flex flex-col justify-between">
            {statusLine?.data?.allTrackingList?.map((item, index) => (
              <div
                key={index}
                className={`pb-3 step-item ${
                  item?.actionTaken === true && "active"
                } ${
                  index > 0 &&
                  statusLine?.data?.allTrackingList[index - 1].actionTaken ===
                    true &&
                  "next-active"
                }`}
              >
                <div
                  className={` ${
                    item?.actionTaken === true
                      ? "bg-[#73C002] z-20 w-3 h-3 rounded-full"
                      : "step"
                  }`}
                ></div>
                <div className="pl-10">
                  <div className="inline-flex gap-8">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#454f5b] text-md font-bold font-['Inter']">
                        {item?.actionTitle}
                      </p>
                      <div className="flex flex-col w-32 items-start pr-5">
                        <p className="text-[#454f5b] text-sm font-medium font-['Inter']">
                          {item?.actionStartTime
                            ? dayjs(item?.actionStartTime).format(
                                "DD MMM, YYYY"
                              )
                            : ""}
                        </p>
                        <p className="text-[#919eab] text-xs font-normal font-['Inter']">
                          {item?.actionStartTime
                            ? dayjs(item?.actionStartTime).format("hh:mm:s A")
                            : ""}
                        </p>
                      </div>
                    </div>
                    {index > 0 &&
                      (() => {
                        const matchedIndex =
                          statusLine?.data?.allTrackingList?.findIndex(
                            (item) =>
                              item?.id === statusLine?.data?.currentAction?.id
                          );

                        if (index <= matchedIndex) {
                          return (
                            <button
                              className="py-1 px-3 bg-[#73C002] text-white font-bold rounded h-8"
                              onClick={() => handleStatusUpdate(item?.action)}
                            >
                              {item?.actionTaken === true
                                ? "Change"
                                : item?.action ==
                                    ACCEPTENCE_STATUS?.TRUCK_ASSIGNED ||
                                  item?.action ==
                                    ACCEPTENCE_STATUS?.DRIVER_ASSIGNED
                                ? "Assign"
                                : "Update"}
                            </button>
                          );
                        }
                      })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StatusTimeline;
