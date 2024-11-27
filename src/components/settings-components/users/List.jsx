"use client";

import DataTableComponent from "@/components/table/DataTableComponent";
import { useMemo } from "react";
import Button from "@/components/button/Button";
import { FaEye } from "react-icons/fa6";

const userMenuItems = [
  { text: "View Profile", type: "VIEW" },
  { text: "Edit User", type: "EDIT" },
  { text: "Delete User", type: "DELETE" },
];

const List = ({
  rows,
  pagination,
  handlePageChange,
  handlePerPageChange,
  handleActionMenu,
}) => {
  const columns = useMemo(
    () => [
      {
        name: "USER",
        cell: (row) => (
          <div>
            <p className="text-[#1C252E] font-normal pb-2">{row.name.user}</p>
            <div>
              <p className="font-normal text-[#637381] pb-1">
                {row.name.email}
              </p>
            </div>
          </div>
        ),
        maxWidth: "248px",
      },
      {
        name: "Company",
        cell: (row) => (
          <div>
            <div>
              <p className="text-[#1C252E] font-normal pb-2">
                {row.office.companyName}
              </p>
            </div>
            <div>
              <p className="font-normal text-[#637381] pb-1">
                {row.office.address}
              </p>
            </div>
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Workgroups",
        cell: (row) => (
          <p className="text-[#1C252E] font-normal pb-2">{row.workgroups}</p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Seat Assignment",
        cell: (row) => (
          <p className="text-[#1C252E] font-normal pb-2">
            {row.seatAssignment}
          </p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        minWidth: "100px",
      },
      {
        name: "Action",
        cell: (row) => (
            <div className="text-center">
              <Button
                variant="base"
                size="small"
                onClick={() => handleActionMenu(row)} // Pass the row data when clicking "Details"
              >
                <FaEye />
              </Button>
            </div>
          ),
      },
    ],
    [ handleActionMenu, rows ]
  );

  return (
    <>
      <DataTableComponent
        columns={columns}
        rows={rows}
        paginationTotalRows={pagination.totalRows}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        selectableRows={true}
        fixedHeader={true}
        fixedHeaderScrollHeight={"550px"}
      />
    </>
  );
};

export default List;
