"use client";

import DataTableComponent from "@/components/table/DataTableComponent";
import React, { useEffect, useState } from "react";
import { LoadData } from "./Demodata";
import { FaStar } from "react-icons/fa6";
import { humanReadableDate } from "@/utils/helper";
import dayjs from "dayjs";
import ActionMenu from "@/components/table/ActionMenu";
import { useRouter } from "next/navigation";

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

const SearchableList = ({ searchData = [] }) => {
  const router = useRouter();
  const menuItems = [
    { text: "Details", type: "Details" },
    //  { text: "Save", type: "Save" },
  ];

  const columns = [
    {
      name: "Age",
      selector: (row) => humanReadableDate(row?.pickUpDate),
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
      minWidth: "300px",
      maxWidth: "400px",
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
      minWidth: "300px",
      maxWidth: "400px",
    },
    {
      name: "Trailer",
      selector: (row) => row.trailer?.title,
      sortable: false,
    },
    {
      name: "Flat Rate",
      cell: (row) => (
        <div className="flex gap-1 items-center">
          {`${row?.currency} ${row?.flatRate}`}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Size",
      selector: (row) => (
        <div className="flex flex-col gap-2 ">
          <span className="text-gray-400">TL</span>
          <span>{`W: ${
            row?.weight ? `${row?.weight} ${row?.weightUnit}` : "-"
          }`}</span>
          <span>{`L: ${
            row?.height ? `${row?.height} ${row?.heightUnit}` : "-"
          }`}</span>
          <span>{`H: ${
            row?.length ? `${row?.length} ${row?.lengthUnit}` : "-"
          }`}</span>
        </div>
      ),
      sortable: false,
    },
    {
      name: "Company Name",
      selector: (row) => (
        <div>
          <div className="flex gap-2 items-center">
            <img
              class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            {row?.company?.title}
          </div>
          <div className="flex gap-1 items-center">
            <FaStar size={18} className="text-yellow-500" />3
          </div>
        </div>
      ),
      sortable: false,
      minWidth: "200px",
    },
    {
      name: "Proposal",
      selector: (row) => (
        <>
          <p>{row?.totalBids ?? 0}</p>
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
      minWidth: "120px",
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
    },
  ];

  const [data, setData] = useState({
    data: LoadData,
    total: LoadData.length,
    perPage: 5,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 10,
  });

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      data: searchData,
    }));
  }, [searchData]);

  const handleActionMenu = (actionType, row) => {
    const { id } = row;
    switch (actionType) {
      case "Details":
        router.push(`/carrier/loads/search-loads/${id}`);
        break;
      // case "Save":
      //   router.push(`search-load/${id}/save`);
      //   break;
      default:
        console.warn("Unhandled action type:", actionType);
    }
  };

  return (
    <div>
      <DataTableComponent
        rows={data}
        columns={columns}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        fixedHeader="450px"
      />
    </div>
  );
};
export default SearchableList;
