import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { rowIndex } from "@/utils/helper";
import { ACTION_TYPES } from "@/utils/static-const";
import React, { useMemo } from "react";

const menuItems = [
  { text: "Update", type: ACTION_TYPES.EDIT },
  { text: "Delete", type: ACTION_TYPES.DELETE },
];

export default function PackageList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        ...rowIndex(rows),
      },
      {
        name: "Package Name",
        selector: (row) => row.type,
        maxWidth: "20%",
      },
      {
        name: "Package Type",
        selector: (row) => row.module,
        maxWidth: "20%",
      },
      {
        name: "Visibility",
        selector: (row) => row.privacyType,
        maxWidth: "20%",
      },
      {
        name: "Extend Period",
        selector: (row) => row.expandedDuration,
        maxWidth: "20%",
      },
      {
        name: "Unit Price",
        selector: (row) => `${row.currency} ${row.fee}`,
        maxWidth: "20%",
      },
      {
        name: "No. Of Subscribers",
        selector: (row) => "no data found",
        maxWidth: "20%",
      },
      {
        name: "Listing Order",
        selector: (row) => "no data found",
        maxWidth: "20%",
      },
      {
        name: "Actions",
        cell: (row) => (
          <ActionMenu
            menuItems={menuItems}
            handleActionMenu={handleActionMenu}
            row={row}
          />
        ),
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
