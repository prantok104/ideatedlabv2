"use client";

import { useMemo } from "react";
import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import DataTableComponent from "@/components/table/DataTableComponent";

const List = ({
  rows,
  pagination,
  handlePageChange,
  handlePerPageChange,
  handleActionMenu,
}) => {
  // Define the columns inside useMemo for optimization
  const columns = useMemo(
    () => [
      {
        name: "Plan Name",
        cell: (row) => (
          <div>
            <p className="text-[#1C252E] font-normal pb-2">{row.planName}</p>
          </div>
        ),
        maxWidth: "248px",
      },
      {
        name: "Amount",
        cell: (row) => (
          <div>
            <div>
              <p className="text-[#1C252E] font-normal pb-2">{row.amount}</p>
            </div>
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Transaction Id",
        cell: (row) => (
          <p className="text-[#1C252E] font-normal pb-2">{row.transactionId}</p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Date",
        cell: (row) => (
          <p className="text-[#1C252E] font-normal pb-2">{row.date}</p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Status",
        cell: (row) => (
          row.status === "paid" ? (
            <Status sizes="primary" variant="active">
              Paid
            </Status>
          ) : (
            <Status sizes="primary" variant="deactive">
              Due
            </Status>
          )
        ),
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
              Details
            </Button>
          </div>
        ),
        minWidth: "100px",
      },
    ],
    [handleActionMenu]
  );

  return (
    <DataTableComponent
      columns={columns}
      rows={rows}
      paginationTotalRows={pagination.totalRows} // Pass total rows to DataTableComponent
      pagination={pagination}
      handlePageChange={handlePageChange}
      handlePerPageChange={handlePerPageChange}
      fixedHeader={true}
      fixedHeaderScrollHeight={"550px"}
    />
  );
};

export default List;
