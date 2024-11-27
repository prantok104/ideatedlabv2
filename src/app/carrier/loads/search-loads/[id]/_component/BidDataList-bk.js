import React, { useMemo, useState } from "react";
import DataTableComponent from "@/components/table/DataTableComponent";
import SimpleModal from "@/components/table/SimpleModal"; // Import the modal component
import { MdCall, MdMessage } from "react-icons/md"; // Icons for call and message buttons
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function BidDataList({
  rows,
  handlePageChange,
  handlePerPageChange,
  handleAction,
  pagination,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleOpenModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleConfirm = () => {
    if (modalAction) {
      console.log(`Confirmed action: ${modalAction}`);
      // Add your action logic here
    }
  };

  const columns = useMemo(() => [
    {
      name: "Age",
      cell: (row) => <p className="text-sm text-[#637381]">{row.age}</p>,
      sortable: true,
    },
    {
      name: "Name",
      cell: (row) => (
        <p className="text-sm text-[#454F5B] font-medium">{row.name}</p>
      ),
      sortable: true,
    },
    {
      name: "Bid",
      cell: (row) => (
        <div>
          <p className="text-sm leading-4 font-semibold">{row.rates.bid}</p>
          <p className="text-[#637381]">{row.rates.postedRate}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Contact",
      cell: (row) => (
        <div className="flex gap-2 ">
          <button
            className="bg-[#141A21] text-white p-2 rounded-full"
            onClick={() => handleOpenModal("Contact")}
          >
            <MdCall size={16} />
          </button>
          <button
            className="bg-[#E3B210] text-white p-2 rounded-full"
            onClick={() => handleOpenModal("Message")}
          >
            <MdMessage size={16} />
          </button>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 whitespace-nowrap">
          {/* <button
            className="text-[#637381] hover:underline hover:underline-offset-2 px-3 py-2"
            onClick={() => handleOpenModal("Accept")}
          >
            Accept
          </button> */}
          <FaRegCircleCheck
            size={24}
            onClick={() => handleOpenModal("Accept")}
          />
          {/* <button
            className="text-[#73C002] hover:underline hover:underline-offset-2 px-3 py-2"
            onClick={() => handleOpenModal("Reject")}
          >
            Reject
          </button> */}
          <IoMdClose size={24} />
        </div>
      ),
      style: {
        minWidth: "150px",
      },
    },
  ]);

  return (
    <div>
      <DataTableComponent
        columns={columns}
        rows={rows}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        handleAction={handleAction}
        fixedHeader={"true"}
        fixedHeaderScrollHeight={"350px"}
      ></DataTableComponent>

      <SimpleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
