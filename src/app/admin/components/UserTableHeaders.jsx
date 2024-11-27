"use client";

import ActionMenu from "@/components/table/ActionMenu";
import { useMemo } from "react";

const userMenuItems = [
  { text: "View Profile", type: "VIEW" },
  { text: "Edit User", type: "EDIT" },
  { text: "Delete User", type: "DELETE" },
];

const UserTableHeaders = () => {
  const columns = useMemo(
    () => [
      {
        name: "USER",
        cell: (row) => (
          <div>
            <p className=" text-[#1C252E] font-normal pb-2">
              {row.name.user}
            </p>
            <div>
              <p className=" font-normal text-[#637381] pb-1">
                {row.name.email}
              </p>
            </div>
          </div>
        ),
        maxWidth: "248px",
      },
      {
        name: "Company",
        cell: (row) => (
          <div>
            <div>
              <p className=" text-[#1C252E] font-normal pb-2">
                {row.office.companyName}
              </p>
            </div>
            <div>
              <p className=" font-normal text-[#637381] pb-1">
                {row.office.address}
              </p>
            </div>
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Workgroups",
        cell: (row) => (
          <p className=" text-[#1C252E] font-normal pb-2">
            {row.workgroups}
          </p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Seat Assignment",
        cell: (row) => (
          <p className=" text-[#1C252E] font-normal pb-2">
            {row.seatAssignment}
          </p>
        ),
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        minWidth: "100px",
      },
      {
        name: "Action",
        cell: (row) => <ActionMenu menuItems={userMenuItems} data={row} />,
        minWidth: "100px",
      },
    ],
    []
  );

  return columns;
};

export default UserTableHeaders;
