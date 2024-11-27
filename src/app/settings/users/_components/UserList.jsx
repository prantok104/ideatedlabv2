import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { rowIndex } from "@/utils/helper";
import { statusStyles, userMenuItems } from "@/utils/home-static-data";
import { useMemo } from "react";

export default function UserList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        ...rowIndex(rows),
      },
      {
        name: "FullName",
        selector: (row) => `${row?.firstName} ${row?.lastName}`,
        maxWidth: "20%",
      },
      {
        name: "Username",
        selector: (row) => row?.userName,
        maxWidth: "20%",
      },
      {
        name: "Email",
        selector: (row) => row?.email,
        maxWidth: "20%",
      },
      {
        name: "Phone",
        selector: (row) => row?.phone,
        maxWidth: "20%",
      },
      {
        name: "User Type",
        selector: (row) => row?.userType,
        maxWidth: "10%",
      },
      {
        name: "Role",
        selector: (row) => row?.responsibility,
        maxWidth: "10%",
      },
      {
        name: "Status",
        cell: (row) => (
          <>
            <button
              className={`${
                statusStyles[row?.docStatus]
              } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
            >
              {row?.docStatus}
            </button>
          </>
        ),
        maxWidth: "10%",
      },
      {
        name: "Action",
        cell: (row) => (
          <ActionMenu
            menuItems={userMenuItems}
            handleActionMenu={handleActionMenu}
            row={row}
          />
        ),
        minWidth: "10%",
        button: true,
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
