"use client";

import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import StarRating from "@/components/table/tool/StarRating";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PrivateLoadData } from "./PrivateLoadData";

export default function PrivateLoadList() {
  const router = useRouter();

  const menuItems = [
    { text: "Details", type: "Details" },
    { text: "Save", type: "Save" },
  ];

  const columns = [
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Pickup Date",
      selector: (row) => row.pickupDate,
      sortable: true,
    },
    {
      name: "Trip",
      cell: (row) => (
        <div>
          <div>
            <p className="text-[#919EAB] text-xs leading-5">Pickup</p>
            <p className="text-xs leading-5">{row.trip.pickup}</p>
          </div>
          <div>
            <p className="text-[#919EAB] text-xs leading-5">Dropoff</p>
            <p className="text-xs leading-5">{row.trip.dropoff}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "DH(0)",
      selector: (row) => row.dh,
      sortable: true,
    },
    {
      name: "Rate",
      cell: (row) => (
        <div>
          <StarRating rating={row.rate} />
        </div>
      ),
      sortable: true,
    },
    {
      name: "Equipment",
      selector: (row) => row.equipment,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
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
    data: PrivateLoadData,
    total: PrivateLoadData.length,
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

  const handleActionMenu = (actionType, row) => {
    const { id } = row; // Extract the id from the row object
    console.log(actionType, row);

    switch (actionType) {
      case "Details":
        router.push(`private-loads/${id}`);
        break;
      case "Save":
        router.push(`private-loads/${id}/save`);
        break;
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
        handleActionMenu={handleActionMenu}
        fixedHeader="450px"
      />
    </div>
  );
}
