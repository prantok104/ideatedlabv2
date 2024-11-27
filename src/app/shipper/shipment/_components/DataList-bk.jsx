"use client";

import DataTableComponent from "@/components/table/DataTableComponent";
import TableHeaders from "./TableHeaders";

const DataList = ({
  rows,
  pagination,
  handlePageChange,
  handlePerPageChange,
  tableType,
  handleActionMenu,
  customHeaders,
  selectableRows,
  // New optional prop for custom headers
}) => {
  if (!tableType && !customHeaders) {
    throw new Error("Either tableType or customHeaders must be defined");
  }

  // Use custom headers if provided; otherwise, fall back to the default headers
  const columns = customHeaders
    ? customHeaders
    : TableHeaders(tableType, handleActionMenu);

  return (
    <div>
      <DataTableComponent
        columns={columns}
        rows={rows}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        selectableRows={selectableRows} // Convert to boolean
        fixedHeader={true} // Convert to boolean
        fixedHeaderScrollHeight="570px"
      />
    </div>
  );
};

export default DataList;
