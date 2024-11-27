"use client";

import Image from "next/image";
import { useState } from "react";
import CompanyLogo from "../../../../../../public/asset/avatar.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import CompanyInfo from "./CompanyInfo";
import dayjs from "dayjs";

const BookingDetails = ({details, finalRate}) => {
  const [deliveryCode, setDeliveryCode] = useState(false);
  const [showCancelCode, setShowCancelCode] = useState(false);
  const [companyInfoOpen, setCompanyInfoOpen] = useState(false);

  return (
    <div className=" py-4 pl-4 pr-10">
      <h2 className="text-[#141a21] mb-2 text-sm font-semibold font-['Inter'] uppercase leading-tight">
        Booking details
      </h2>
      <div className="flex flex-col gap-1 items-start mb-2">
        <Image
          src={CompanyLogo}
          alt="Logo"
          className="w-12 h-12 rounded-full"
        />
        <h1
          className="text-[#73c002] text-lg font-medium font-['Public Sans'] underline leading-normal cursor-pointer"
          onClick={() => setCompanyInfoOpen((prev) => !prev)}
        >
          {details?.company?.title}
        </h1>
        <RightDrawer
          isOpen={companyInfoOpen}
          onClose={() => setCompanyInfoOpen(false)}
          style="w-1/4"
        >
          <CompanyInfo companyInfoOpen={companyInfoOpen} />
        </RightDrawer>
      </div>

      <div className="mb-3">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight tracking-tight mb-1">
          Booking Date & Time
        </p>
        <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
          {details?.bookedAt && dayjs(details?.bookedAt).format('DD MMM, YYYY hh:mm:ss A')}
        </p>
      </div>

      <div className="mb-2">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight tracking-tight">
          Final Rate
        </p>
        <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
          {finalRate}
        </p>
      </div>

      <div className="mb-2">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight tracking-tight mb-1">
          Trailer Number
        </p>
        <p className="text-[#73c002] text-sm font-semibold font-['Public Sans'] underline leading-tight">
          45146652445
        </p>
      </div>

      <div className="mb-3">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight tracking-tight mt-1">
          Delivery Code
        </p>
        <p className="text-[#637381] text-[10px] font-normal font-['Inter'] tracking-tight mb-2">
          Don't share the code until delivery complete
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
            {deliveryCode ? "12345678" : "********"}
          </p>
          <button
            onClick={() => setDeliveryCode((prev) => !prev)}
            className="ml-2 text-[#637381]"
          >
            {deliveryCode ? (
              <IoEyeOffOutline size={16} />
            ) : (
              <IoEyeOutline size={16} />
            )}
          </button>
        </div>
      </div>

      <div>
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight tracking-tight mt-1">
          Cancelation Code
        </p>
        <p className="text-[#637381] text-[10px] font-normal font-['Inter'] tracking-tight mb-2">
          Share if you agree with carrier cancelation request.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
            {showCancelCode ? "451466524445" : "********"}
          </p>
          <button
            onClick={() => setShowCancelCode((prev) => !prev)}
            className="ml-2 text-[#637381]"
          >
            {showCancelCode ? (
              <IoEyeOffOutline size={16} />
            ) : (
              <IoEyeOutline size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
