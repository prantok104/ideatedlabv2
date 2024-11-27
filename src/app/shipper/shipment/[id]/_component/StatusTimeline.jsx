"use client";

import React , { useEffect }  from "react";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import dayjs from "dayjs";
import { ACCEPTENCE_STATUS } from "@/utils/static-const";
const StatusTimeline = ({ bookingId, mutate, setIsDriverAssigned }) => {
  // ! Status
  const {
    data: statusLine,
    isLoading: loader,
    mutate: statusMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.bookingActions, {
    params: { bookingId: bookingId },
  });

  // ! Update InitialValues
  useEffect(() => {
    setIsDriverAssigned(
      Boolean(
        statusLine?.data?.allTrackingList?.find(
          (item) => item?.action == ACCEPTENCE_STATUS?.DRIVER_ASSIGNED
        )?.driver
      )
    );
  }, [statusLine]);

  return (
    <>
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
