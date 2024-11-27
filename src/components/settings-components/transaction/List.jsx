"use client";

import DataTableComponent from "@/components/table/DataTableComponent";
import { useMemo } from "react";
import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import { FaEye } from "react-icons/fa6";

const userMenuItems = [{ text: "Details", type: "VIEW" }];

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
        name: "Name",
        cell: (row) => (
          <div>
            <p className=" text-[#1C252E] font-normal pb-2">{row.name}</p>
          </div>
        ),
        maxWidth: "248px",
      },
      {
        name: "Invoice#",
        cell: (row) => (
          <div>
            <div>
              <p className=" text-[#1C252E] font-normal pb-2">
                {row.invoiceNumber}
              </p>
            </div>
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Date",
        cell: (row) => (
          <p className=" text-[#1C252E] font-normal pb-2">{row.date}</p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Amount",
        cell: (row) => (
          <p className=" text-[#1C252E] font-normal pb-2">{row.amount}</p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Status",
        cell: (row) => {
          if (row.status === "paid") {
            return (
              <Status sizes="primary" variant="active">
                Paid
              </Status>
            );
          } else {
            return (
              <Status sizes="primary" variant="deactive">
                Due
              </Status>
            );
          }
        },
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
              
            >
              <FaEye />
            </Button>
          </div>
        ),
        minWidth: "100px",
        maxWidth: "100px",
      },
    ],
    []
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
