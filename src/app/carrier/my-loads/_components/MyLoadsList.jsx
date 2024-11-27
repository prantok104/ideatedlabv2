"use client";

import ActionMenu from "@/components/table/ActionMenu";
import { useMemo } from "react";
import { humanReadableDate } from "@/utils/helper";
import dayjs from "dayjs";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";

const statusStyles = {
  Active: "text-[#73c002] bg-[#f1f9e6]",
  Inactive: "text-[#d9534f] bg-[#fce8e8]",
  Pending: "text-[#ffb822] bg-[#fff5e6]",
  published: "text-[#73c002] bg-[#f1f9e6]",
  draft: "text-[#ffb822] bg-[#fff5e6]",
  in_review: "text-[#ffb822] bg-[#fff5e6]",
  Completed: "text-[#17a2b8] bg-[#e6f7f9]",
  Done: "text-[#5cb85c] bg-[#e6f9e6]",
};

const menuItems = [
  { text: "Details", type: "Details" },
  //  { text: "Save", type: "Save" },
];

export default function MyLoadsList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        name: "Serial",
        cell: (row, index) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "Age",
        selector: (row) =>
          row?.shipmentStatus == "draft"
            ? "---"
            : humanReadableDate(row?.pickUpDate),
        sortable: true,
        minWidth: "165px",
      },
      {
        name: "Pickup Date",
        selector: (row) =>
          dayjs(row?.pickUpDate)?.format("DD MMM, YYYY hh:mm:ss A"),
        minWidth: "210px",
      },
      {
        name: "Pickup",
        selector: (row) => (
          <>
            <div>
              <span className="text-xs text-gray-500">Pick up</span>
              <p className="font-bold">{row?.pickUpLocation?.name}</p>
            </div>
          </>
        ),
        minWidth: "400px",
        maxWidth: "450px",
      },
      {
        name: "Dropoff",
        selector: (row) => (
          <>
            <div className="mt-2">
              {row?.dropOffLocations?.map((item, index) => (
                <div key={index}>
                  <span className="text-xs text-gray-500">
                    Dropoff{" "}
                    {`${
                      row?.dropOffLocations?.length == 1
                        ? ""
                        : `point(${index + 1}) `
                    }`}
                  </span>
                  <p className="font-bold">{item?.name}</p>
                </div>
              ))}
            </div>
          </>
        ),
        minWidth: "400px",
        maxWidth: "450px",
      },
      {
        name: "Reference",
        selector: (row) => (
          <>
            <p title={row?.trackingNumber}>{row?.trackingNumber}</p>
          </>
        ),
        minWidth: "210px",
      },
      {
        name: "Equipment",
        selector: (row) => (
          <>
            <p title={row?.carrierType}>{row?.carrierType}</p>
          </>
        ),
        minWidth: "140px",
      },
      {
        name: "Rate",
        cell: (row) => (
          <div>
            <p>
              {row?.currency}
              {row?.flatRate}
            </p>
          </div>
        ),
      },
      {
        name: "Propose",
        selector: (row) => (
          <>
            <p title={row?.comments}>{row?.comments}</p>
          </>
        ),
      },
      {
        name: "Status",
        cell: (row) => (
          <>
            <button
              className={`${
                statusStyles[row?.shipmentStatus]
              } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
            >
              {row?.shipmentStatus}
            </button>
          </>
        ),
        minWidth: "140px",
      },
      {
        name: "Action",
        cell: (row) => (
          <ActionMenu
            menuItems={menuItems}
            handleActionMenu={handleActionMenu}
            row={row}
          />
        ),
        maxWidth: "80px",
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
