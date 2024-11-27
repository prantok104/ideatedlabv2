"use client";

import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import SimpleModal from "@/components/table/SimpleModal";
import React, { useMemo, useState } from "react";
import { MdCall, MdMessage } from "react-icons/md";
import IMG from "../../../../../../../public/asset/avatar.png";
import Image from "next/image";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import CompanyInfo from "./CompanyInfo";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import Modal from "@/components/modal/Modal";
import BidConfirmation from "./BidConfirmation";
import RejectBid from "./RejectBid";
import { humanReadableDate } from "@/utils/helper";
export default function BidDataList({
  rows,
  pagination,
  handlePageChange,
  handlePerPageChange,
}) {
  const [companyInfoOpen, setCompanyInfoOpen] = useState(false);
  const [rejectBidOpen, setRejectBidOpen] = useState(false);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedRow, setSlectedRow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleBidModal = () => {
    setBidModalOpen((prev) => !prev);
  };

  const handleOpenModal = (action) => {
    setModalAction(action);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalAction(null);
  };

  const handleConfirm = () => {
    if (modalAction) {
      console.log(`Confirmed action: ${modalAction}`);
      // Add your action logic here
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "Age",
        cell: (row) => (
          <p className="text-sm text-[#637381]">
            {humanReadableDate(row?.date)}
          </p>
        ),
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "Company Name",
        cell: (row) => (
          <div className="flex items-center">
            <Image
              src={IMG}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p
              className="underline text-sm ml-3 text-[#454F5B] font-medium"
              onClick={() => {
                setCompanyInfoOpen((prev) => !prev);
                setSlectedRow(row?.company);
              }}
            >
              {row?.company?.title}
            </p>
          </div>
        ),
        maxWidth: "40%",
      },
      {
        name: "Bid",
        cell: (row) => (
          <div>
            <p className="text-sm leading-4 font-semibold">SAR {row?.amount}</p>
          </div>
        ),
        sortable: true,
        maxWidth: "20%",
      },
      {
        name: "Status",
        cell: (row) => (
          <div>
            <span
              className={`px-3 py-1 text-sm font-semibold ${
                row?.status == "Accepted"
                  ? `bg-green-100  text-green-800`
                  : row?.status == "Rejected"
                  ? `bg-red-100  text-red-800`
                  : `bg-yellow-100  text-yellow-800`
              } rounded-full`}
            >
              {row?.status}
            </span>
          </div>
        ),
        sortable: true,
        maxWidth: "150px",
      },
      // {
      //   name: "Contact",
      //   cell: (row) => (
      //     <div className="flex gap-2 ">
      //       <button
      //         className="bg-[#141A21] text-white p-2 rounded-full"
      //         onClick={() => handleOpenModal("Contact")}
      //       >
      //         <MdCall size={16} />
      //       </button>
      //       <button
      //         className="bg-[#E3B210] text-white p-2 rounded-full"
      //         onClick={() => handleOpenModal("Message")}
      //       >
      //         <MdMessage size={16} />
      //       </button>
      //     </div>
      //   ),
      //   maxWidth: "20%",
      // },
      // {
      //   name: "",
      //   cell: (row) => (
      //     <div className="flex items-center gap-2 whitespace-nowrap">
      //       <FaRegCircleCheck
      //         size={20}
      //         color="#73C002"
      //         onClick={() => handleBidModal()}
      //       />
      //       <IoMdClose
      //         size={24}
      //         color="#FF5630"
      //         onClick={() => {
      //           setRejectBidOpen((prev) => !prev);
      //           setSlectedRow(row);
      //         }}
      //       />
      //     </div>
      //   ),
      //   maxWidth: "5%",
      //   center: true,
      // },
    ],
    []
  );

  return (
    <div>
      <ReactDataTableComponent
        rows={rows}
        columns={columns}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
      />

      <RightDrawer
        isOpen={companyInfoOpen}
        onClose={() => setCompanyInfoOpen(false)}
        style="w-1/4"
      >
        <CompanyInfo
          selectedRow={selectedRow}
          companyInfoOpen={companyInfoOpen}
        />
      </RightDrawer>

      <RightDrawer
        isOpen={rejectBidOpen}
        onClose={() => setRejectBidOpen(false)}
        style="w-1/4"
      >
        <RejectBid
          selectedRow={selectedRow}
          rejectBidOpen={rejectBidOpen}
          onClose={() => setRejectBidOpen(false)}
        />
      </RightDrawer>

      <SimpleModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />

      <Modal isOpen={bidModalOpen} onClose={handleBidModal} maxWidth="min-w-80">
        <BidConfirmation handleBidModal={handleBidModal} />
      </Modal>
    </div>
  );
}
