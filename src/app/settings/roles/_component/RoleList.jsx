import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { rowIndex } from "@/utils/helper";
import { contextMenuItems, statusStyles } from "@/utils/home-static-data";
import { useMemo } from "react";

export default function RoleList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        ...rowIndex(rows),
      },
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
        name: "Permissions Assigned",
        selector: (row) => row.permissions.length,
        maxWidth: "30%",
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
        maxWidth: "30%",
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
        minWidth: "10%",
        button: true,
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
