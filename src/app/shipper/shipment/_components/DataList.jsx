import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import React from "react";
import TableHeaders from "./TableHeaders";

export default function DataList({ rows, tableType, handleActionMenu }) {
  if (!tableType) {
    throw new Error("Either tableType must be defined");
  }

  // Use custom headers if provided; otherwise, fall back to the default headers
  const columns = TableHeaders(tableType, handleActionMenu);

  return (
    <div>
      <ReactDataTableComponent rows={rows} columns={columns} />
    </div>
  );
}
