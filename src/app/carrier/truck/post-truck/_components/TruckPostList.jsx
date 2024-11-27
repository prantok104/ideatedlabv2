"use client";

import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import { ImAttachment } from "react-icons/im";
import { ACTION_TYPES } from "@/utils/static-const";
import { useMemo, useState } from "react";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import PostTruck from "./PostTruck";
import { MdOutlineUpdate } from "react-icons/md";
import { FaPen, FaPencil } from "react-icons/fa6";

const userMenuItems = [{ text: "View ", type: ACTION_TYPES?.VIEW }];

export default function TruckPostList({ rows }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenDrawer = (truckId) => {
    setSelectedPost(truckId);
    setOpenDrawer(true);
  };

  const columns = useMemo(
    () => [
      {
        name: "Serial",
        selector: (row, index) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "Pickup Date",
        cell: (row) => {
          const date = new Date(row?.pickUpDate);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
        maxWidth: "20%",
      },

      {
        name: "Trip ",
        cell: (row) => (
          <div>
            <p className="text-[#919eab] text-xs font-normal pb-1 leading-tight">
              Pickup
            </p>
            <p className="text-[#667085] text-sm font-medium pb-1 leading-tight">
              {row?.pickupLocation || "N/A"}
            </p>
            <p className="text-[#919eab] text-xs font-normal pb-1 leading-tight">
              Dropoff
            </p>
            <p className="text-[#667085] text-sm font-medium pb-1 leading-tight">
              {row?.dropoffLocation || "N/A"}
            </p>
          </div>
        ),
        maxWidth: "40%",
      },
      {
        name: "Load Size",
        selector: (row) => row?.loadSize || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Trucks",
        selector: (row) => row?.truck || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Assign",
        selector: (row) => row?.assignedBy || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Size ",
        cell: (row) => (
          <div>
            <p className="text-[#919eab] text-xs font-normal pb-1 leading-tight">
              Lenght
            </p>
            <p>
              {row?.length} {row?.lengthUnit}
            </p>
            <p className="text-[#919eab] text-xs font-normal pb-1 leading-tight">
              Width
            </p>
            <p>
              {row?.weight} {row?.weightUnit}
            </p>
          </div>
        ),
        maxWidth: "20%",
      },
      {
        name: "Preferred Contact",
        selector: (row) => row?.contactPerson || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Status",
        cell: (row) => {
          let statusVariant;

          switch (row.docStatus) {
            case "Active":
              statusVariant = "active";
              break;
            case "Subscribed":
              statusVariant = "subscribed";
              break;
            case "Pending":
              statusVariant = "pending";
              break;
            case "Unverified":
              statusVariant = "deactive";
              break;
            case "Banned":
              statusVariant = "banned";
              break;
            case "Suspended":
              statusVariant = "suspended";
              break;
            default:
              statusVariant = "unknown";
          }

          return (
            <div>
              <Status variant={statusVariant}>{row.docStatus}</Status>
            </div>
          );
        },
        minWidth: "10%",
      },

      {
        name: "Action",
        cell: (row) => (
          <Button
            variant="text"
            size="large"
            onClick={() => handleOpenDrawer(row.id)}
          >
             <FaPen size={16} />
          </Button>
        ),
        minWidth: "10%",
        button: true,
      },
    ],
    [rows]
  );

  return (
    <>
      <ReactDataTableComponent rows={rows} columns={columns} />
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[85%]"
      >
        {selectedPost && <PostTruck id={selectedPost} />}
      </RightDrawer>
    </>
  );
}
