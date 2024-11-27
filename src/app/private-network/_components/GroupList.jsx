import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import React, { useMemo } from "react";

const userMenuItems = [{ text: "Remove", type: "Remove" }];

const GroupList = ({ rows, handleActionMenu, handleRowSelected }) => {
  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row?.name,
        maxWidth: "20%",
      },
      {
        name: "Authority",
        selector: (row) => row?.Authority,
        maxWidth: "30%",
      },
      {
        name: "Email",
        selector: (row) => `${row?.email}`,
        maxWidth: "20%",
      },
      {
        name: "Phone",
        selector: (row) => row?.phone,
        maxWidth: "20%",
      },
      //   {
      //     name: "Status",
      //     // selector: (row) => row?.docStatus,
      //     cell: (row) => (
      //       <div>
      //         {row?.docStatus === "Active" ? (
      //           <Status variant="active">Active</Status>
      //         ) : (
      //           <Status variant="penidng">Pending</Status>
      //         )}
      //       </div>
      //     ),
      //     maxWidth: "20%",
      //   },
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
  return (
    <DataTableComponent
      rows={rows}
      columns={columns}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      pagination
    />
  );
};

export default GroupList;
