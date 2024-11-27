"use client";

import { useMemo } from "react";
import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import DataTableComponent from "@/components/table/DataTableComponent";
import { FaEye } from "react-icons/fa6";

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
        name: "Title",
        cell: (row) => (
          <div>
            <p className=" text-[#1C252E] font-normal pb-2">{row.title}</p>
          </div>
        ),
        maxWidth: "248px",
      },
      {
        name: "Description",
        cell: (row) => (
          <div>
            <div>
              <p
                className="text-[#1C252E] font-normal pb-2"
                dangerouslySetInnerHTML={{ __html: row?.description }}
              ></p>
            </div>
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Status",
        cell: (row) => {
          if (row?.docStatus === "Active") {
            return (
              <Status sizes="primary" variant="active">
                Active
              </Status>
            );
          } else {
            return (
              <Status sizes="primary" variant="deactive">
                Deactive
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
            <Button variant="base" size="small" onClick={() => handleActionMenu(row)}>
              <FaEye />
            </Button>
          </div>
        ),
        minWidth: "100px",
      },
    ],
    [handleActionMenu, rows]
  );

  return (
    <DataTableComponent
      columns={columns}
      rows={rows}
      paginationTotalRows={pagination.totalRows}
      pagination={pagination}
      handlePageChange={handlePageChange}
      handlePerPageChange={handlePerPageChange}
      selectableRows={false}
      fixedHeader={true}
      fixedHeaderScrollHeight={"550px"}
    />
  );
};

export default List;
