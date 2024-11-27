"use client";

import React, { useEffect, useState } from "react";
import IMG from "../../../../../../../public/asset/avatar.png";
import Image from "next/image";
import { companyInfo } from "./TemporaryData";
import { FaStar } from "react-icons/fa6";
import StarRating from "@/components/table/tool/StarRating";
import { BiChevronDown } from "react-icons/bi";

export default function CompanyInfo({ selectedRow, companyInfoOpen }) {
  const [accordion, setAccordion] = useState(false);

  useEffect(() => {
    if (!companyInfoOpen) {
      setAccordion(false);
    }
  }, [companyInfoOpen]);

  return (
    <div>
      <h1 className="mt-12 mb-4 text-[#1c252e] text-xl font-medium font-['Inter'] leading-7">
        Company Information
      </h1>
      <div>
        <Image
          src={IMG}
          alt="Avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
        <p className="text-[#454f5b] mt-1 text-lg font-semibold font-['Public Sans'] leading-normal">
          Nash-Abbott
        </p>
      </div>
      <div className="mt-6 space-y-2 ">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
          Member since {companyInfo.registration}
        </p>
        <div className="flex items-start justify-between text-[#454f5b] text-sm font-normal font-['Inter'] leading-tight">
          <p>Trip Completed</p>
          <p>{companyInfo.tripCompleted}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#454f5b] text-sm font-normal font-['Inter'] leading-tight">
            Timely Pickup
          </p>
          <div className="flex items-center justify-between text-[#667085] text-sm font-semibold font-['Public Sans'] leading-tight">
            <span>
              <FaStar size={16} className="text-yellow-500" />
            </span>{" "}
            <span>{companyInfo.timelyPick}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#454f5b] text-sm font-normal font-['Inter'] leading-tight">
            Timely Deliver
          </p>
          <div className="flex items-center justify-between text-[#667085] text-sm font-semibold font-['Public Sans'] leading-tight">
            <span>
              <FaStar size={16} className="text-yellow-500" />
            </span>{" "}
            <span>{companyInfo.timelyDeliver}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#454f5b] text-sm font-normal font-['Inter'] leading-tight">
            Rating
          </p>
          <div className="flex items-center justify-between text-[#667085] text-sm font-semibold font-['Public Sans'] leading-tight">
            <span>
              <FaStar size={16} className="text-yellow-500" />
            </span>{" "}
            <span>{companyInfo.rating}</span>
          </div>
        </div>
        <div>
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => setAccordion((prev) => !prev)}
          >
            <h2 className="text-[#454f5b] text-sm font-medium font-['Inter'] leading-tight">
              Review
            </h2>
            <BiChevronDown
              size={24}
              className={`text-[#454f5b] transform transition-transform duration-300 ${
                accordion ? "" : "rotate-180"
              }`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              accordion ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {Object.entries(companyInfo.reviews).map(([key, review]) => (
              <div key={key} className="bg-[#f4f6f8] rounded-lg mb-2 p-4">
                <h2 className="text-[#1c252e] mb-1 text-sm font-medium font-['Public Sans'] leading-tight">
                  {review.customerName}
                </h2>
                <div className="text-[#667085] mb-2 text-sm font-medium font-['Public Sans'] leading-tight tracking-tight inline-flex items-center">
                  <StarRating starSize={16} rating={review.rating} />
                  <p className="ml-2">{review.rating}</p>
                </div>
                <p className="text-[#454f5b] text-xs font-normal font-['Inter'] leading-none tracking-tight">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
