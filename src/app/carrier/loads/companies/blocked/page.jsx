"use client";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { onboardCompanies } from "@/utils/home-static-data";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import CompaniesDetails from "../_components/CompaniesDetails";

const Page = () => {
  const [favourites, setFavourites] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const toggleFavourite = (companyId) =>
    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [companyId]: !prevFavourites[companyId],
    }));

  const handleOpenModal = (companyId) => {
    setSelectedCompanyId(companyId);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <section className="px-6 py-8 bg-[#F9FAFB] rounded-md">
        {onboardCompanies?.map((company) => (
          <div
            className="onboard-cards rounded-lg bg-white p-6 flex justify-between items-center mb-6"
            key={company.id}
            onClick={() => handleOpenModal(company.id)}
          >
            <div>
              <p className="text-[#637381] text-base font-normal leading-normal mb-4">
                {company.usid}
              </p>

              <h1 className="text-[#454f5b] text-xl font-semibold leading-7">
                {company.company}
              </h1>
              <p className="text-[#454f5b] text-base font-normal leading-normal mt-1">
                {company.location}
              </p>
            </div>

            <div>
              <Button
                variant="stroke"
                size="xsmall"
                iconLeft={favourites[company.id] ? <FaHeart /> : <FaRegHeart />}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(company.id);
                }}
              >
                {favourites[company.id] ? "Unblocked" : "Blocked"}
              </Button>
            </div>
          </div>
        ))}
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} maxWidth="w-1/2">
        {selectedCompanyId && <CompaniesDetails id={selectedCompanyId} />}
      </Modal>
    </>
  );
};

export default Page;
