import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import { ACTION_TYPES } from "@/utils/static-const";
import React, { useMemo } from "react";

const userMenuItems = [
  { text: "View", type: ACTION_TYPES?.VIEW },
  { text: "Reply", type: "Reply" },
  { text: "Change", type: "Change" },
  { text: "Status", type: ACTION_TYPES?.STATUS },
];

export default function ContactLists({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        name: "Serial",
        cell: (row, index) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "From Email",
        selector: (row) => `${row?.email}`,
        maxWidth: "20%",
      },
      {
        name: "Name",
        selector: (row) => row?.name,
        maxWidth: "20%",
      },
      {
        name: "Phone",
        selector: (row) => row?.phone,
        maxWidth: "20%",
      },
      {
        name: "Description",
        selector: (row) => row?.description,
        maxWidth: "20%",
      },
      {
        name: "Status",
        // selector: (row) => row?.docStatus,
        cell: (row) => (
          <div>
            {row?.docStatus === "Active" ? (
              <Status variant="active">Active</Status>
            ) : (
              <Status variant="penidng">Pending</Status>
            )}
          </div>
        ),
        maxWidth: "20%",
      },
      {
        id: "action-btn",
        name: "Action",
        cell: (row) => (
          <ActionMenu
            menuItems={userMenuItems}
            handleActionMenu={handleActionMenu}
            row={row}
          />
        ),
        minWidth: "20%",
        button: true,
      },
    ],
    [rows, handleActionMenu]
  );
  return <DataTableComponent rows={rows} columns={columns} />;
}
