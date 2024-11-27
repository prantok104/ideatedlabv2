"use client";

import Image from "next/image";
import topImage from "../../../../../public/asset/truck-overview-icons/driver-card-image-top.png";
import profileImage from "../../../../../public/asset/truck-overview-icons/driver-photo.png";
import driverId from "../../../../../public/asset/truck-overview-icons/driver-id.svg";
import email from "../../../../../public/asset/truck-overview-icons/email-box.svg";
import contact from "../../../../../public/asset/truck-overview-icons/call-contact.svg";
import join from "../../../../../public/asset/truck-overview-icons/join-date.svg";
import lastOnline from "../../../../../public/asset/truck-overview-icons/last-online.svg";
import Button from "@/components/button/Button";

const DriverDetails = () => {
  return (
    <div className="rounded bg-white">
      <div className="relative ">
        <div className="">
          <Image src={topImage} alt="Driver Details" className="w-full" />
        </div>
        <div className="absolute top-1/1 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={profileImage} alt="Driver Details" />
        </div>
      </div>

      <div className="text-center border-b border-b-[#E0E2E7] pb-6 mx-6 mt-20">
        <div className=" text-[#1d1f2c] text-base font-semibold mt-4 leading-normal tracking-tight">
          Linda Blair
        </div>
        <div className="text-[#667085] text-sm font-normal mt-2 leading-tight tracking-tight">
          Driver
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 p-2 bg-[#f0f1f3] rounded-[100px] justify-center items-center gap-2 inline-flex">
            <Image src={driverId} alt="Driver Details" />
          </div>
          <div>
            <div className="text-[#667085] text-sm font-medium  leading-tight tracking-tight mb-1">
              Driver ID
            </div>
            <div className="text-[#1d1f2c] text-sm font-medium  leading-tight tracking-tight">
              ID-011221
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <div className="w-10 h-10 p-2 bg-[#f0f1f3] rounded-[100px] justify-center items-center gap-2 inline-flex">
            <Image src={email} alt="Driver Details" />
          </div>
          <div>
            <div className="text-[#667085] text-sm font-medium  leading-tight tracking-tight mb-1">
              E-mail
            </div>
            <div className="text-[#1d1f2c] text-sm font-medium  leading-tight tracking-tight">
              lindablair@mail.com
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <div className="w-10 h-10 p-2 bg-[#f0f1f3] rounded-[100px] justify-center items-center gap-2 inline-flex">
            <Image src={contact} alt="Driver Details" />
          </div>
          <div>
            <div className="text-[#667085] text-sm font-medium  leading-tight tracking-tight mb-1">
              Phone Number
            </div>
            <div className="text-[#1d1f2c] text-sm font-medium  leading-tight tracking-tight">
              050 414 8778
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <div className="w-10 h-10 p-2 bg-[#f0f1f3] rounded-[100px] justify-center items-center gap-2 inline-flex">
            <Image src={join} alt="Driver Details" />
          </div>
          <div>
            <div className="text-[#667085] text-sm font-medium  leading-tight tracking-tight mb-1">
              Join Date
            </div>
            <div className="text-[#1d1f2c] text-sm font-medium  leading-tight tracking-tight">
              1 Day Ago
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="w-10 h-10 p-2 bg-[#f0f1f3] rounded-[100px] justify-center items-center gap-2 inline-flex">
            <Image src={lastOnline} alt="Driver Details" />
          </div>
          <div>
            <div className="text-[#667085] text-sm font-medium  leading-tight tracking-tight mb-1">
              Last Online
            </div>
            <div className="text-[#1d1f2c] text-sm font-medium  leading-tight tracking-tight">
              1 Day Ago
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-5">
          <div className="w-full">
            <Button variant="base" size="medium">
              Message
            </Button>
          </div>
          <div className="w-full">
            <Button variant="stroke" size="medium">
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
