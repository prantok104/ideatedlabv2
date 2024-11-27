"use client";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { onboardCompanies } from "@/utils/home-static-data";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineHandshake } from "react-icons/md";
import { toast } from "react-toastify";
import CompaniesDetails from "../_components/CompaniesDetails";

const Page = () => {
  // Track favorites for each company by ID
  const [favourites, setFavourites] = useState({}); // Object to store favourite states per company ID
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // State to store selected company ID

  // Open modal and set the selected company ID
  const handleOpenModal = (companyId) => {
    setSelectedCompanyId(companyId); // Set the selected company ID
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClick = (e, companyId) => {
    e.stopPropagation(); // Prevent the click from bubbling up

    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [companyId]: !prevFavourites[companyId], // Toggle the favorite state for the specific company
    }));

    toast.success(
      favourites[companyId] ? "Removed from favourite" : "Added to favourite"
    );
  };

  return (
    <>
      <section className="px-6 py-8 bg-[#F9FAFB] rounded-md">
        {onboardCompanies?.map((company) => (
          <div
            className="onboard-cards rounded-lg bg-white p-6 flex justify-between items-center mb-6"
            key={company.id}
            onClick={() => handleOpenModal(company.id)} // Pass the company ID to open modal
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
                iconLeft={
                  favourites[company.id] ?   <FaRegHeart /> : <FaHeart />
                } // Toggle the heart icon based on the specific company ID
                onClick={(e) => handleClick(e, company.id)} // Pass the company ID to handleClick
              >
                 {favourites[company.id] ? "Favorited" : "Add to Favorites"}
              </Button>

              <div className="mt-4">
                <Button variant="strokeOrange" size="xsmall" iconLeft={<MdOutlineHandshake />}>
                    Onboarding
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pass selectedCompanyId to CompaniesDetails inside the modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} maxWidth="w-1/2">
        {selectedCompanyId && (
          <CompaniesDetails id={selectedCompanyId} />
        )}
      </Modal>
    </>
  );
};

export default Page;
