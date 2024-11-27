"use client";

import Button from "@/components/button/Button";
import { dashboardData } from "@/utils/home-static-data";
import Image from "next/image";
import Link from "next/link";
import PostedLoads from "./_components/PostedLoads";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BROWSE_DASHBOARD, MODULE_DASHBOARD } from "@/utils/permission";

const Dashboard = () => {
  const { cardData, secondCardData, shipmentCardData } = dashboardData;
  return (
    <section>
      {/* 1st card here with stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4">
        <div className="col-span-8">
          <div className="dashboard-title-card ps-[38px] pt-[49px]">
            <div className="text-[#dfe3e8] text-base font-semibold font-public-sans leading-normal ">
              {cardData.name}
            </div>

            <h1 className="text-gray-50 text-3xl font-semibold font-public-sans leading-loose pb-16">
              {cardData.title}
            </h1>

            <div className="max-w-32 mb-14">
              <Button variant="base" size="medium">
                {cardData.buttonText}
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="dashboard-title-card-two ps-[38px] pe-20 pt-[20px]">
            <h1 className="text-gray-50 text-2xl font-semibold font-public-sans leading-loose pb-3">
              {secondCardData.title}
            </h1>

            <p className="text-[#919eab] text-sm font-normal font-public-sans leading-tight pb-20">
              {secondCardData.subText}
            </p>

            <div className="max-w-32 mb-14">
              <Button variant="base" size="medium">
                {secondCardData.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* counting reports data */}
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-2">
        {shipmentCardData &&
          shipmentCardData.map((item, index) => (
            <div key={index} className="dashboard-shipment-card ">
              <div className="px-6 py-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={34}
                  height={34}
                />

                <h2 className="text-[#1c252e] text-3xl font-semibold font-public-sans leading-10 pt-[9px]">
                  {item.itemsCount}
                </h2>

                <div className="flex justify-between">
                  <p className="text-[#454f5b] text-base font-medium font-['Public Sans'] leading-normal">
                    {item.title}
                  </p>

                  <div>
                    <Link
                      href={item.link}
                      className="text-right text-[#454f5b] text-xs font-semibold font-public-sans underline leading-tight"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* 3rd lost posted load */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 mt-[36px]">
        <div>
          <div className="h-7 justify-between items-center flex">
            <div className="text-[#454f5b] text-xl font-semibold font-public-sans leading-7">
              Last Posted Load
            </div>
            <Link
              href="#"
              className="w-16 text-right text-[#637381] text-xs font-semibold font-public-sans underline leading-tight"
            >
              See All
            </Link>
          </div>

          {/* cards */}
          <PostedLoads />

        </div>
        <div>
          <div className="h-7 justify-between items-center flex">
            <div className="text-[#454f5b] text-xl font-semibold font-public-sans leading-7">
              Recently Posted
            </div>
            <Link
              href="#"
              className="w-16 text-right text-[#637381] text-xs font-semibold font-public-sans underline leading-tight"
            >
              See All
            </Link>
          </div>

          {/* cards */}


        </div>
      </div>
    </section>
  );
};

export default WithAuthorization( Dashboard, [
  MODULE_DASHBOARD, BROWSE_DASHBOARD
]);
