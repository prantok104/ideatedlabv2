import dayjs from "dayjs";
import React from "react";

export default function PostedDetails({data={}}) {
  const statusStyles = {
    Active: "text-[#73c002] bg-[#f1f9e6]",
    Inactive: "text-[#d9534f] bg-[#fce8e8]",
    Pending: "text-[#ffb822] bg-[#fff5e6]",
    Completed: "text-[#17a2b8] bg-[#e6f7f9]",
    Done: "text-[#5cb85c] bg-[#e6f9e6]",
  };
  return (
    <div
      className="bg-white p-4 py-3 rounded-lg"
      style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <h2 className="text-[#141a21] text-sm font-semibold font-['Inter'] uppercase leading-tight mb-2">
        POSTED DETAILS
      </h2>
      <div className="text-[#637381] text-sm">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
            Post To
          </p>
          <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
            {data?.post}
          </p>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
            Reference No
          </p>
          <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
            {data?.ref}
          </p>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
            Booking
          </p>
          <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
            {data?.book}
          </p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
            Post Time
          </p>
          <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
            {data?.postTime
              ? dayjs(data?.postTime)?.format("DD MMM, YYYY")
              : "Draft"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
            Status
          </p>
          <button
            className={`${
              statusStyles[data?.status]
            } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
          >
            {data?.status}
          </button>
        </div>
      </div>
    </div>
  );
}
