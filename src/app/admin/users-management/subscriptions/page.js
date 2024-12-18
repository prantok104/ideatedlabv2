"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCircleCheck } from "react-icons/fa6";
import Button from "@/components/button/Button";
import { apiEndpoint } from "@/utils/api-endpoint";
import Switch from "react-switch";
import apiClient from "@/lib/axios";
import { useApp } from "@/contexts/AppContext";
import { MEMBERS_STATUS } from "@/utils/static-const";

const subscriptions = () => {
  const [pricingMode, setPricingMode] = useState("Yearly");
  const { user, isAuth, appConfig, updateAppConfig } = useApp();
  const router = useRouter();

  const subscriptionEndPoint = user?.userType
    ? `${apiEndpoint.packages.default}?module=${user?.userType}`
    : null;

  const { data: plans } = apiClient.useAxiosSWR(subscriptionEndPoint);
  const packages = plans?.data ?? [];

  const highlighted = 0;

  const handlePricingToggle = (checked) => {
    setPricingMode(checked ? "Yearly" : "Monthly");
  };

  const features = [
    "Get a fully designed Website.",
    "Unlimited Support",
    "Get a Unlimited Page",
    "24/7 Support system",
  ];

  // Checked Mode
  useEffect(() => {
    if (
      Array.isArray(packages) &&
      packages?.length > 0 &&
      user?.selectedPackage
    ) {
      const durationType = packages?.find(
        (item) => item?.id === user?.selectedPackage
      )?.durationType;
      if (durationType) {
        setPricingMode(durationType);
      }
    }
  }, [user, packages]);

  return (
    <div className="min-h-screen">
      {user?.memberStatus === MEMBERS_STATUS?.UNVERIFIED && (
        <div className="w-[755px] h-11 p-3 bg-blue-50 flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10ZM11 6C11 6.26522 10.8946 6.51957 10.7071 6.70711C10.5196 6.89464 10.2652 7 10 7C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6ZM9 9C8.80109 9 8.61032 9.07902 8.46967 9.21967C8.32902 9.36032 8.25 9.55109 8.25 9.75C8.25 9.94891 8.32902 10.1397 8.46967 10.2803C8.61032 10.421 8.80109 10.5 9 10.5H9.253C9.29041 10.5 9.32734 10.5084 9.36106 10.5246C9.39479 10.5408 9.42445 10.5643 9.44787 10.5935C9.47128 10.6227 9.48785 10.6567 9.49636 10.6932C9.50486 10.7296 9.50508 10.7675 9.497 10.804L9.038 12.87C8.98108 13.1259 8.98237 13.3913 9.04179 13.6466C9.10121 13.902 9.21723 14.1407 9.38129 14.3452C9.54535 14.5496 9.75325 14.7146 9.98963 14.828C10.226 14.9413 10.4848 15.0001 10.747 15H11C11.1989 15 11.3897 14.921 11.5303 14.7803C11.671 14.6397 11.75 14.4489 11.75 14.25C11.75 14.0511 11.671 13.8603 11.5303 13.7197C11.3897 13.579 11.1989 13.5 11 13.5H10.747C10.7096 13.5 10.6727 13.4916 10.6389 13.4754C10.6052 13.4592 10.5755 13.4357 10.5521 13.4065C10.5287 13.3773 10.5121 13.3433 10.5036 13.3068C10.4951 13.2704 10.4949 13.2325 10.503 13.196L10.962 11.13C11.0189 10.8741 11.0176 10.6087 10.9582 10.3534C10.8988 10.098 10.7828 9.8593 10.6187 9.65483C10.4547 9.45036 10.2468 9.28536 10.0104 9.17201C9.77398 9.05867 9.51515 8.99989 9.253 9H9Z"
              fill="#60A5FA"
            />
          </svg>
          <p className="text-blue-700 text-xs font-normal font-['Public Sans'] leading-tight pl-4">
            Thank your for your registration. Your account will be active within
            24 hours
          </p>
        </div>
      )}
      <h1 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7 mb-1">
        Subscription
      </h1>
      <hr className="w-full mb-4" />
      <div className="flex flex-col items-start">
        {packages?.length > 0 && (
          <div className="flex justify-center items-center gap-3 ">
            <span
              className={`font-bold ${
                pricingMode === "Yearly" ? "text-[#73C002]" : "text-gray-600"
              }`}
            >
              Yearly Plan
            </span>
            <Switch
              onChange={handlePricingToggle}
              checked={pricingMode === "Yearly"}
              onColor="#73C002"
              offColor="#73C002"
              offHandleColor="#d5dbda"
              onHandleColor="#d5dbda"
              handleDiameter={28}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
            />
            <span
              className={`font-bold ${
                pricingMode === "Yearly" ? "text-gray-600" : "text-[#73C002]"
              }`}
            >
              Monthly Plan
            </span>
          </div>
        )}
        <div className="flex justify-start flex-wrap gap-10 mt-4">
          {packages
            ?.filter((item) => item?.durationType === pricingMode)
            ?.map((plan, index) => {
              return (
                <div
                  key={index}
                  style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
                  className={`w-56 px-3 py-5 rounded-xl ${
                    plan?.id === user?.selectedPackage
                      ? "bg-[#73C002] text-white"
                      : "bg-white text-[#1c252e]"
                  }`}
                >
                  <h2 className="text-sm font-normal font-['Public Sans'] leading-tight">
                    {plan.type} plan
                  </h2>
                  <p className="text-[10px] font-normal font-['Public Sans'] leading-tight mt-3">
                    Starting from
                  </p>
                  <p>
                    <span className="text-5xl font-semibold font-['Public Sans'] leading-[64px]">
                      {plan.fee}
                    </span>
                    <span className="text-base font-semibold font-['Public Sans'] leading-normal">
                      /
                    </span>
                    <span className="text-xs font-normal font-['Public Sans'] leading-tight">
                      {plan.durationType}
                    </span>
                  </p>
                  <ul className="mb-6 mt-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <span
                          className={`mr-1 ${
                            highlighted === index
                              ? "text-white"
                              : "text-[#73C002]"
                          }`}
                        >
                          <FaRegCircleCheck size={18} />
                        </span>
                        <span
                          className={`${
                            highlighted === index
                              ? "text-white"
                              : "text-[#454f5b]"
                          } text-xs font-normal font-['Public Sans'] leading-tight`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mx-5">
                    {plan?.id !== user?.selectedPackage &&
                      user?.payment == "completed" && (
                        <Button
                          variant={
                            user?.memberStatus === MEMBERS_STATUS?.UNVERIFIED
                              ? `rectangleFillDisabled`
                              : `rectangleFill`
                          }
                          size="medium"
                        >
                          <span className="text-gray-50 text-xs font-semibold font-['Public Sans'] leading-tight">
                            Pay Now
                          </span>
                        </Button>
                      )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default subscriptions;
