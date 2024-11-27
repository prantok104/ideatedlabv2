import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { useMemo } from "react";
const contextMenuItems = [
  { text: "View Profile", type: "VIEW" },
  { text: "Edit User", type: "EDIT" },
  { text: "Delete User", type: "DELETE" },
];
export default function RoleList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        name: "Title",
        cell: (row) => (
          <div>
            <p className=" text-[#1C252E] font-normal pb-2">{row?.title}</p>
          </div>
        ),
        maxWidth: "30%",
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
        minWidth: "30%",
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
        sortable: false,
        minWidth: "20%",
        button: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <ActionMenu
            menuItems={contextMenuItems}
            handleActionMenu={handleActionMenu}
            row={row}
          />
        ),
        style: {
          background: "inherit",
          position: "sticky",
          right: 0,
          zIndex: 999,
        },
        minWidth: "20%",
        button: true,
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
