"use client";

import { humanReadableDate, notify, NOTIFY_MESSAGE_SUCCESS, updateLocalStorageArray } from "@/utils/helper";
import { SAVE_SEARCH_LOAD } from "@/utils/static-const";
import dayjs from "dayjs";
import React from "react";
import { BiBookmarkAlt } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FaAngleRight, FaBookmark } from "react-icons/fa6";

const SingleHistory = ({
  type = "recent",
  item = {},
  removeLoadFromStorage,
}) => {
  // ! Load Save
  const handleSaveLoad = (item) => {
    updateLocalStorageArray(SAVE_SEARCH_LOAD, item);
    notify("Load Saved, View on Save Search", NOTIFY_MESSAGE_SUCCESS);
  };

  return (
    <div className="rounded-md p-3 flex justify-between bg-white mb-3 cursor-pointer border hover:border-slate-700">
      <div className=" w-full">
        <h6 className="text-sm">{humanReadableDate(item?.timer)}</h6>
        <div className="flex gap-4 items-center text-sm mt-3">
          <p>
            {`${item?.pickUpLocation?.name}`}{" "}
            <span className="text-slate-500 ml-3">{item?.pickupRadius}km</span>
          </p>
          <FaAngleRight style={{ fontSize: "15px", color: "#333333" }} />
          <p>---</p>
        </div>
        <div className="flex items-center text-xs text-slate-500">
          Date range:{" "}
          {`${dayjs(item?.startDate).format("DD MMM, YYYY")} - ${dayjs(
            item?.endDate
          )?.format("DD MMM, YYYY")}`}
        </div>
        <div className="flex gap-3 items-center mt-3">
          <button className="bg-slate-100 rounded-lg px-3 py-2 text-xs hover:bg-[#73c002] hover:text-white text-slate-500 capitalize">
            {item?.carrierType}
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-col items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            type == "recent" && handleSaveLoad(item);
          }}
          className="rounded-full border border-[#73c002] text-[#73c002] w-8 h-8 flex items-center justify-center hover:bg-[#73c002] hover:text-white"
        >
          {type == "recent" ? <BiBookmarkAlt /> : <FaBookmark />}
        </button>

        {type == "save" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              type == "save" && removeLoadFromStorage(item?.id);
            }}
            className="rounded-full border border-[#73c002] text-red-500 w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white text-xs"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleHistory;
