import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { useMemo } from "react";
const userMenuItems = [
  { text: "View Profile", type: "VIEW" },
  { text: "Edit User", type: "EDIT" },
  { text: "Delete User", type: "DELETE" },
];
export default function UserList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
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

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
