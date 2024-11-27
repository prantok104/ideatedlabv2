"use client";

import Button from "@/components/button/Button";
import React, { useState } from "react";
import Switch from "react-switch";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from Next.js
import { buildRouterUrl } from "@/utils/helper";
import { REGISTER_ROUTE } from "@/utils/router";
import {
  brokerPlans,
  carrierPlans,
  shipperPlans,
} from "@/utils/home-static-data";
import greenCheck from "../../../../public/asset/website-images/check-circle-green.svg";
import whiteCheck from "../../../../public/asset/website-images/check-circle-white.svg";
import redTimes from "../../../../public/asset/website-images/times-circle-red.svg";
import whiteTimes from "../../../../public/asset/website-images/times-circle-white.svg";
import Image from "next/image";
import apiClient from "@/lib/axios";
import {
  DOC_STATUS_ACTIVE,
  USER_TYPE_BROKER,
  USER_TYPE_CARRIER,
  USER_TYPE_SHIPPER,
} from "@/utils/static-const";
import { useApp } from "@/contexts/AppContext";

const tabs = [
  { label: USER_TYPE_CARRIER },
  { label: USER_TYPE_SHIPPER },
  { label: USER_TYPE_BROKER },
];

const PricingCards = () => {
  const { user } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(USER_TYPE_CARRIER);
  const [pricingMode, setPricingMode] = useState("Monthly");

  const { data: packageResponse } = apiClient.useAxiosSWR("/packages");
  console.log(packageResponse);

  // Ensure packageResponse and packageResponse.data exist
  if (!packageResponse || !packageResponse.data) return null;

  const packages = packageResponse.data;

  console.log(packages);

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const handlePricingToggle = (checked) => {
    setPricingMode(checked ? "Monthly" : "Yearly");
  };

  return (
    <div className="custom-pricing-cards">
      {/* Pricing Toggle */}
      <div className="flex justify-center items-center gap-3 mb-4 mt-10">
        <span
          className={
            pricingMode === "Monthly" ? "text-[#FFF]" : "text-gray-600"
          }
        >
          Monthly Plan
        </span>
        <Switch
          onChange={handlePricingToggle}
          checked={pricingMode === "Monthly"}
          offColor="#ccc"
          onColor="#73C002"
          handleDiameter={28}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={48}
        />
        <span
          className={pricingMode === "Yearly" ? "text-[#FFF]" : "text-gray-600"}
        >
          Yearly Plan
        </span>
      </div>

      {/* Tabs Navigation */}
      <div className="custom-tabs  mx-auto mb-4 container max-w-[460px]">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`custom-tab ${
              activeTab === tab.label ? "custom-tab-active" : ""
            }`}
            onClick={() => handleTabChange(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="container px-4 mx-auto max-w-[1260px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(packages) &&
            packages?.length > 0 &&
            packages
              ?.filter(
                (item) =>
                  item?.module == activeTab &&
                  item?.durationType == pricingMode &&
                  item?.docStatus === DOC_STATUS_ACTIVE
              )
              ?.map((plan, index) => (
                <div
                  className={` ${
                    user?.selectedPackage === plan?.id ? "active-plan" : ""
                  } `}
                  key={`${index}plan`}
                >
                  <div className={`mx-2 custom-card`}>
                    <h3 className="text-[#f0f0f0] text-2xl font-semibold pb-3">
                      {plan?.type}
                    </h3>
                    <p className="text-[#f0f0f0] text-xs font-normal">
                      {plan?.description}
                    </p>
                    <p className="text-[#f0f0f0] text-4xl font-medium leading-[50px]">
                      {plan?.currency} {plan?.fee} /{" "}
                      <span className="text-sm">{plan?.durationType}</span>
                    </p>

                    {/* <p className="text-[#f0f0f0] text-4xl font-medium leading-[50px]">
                    <span className="text-[#f0f0f0] text-xs font-normal leading-tight">
                      sdf
                    </span>
                  </p>
                  <div className="border-pricing my-3">sdf</div> */}

                    {plan.content && (
                      <ul className="custom-card-facilities list-disc space-y-2 mt-2">
                        {plan.content.map((facility, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm font-normal leading-[21px]"
                          >
                            {facility?.value ? (
                              <Image src={greenCheck} alt="svg" width={18} />
                            ) : (
                              <Image src={whiteCheck} alt="svg" width={18} />
                            )}
                            {facility?.title}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5">
                      <Button
                        variant="base-button"
                        onClick={() => {
                          router.push(
                            buildRouterUrl(REGISTER_ROUTE, {
                              query: {
                                package: plan?.id,
                                module: activeTab,
                              },
                            })
                          );
                        }}
                      >
                        Select Plan
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* <div className="container px-4 mx-auto max-w-[1260px]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {cardData[activeTab].map((card) => (
            <Link
              key={card.id} 
              href={buildRouterUrl(REGISTER_ROUTE, {
                query: { package: card?.id, module: card.module },
              })}
            >
              <div className="mx-2 custom-card cursor-pointer">
                <h3 className="text-[#f0f0f0] text-2xl font-semibold pb-3">
                  {card.type} Plan
                </h3>
                <p className="text-[#f0f0f0] text-4xl font-medium leading-[50px]">
                  {card.fee} {card.currency}
                  <span className="text-[#f0f0f0] text-xs font-normal leading-tight">
                    {pricingMode === "yearly" ? "per year" : "per month"}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PricingCards;
