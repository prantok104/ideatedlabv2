"use client";

import Backhauls from "@/app/shipper/shipment/[id]/_component/Backhauls";
import RelatedTrucksTable from "@/app/shipper/shipment/[id]/_component/RelatedTrucksTable";
import ButtonList from "@/components/details/ButtonList";
import ContactDetailsCard from "@/components/details/ContactDetailsCard";
import EquipmentDetailsCard from "@/components/details/EquipmentDetailsCard";
import SpotRateCard from "@/components/details/SpotRateCard";
import TripCard from "@/components/details/TripCard";
import Map from "@/components/details/Map";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import {
  IoEyeOutline,
  IoLocationSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import { LuUndo2 } from "react-icons/lu";
import { RiDeleteBin6Line, RiDraftLine, RiTruckFill } from "react-icons/ri";
import Button from "@/components/button/Button";
import IconButtonCard from "@/components/details/IconButtonCard";
import { FaArrowTrendUp, FaRegHeart } from "react-icons/fa6";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Company from "../_components/Company";
import ProfitCalc from "../_components/ProfitCalc";
import { MdOutlineAddCard, MdStarBorder } from "react-icons/md";
import RateCheck from "../_components/RateCheck";
import CreditCard from "../_components/CreditCard";
import Link from "next/link";
import PlaceBid from "../../_components/PlaceBid";
import Modal from "@/components/modal/Modal";
import LoadBooking from "../../_components/LoadBooking";

const buttonData = [
  {
    id: 2,
    icon: <IoShareSocialOutline size={16} />,
    routeName: "Share",
    link: "/shipper/shipment/1/share",
  },
  {
    id: 1,
    icon: <FaRegHeart size={16} />,
    routeName: "Save",
    link: "/save",
  },
];

const equipmentDetails = [
  { label: "Load", value: "Full" },
  { label: "Truck", value: "Flatbed" },
  { label: "Length", value: "45 ft" },
  { label: "Weight", value: "60,000 lbs" },
  { label: "Commodity", value: "-" },
  { label: "Tracking", value: "-" },
];

const contactDetails = [
  { label: "Phone Number", value: "+880123456789" },
  { label: "Email", value: "example@gmail.com" },
  { label: "Bidding", value: "-" },
];

const buttonData2 = [
  {
    id: 1,
    icon: SiHomeassistantcommunitystore,
    title: "Company",
    subtitle: "SR Express Logistic",
    onClick: () => setOpen((prev) => !prev),
    modal: Company,
  },
  {
    id: 2,
    icon: LuUndo2,
    title: "Backhauls",
    subtitle: "500 Possible Loads",
    onClick: () => setOpen((prev) => !prev),
    modal: Backhauls,
  },
  {
    id: 3,
    icon: FaArrowTrendUp,
    title: "Profit Calculator",
    subtitle: "$1116.26 (55.94/mi)",
    onClick: () => setOpen((prev) => !prev),
    modal: ProfitCalc,
  },
  {
    id: 4,
    icon: MdStarBorder,
    title: "Rate Check",
    subtitle: "$5.51/ml average rate",
    onClick: () => setOpen((prev) => !prev),
    modal: RateCheck,
  },
  {
    id: 5,
    icon: MdOutlineAddCard,
    title: "Credit Rating",
    subtitle: "Score : 92/A",
    onClick: () => setOpen((prev) => !prev),
    modal: CreditCard,
  },
];

export default function ShipmentDetails() {
  const [isCompanyOpen, setCompanyOpen] = useState(false);
  const [isBackhaulsOpen, setBackhaulsOpen] = useState(false);
  const [isProfitCalcOpen, setProfitCalcOpen] = useState(false);
  const [isRateOpen, setRateOpen] = useState(false);
  const [isCreditOpen, setCreditOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const openBidModal = () => setIsBidModalOpen(true);
  const closeBidModal = () => setIsBidModalOpen(false);
  const openBookModal = () => setIsBookModalOpen(true);
  const closeBookModal = () => setIsBookModalOpen(false);

  const router = useRouter();

  const handleNavigation = (link) => {
    router.push(link);
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm mb-[6px] text-[#637381] font-normal leading-5">
              2 hours ago
            </h3>
            <h1 className="text-2xl font-semibold leading-7 text-[#141A21]">
              SR logistic Service
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Book now Button  */}
            <div>
              <Button
                variant="rectangleFill"
                size="medium"
                onClick={() => {
                  closeBidModal();
                  openBookModal();
                }}
                // onClose={closeBidModal}
              >
                Book Now
              </Button>
              {isBookModalOpen && (
                <Modal
                  isOpen={isBookModalOpen}
                  onClose={closeBookModal}
                  maxWidth="max-w-xs"
                  position="absolute mt-2 right-32"
                >
                  <LoadBooking onClose={closeBookModal} />
                </Modal>
              )}
            </div>

            {/* Bid Button  */}
            {/* <div>
              <Button variant="reactangleStroke" size="medium">
                <span className="px-6">Bid</span>
              </Button>
            </div> */}
            <div>
              <Button
                variant="reactangleStroke"
                size="medium"
                onClick={() => {
                  closeBookModal();
                  openBidModal();
                }}
              >
                <span className="px-6">Bid</span>
              </Button>

              {isBidModalOpen && (
                <Modal
                  isOpen={isBidModalOpen}
                  onClose={closeBidModal}
                  maxWidth="max-w-[300px]"
                  position="absolute mt-2 right-4"
                >
                  <PlaceBid onClose={closeBidModal} />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mb-3" />
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="rectangleFillDisabled" size="medium">
              Load Document
            </Button>
          </div>
          <ButtonList
            buttonData={buttonData}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>

      <div className="md:flex gap-5">
        {/* Left Section */}
        <div className="w-full lg:w-1/4 space-y-4">
          {/* Trip Section */}
          <TripCard
            pickupLocation="Los Angeles, CA"
            pickupDate="Mon, Jun 24"
            dropoffLocation="Chicago, IL"
          />

          {/* Spot Rate Section */}
          <SpotRateCard
            rate="$52,000"
            perMile="-$6.02/ml"
            range="-$299 - $409"
          />

          {/* Equipment Details */}
          <EquipmentDetailsCard details={equipmentDetails} />

          {/* Contact Details */}
          <ContactDetailsCard contactDetails={contactDetails} />
        </div>

        {/* Right Section */}

        {/* Map Section */}
        <div className="w-full lg:w-3/4">
          <div className="rounded-lg mb-5">
            {/* Placeholder for map */}
            <div className="w-full h-[350px]">
              <Map />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {buttonData2.map((button) => {
              console.log(button);
              return (
                <div>
                  <IconButtonCard
                    key={button.id}
                    icon={button.icon}
                    title={button.title}
                    subtitle={button.subtitle}
                    onClick={button.onClick}
                  />
                  <RightDrawer
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                    style="w-1/3"
                  >
                    <button.modal />
                  </RightDrawer>
                </div>
              );
            })}
          </div> */}

          {/* Load Views, Backhauls and Related Truck  */}
          {/* <div className="flex justify-between items-center mb-7"> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 items-center">
            {/* Company  */}
            <Link
              href="#"
              className="flex justify-center px-4 py-2 rounded-lg"
              style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              onClick={() => setCompanyOpen((prev) => !prev)}
            >
              <IoEyeOutline size={24} />
              <div className="ml-2 w-28">
                <p className="text-sm font-medium text-[#454F5B]">Company</p>
                <p className="text-xs font-normal leading-5 text-[#919EAB]">
                  SR Express Logistic
                </p>
              </div>
            </Link>
            <RightDrawer
              isOpen={isCompanyOpen}
              onClose={() => setCompanyOpen(false)}
              style="w-1/3"
            >
              <Company />
            </RightDrawer>

            {/* Backhauls(Possible Loads)  */}
            <Link
              href="#"
              className="flex justify-center px-4 py-2 rounded-lg"
              style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              onClick={() => setBackhaulsOpen((prev) => !prev)}
            >
              <LuUndo2 size={24} />
              <div className="ml-2 w-28">
                <p className="text-sm font-medium text-[#454F5B]">Backhauls</p>
                <p className="text-xs font-normal leading-5 text-[#919EAB]">
                  500 Possible Loads
                </p>
              </div>
            </Link>
            <RightDrawer
              isOpen={isBackhaulsOpen}
              onClose={() => setBackhaulsOpen(false)}
              style="w-1/3"
            >
              <Backhauls />
            </RightDrawer>

            {/* Profit Calculator  */}
            <Link
              href="#"
              className="flex justify-center px-4 py-2 rounded-lg"
              style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              onClick={() => setProfitCalcOpen((prev) => !prev)}
            >
              <FaArrowTrendUp size={24} />
              <div className="ml-2 w-28">
                <p className="text-sm font-medium text-[#454F5B]">
                  Profit Calculator
                </p>
                <p className="text-xs font-normal leading-5 text-[#919EAB]">
                  $1116.26 (55.94/mi)
                </p>
              </div>
            </Link>
            <RightDrawer
              isOpen={isProfitCalcOpen}
              onClose={() => setProfitCalcOpen(false)}
              style="w-1/3"
            >
              <ProfitCalc />
            </RightDrawer>

            {/* Rate Check  */}
            <Link
              href="#"
              className="flex justify-center px-4 py-2 text-nowrap rounded-lg"
              style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              onClick={() => setRateOpen((prev) => !prev)}
            >
              <MdStarBorder size={24} />
              <div className="ml-2 w-28">
                <p className="text-sm font-medium text-[#454F5B]">Rate Check</p>
                <p className="text-xs font-normal leading-5 text-[#919EAB]">
                  $5.51/ml average rate
                </p>
              </div>
            </Link>
            <RightDrawer
              isOpen={isRateOpen}
              onClose={() => setRateOpen(false)}
              style="w-1/3"
            >
              <RateCheck />
            </RightDrawer>

            {/* Credit Rating  */}
            <Link
              href="#"
              className="flex justify-center px-4 py-2 rounded-lg"
              style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
              onClick={() => setCreditOpen((prev) => !prev)}
            >
              <MdOutlineAddCard size={24} />
              <div className="ml-2 w-28">
                <p className="text-sm font-medium text-[#454F5B]">
                  Credit Rating
                </p>
                <p className="text-xs font-normal leading-5 text-[#919EAB]">
                  Score : 92/A
                </p>
              </div>
            </Link>
            <RightDrawer
              isOpen={isCreditOpen}
              onClose={() => setCreditOpen(false)}
              style="w-1/3"
            >
              <CreditCard />
            </RightDrawer>
          </div>

          <div className="mt-8">
            <h1 className="text-[#1c252e] mb-3 text-lg font-semibold uppercase leading-normal">
              Mileage, maps and tolls
            </h1>
            <p className="text-[#454f5b] text-sm font-medium leading-tight">
              Google Maps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
