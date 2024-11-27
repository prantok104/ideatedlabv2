"use client";

import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import { ImAttachment } from "react-icons/im";
import { ACTION_TYPES } from "@/utils/static-const";
import { useMemo } from "react";
import Image from "next/image";
import companyLogo from '../../../../../public/asset/truck-overview-icons/compnayLogo.svg'
import star from '../../../../../public/asset/truck-overview-icons/star-gold.svg'

const userMenuItems = [{ text: "View ", type: ACTION_TYPES?.VIEW }];

export default function LoadListDriver({ rows }) {
  const columns = useMemo(
    () => [
      {
        name: "Load ID",
        selector: (row) => row?.loadId,
        maxWidth: "5%",
      },
      {
        name: "Trip",
        cell : (row) => (
            <div>
                <p className="text-[#919eab] text-xs font-normal leading-tight mb-2">Pickup</p>
                <p className="text-[#667085] text-sm font-medium  leading-tight">{row?.pickupLocation}</p>

                <p className="text-[#919eab] text-xs font-normal leading-tight mb-2 mt-2">Dropoff</p>
                <p className="text-[#667085] text-sm font-medium  leading-tight">{row?.dropoffLocation}</p>
            </div>
        ),
        maxWidth: "20%",
      },

      {
        name: "Trailer ",
        selector: (row) => row?.trailerType || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Company Name",
        cell: (row) => (
            <div className="flex gap-2 items-center">
                <Image src={companyLogo} alt="Company Logo" />
                <div className="text-[#667085] text-xs font-normal leading-tight tracking-tight"> {row?.company} </div>
            </div>
        ),
        maxWidth: "20%",
      },
      {
        name: "Rate ",
        cell: (row) => (
            <div className="flex gap-2">
                <Image src={star} alt="Company Logo" />
                <p className="text-[#667085] text-sm font-medium  leading-tight"> {row?.rate} </p>
            </div>
        ),
        maxWidth: "20%",
      },
      
      {
        name: "Status",
        cell: (row) => {
          let statusVariant;

          switch (row.Status) {
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
              <Status variant={statusVariant}>{row.Status}</Status>
            </div>
          );
        },
        minWidth: "10%",
      },
    ],
    [rows]
  );



  return <DataTableComponent rows={rows} columns={columns} />;
}
