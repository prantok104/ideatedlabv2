"use client";
import Status from "@/components/status/Status";
import { ImAttachment } from "react-icons/im";
import { useMemo, useState } from "react";
import Avatar from "antd/es/avatar/avatar";
import StarRatings from "react-star-ratings";
import Button from "@/components/button/Button";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import AddDriver from "./AddDriver";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa";

export default function DriverListComponent({ rows }) {
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
    const attachmentList = attachments
      .map((url, index) => {
        const fileName = url.split("/").pop();
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">
                Open Attachment ${index + 1}
              </a>`;
      })
      .join("<br>");

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
        name: "Driver ID",
        selector: (row) => row?.identificationNumber,
        maxWidth: "5%",
      },
      {
        name: "Driver Name",
        cell: (row) => (
          <div className="flex items-center">
            {row?.avatar ? (
              <Avatar src={row.avatar} />
            ) : (
              <Avatar>{row.name.charAt(0)}</Avatar> // Fallback to first letter of the name
            )}
            <span className="ps-2">{row?.name}</span>
          </div>
        ),
        maxWidth: "20%",
      },

      {
        name: "Phone Number ",
        selector: (row) => row?.phone || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Email Address",
        selector: (row) => row?.email || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Address ",
        selector: (row) => row?.address || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Address",
        cell: (row) => (
          <div>
            <StarRatings
              rating={row?.ratingCount}
              starDimension="16px"
              starSpacing="1px"
              starRatedColor="orange"
            />

            <p className="mt-1">{row?.ratingCount.toFixed(1)}</p>
          </div>
        ),
        maxWidth: "20%",
      },

      {
        name: "Attachment",
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
        name: "Status",
        cell: (row) => {
          let statusVariant;

          switch (row.status) {
            case "active":
              statusVariant = "active";
              break;
            case "subscribed":
              statusVariant = "subscribed";
              break;
            case "pending":
              statusVariant = "pending";
              break;
            case "inactive":
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
              <Status variant={statusVariant}>{row.status}</Status>
            </div>
          );
        },
        minWidth: "10%",
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <Button
              variant="text"
              size="large"
              onClick={() => handleOpenDrawer(row.id)}
            >
              <FaPen size={16} />
            </Button>
          </div>
        ),
        minWidth: "10%",
      },
    ],
    [rows, handleOpenDrawer]
  );

  return (
    <>
      <ReactDataTableComponent rows={rows} columns={columns} />
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        {selectedTruckId && <AddDriver id={selectedTruckId} />}
      </RightDrawer>
    </>
  );
}
