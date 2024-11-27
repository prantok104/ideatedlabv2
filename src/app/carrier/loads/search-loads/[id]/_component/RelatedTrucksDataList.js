"use client";

import DataTableComponent from "@/components/table/DataTableComponent";
import React, { useMemo } from "react";

export default function RelatedTrucksDataList({
  rows,
  handlePageChange,
  handlePerPageChange,
  pagination,
}) {
  // const customStyles = {
  //   header: {
  //     style: {
  //       maxHeight: "40px",
  //       minHeight: "32px",
  //       padding: "0px",
  //       zIndex: "10",
  //       marginBottom: "10px",
  //     },
  //   },

  //   head: {
  //     style: {
  //       // marginTop: "8px",
  //     },
  //   },

  //   headRow: {
  //     style: {
  //       color: "black",
  //       fontSize: "14px",
  //     },
  //   },

  //   rows: {
  //     style: {
  //       minHeight: "80px",
  //       "&:hover": {
  //         backgroundColor: "#F1F9E6", // Change background color on hover
  //         // cursor: "pointer", // Change cursor to pointer on hover
  //       },
  //     },
  //   },
  // };

  const columns = useMemo(() => [
    {
      name: "AGE",
      selector: (row) => row.age,
      style: {
        color: "#667085",
        fontSize: "14px",
        fontWeight: "600",
      },
      sortable: true,
    },
    {
      name: "RATE",
      selector: (row) => row.rate,
      style: {
        color: "#667085",
      },
      sortable: true,
    },
    {
      name: "AVAILABLE",
      selector: (row) => row.available,
      style: {
        color: "#454F5B",
        fontSize: "14px",
        fontWeight: "600",
      },
      sortable: true,
    },
    {
      name: "TRIP",
      cell: (row) => (
        <div>
          <h3 className="text-xs font-medium text-[#919EAB]">Pickup</h3>
          <p className="text-sm font-medium text-[#667085]">
            {row.trip.pickup}
          </p>
          <h3 className="text-xs font-medium text-[#919EAB]">Dropoff</h3>
          <p className="text-sm font-medium text-[#667085]">
            {row.trip.dropoff}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "DH-0",
      selector: (row) => row.dh_0,
      style: {
        color: "#637381",
        fontSize: "14px",
        fontWeight: "600",
      },
      sortable: true,
    },
    {
      name: "EQUIPMENT",
      cell: (row) => (
        <div>
          <h3 className="text-sm font-medium text-[#667085]">
            {row.equipment.name}
          </h3>
          <p className="text-xs font-medium text-[#919EAB]">
            {row.equipment.size}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "COMPANY",
      cell: (row) => (
        <div>
          <h3 className="text-sm font-medium text-[#73C002]">
            {row.company.name}
          </h3>
          <p className="text-xs font-medium text-[#73C002]">
            {row.company.phone}
          </p>
        </div>
      ),
      sortable: true,
    },
  ]);

  // const [selectedRows, setSelectedRows] = useState([]);
  // const [toggleCleared, setToggleCleared] = useState(false);

  // const handleRowSelected = ({ selectedRows }) => {
  //   setSelectedRows(selectedRows);
  // };

  // const handleClear = () => {
  //   setToggleCleared(!toggleCleared);
  // };

  return (
    <div className="mt-12">
      <DataTableComponent
        title="Related Trucks"
        columns={columns}
        rows={rows}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        selectableRows={"true"}
        // onSelectedRowsChange={handleRowSelected}
        // clearSelectedRows={toggleCleared}
        fixedHeader={"true"}
        fixedHeaderScrollHeight={"810px"}
        // customStyles={customStyles}
      />
    </div>
  );
}
