"use client";

import { useMemo, useState } from "react";
import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import DataTableComponent from "@/components/table/DataTableComponent";
import { ImAttachment } from "react-icons/im";
import { ACTION_TYPES } from "@/utils/static-const";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { FiFilter } from "react-icons/fi";
import AddTruck from "./AddTruck";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import { MdOutlineUpdate } from "react-icons/md";
import Swal from "sweetalert2";

const userMenuItems = [{ text: "View", type: ACTION_TYPES.VIEW }];

export default function ListComponent({ rows }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTruckId, setSelectedTruckId] = useState(null);

  const handleOpenDrawer = (truckId) => {
    setSelectedTruckId(truckId);
    setOpenDrawer(true);
  };

  const handleAttachmentsClick = (attachments) => {
    if (!attachments || attachments.length === 0) {
      Swal.fire({
        title: "No Attachments",
        text: "There are no attachments for this truck.",
        icon: "info",
      });
      return;
    }
  
    // Build HTML for each attachment with a direct link
    const attachmentList = attachments.map((url, index) => {
      const fileName = url.split('/').pop();
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">
                Open Attachment ${index + 1}
              </a>`;
    }).join("<br>");
  
    // Display attachments list in the Swal modal
    Swal.fire({
      title: "Attachments",
      html: attachmentList,
      icon: "info",
    });
  };
  
  // Function to handle forced download
  function downloadFile(url, fileName) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  



  const columns = useMemo(
    () => [
      {
        name: "Serial",
        selector: (row, index) => index + 1, // Automatically generates serial number
        maxWidth: "5%",
      },
      {
        name: "Truck Number",
        selector: (row) => row.truckNumber,
        maxWidth: "5%",
      },
      {
        name: "Truck Name",
        selector: (row) => row.title,
        maxWidth: "20%",
      },
      {
        name: "Is Available",
        cell: (row) => <div>{row.isAvailable ? "Yes" : "No"}</div>,
        maxWidth: "10%",
      },
      {
        name: "Length",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <p>{row.length.toFixed(2)}</p>
            <p>{row.lengthUnit}</p>
          </div>
        ),
        maxWidth: "15%",
      },
      {
        name: "Height",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <p>{row.height.toFixed(2)}</p>
            <p>{row.heightUnit}</p>
          </div>
        ),
        maxWidth: "15%",
      },
      {
        name: "Weight",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <p>{row.weight || "N/A"}</p>
            <p>{row.weightUnit}</p>
          </div>
        ),
        maxWidth: "15%",
      },
      {
        name: "Attachments",
        cell: (row) => (
          <button
            className="flex items-center gap-2"
            onClick={() => handleAttachmentsClick(row.attachments)}
          >
            <ImAttachment />
            <span>{row.attachments?.length || 0}</span>
          </button>
        ),
        maxWidth: "10%",
      },
      {
        name: "Document Status",
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

          return <Status variant={statusVariant}>{row.docStatus}</Status>;
        },
      },
      {
        name: "Action",
        cell: (row) => (
          <Button
            variant="text"
            size="large"
            onClick={() => handleOpenDrawer(row.id)}
          >
            <MdOutlineUpdate size={25} />
          </Button>
        ),
        minWidth: "10%",
        button: true,
      },
    ],
    [rows, userMenuItems]
  );

  return (
    <>
      <ReactDataTableComponent rows={rows} columns={columns} />

      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        {selectedTruckId && <AddTruck id={selectedTruckId} />}
      </RightDrawer>
    </>
  );
}
