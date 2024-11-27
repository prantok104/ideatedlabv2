"use client";

import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import Button from "@/components/button/Button";
import { apiEndpoint } from "@/utils/api-endpoint";
import Switch from "react-switch";
import apiClient from "@/lib/axios";
import { useApp } from "@/contexts/AppContext";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
// import Payment from "./_components/Payment";
import Image from "next/image";
import PlanOverview from "../subscriptions/_components/PlanOverview";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import UpgradePlan from "../subscriptions/_components/UpgradePlan";

const page = () => {
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [pricingMode, setPricingMode] = useState("Monthly");
  const { user, isAuth, appConfig, updateAppConfig } = useApp();

  const subscriptionEndPoint = apiEndpoint.subscription.default;

  const { data: plans } = apiClient.useAxiosSWR(subscriptionEndPoint, {
    params: { module: user?.userType },
  });

  //   console.log(plans, user);

  const highlighted = 2;
  const highlighted0 = 1;

  const handlePricingToggle = (checked) => {
    setPricingMode(checked ? "Monthly" : "Yearly");
  };

  const features = [
    "Get a fully designed Website.",
    "Unlimited Support",
    "Get a Unlimited Page",
    "24/7 Support system",
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7 mb-1">
        Subscription
      </h1>
      <hr className="w-full mb-4" />
      <div className="flex items-center justify-between bg-[#E6FAEC] text-[#1c252e] text-base font-semibold font-['Public Sans'] leading-normal px-4 py-3 rounded-md w-1/3 mb-3">
        <div className="flex items-center gap-2">
          <FaRegCircleCheck className="text-[#73C002]" />
          <span className="text-[#454f5b] text-base font-semibold font-['Public Sans'] leading-tight">
            Payment Successful
          </span>
        </div>
        <button>
          <IoCloseOutline
            size={18}
            className="text-[#7A0916] hover:text-[#ff0000]"
          />
        </button>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex justify-center items-center gap-3 ">
          <span
            className={`font-bold ${
              pricingMode === "Monthly" ? "text-[#73C002]" : "text-gray-600"
            }`}
          >
            Monthly Plan
          </span>
          <Switch
            onChange={handlePricingToggle}
            checked={pricingMode === "Monthly"}
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
              pricingMode === "Monthly" ? "text-gray-600" : "text-[#73C002]"
            }`}
          >
            Yearly Plan
          </span>
        </div>
        <div className="flex justify-start flex-wrap gap-10 mt-4">
          {plans?.data?.map((plan, index) => {
            if (plan?.durationType === pricingMode) {
              return (
                <div
                  key={index}
                  style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
                  className={`w-56 px-3 py-5 rounded-xl ${
                    highlighted === index
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

                  <div>
                    {highlighted === index ? (
                      <div className="w-full h-[37px] justify-center items-center inline-flex text-white text-xs font-normal font-['Public Sans'] leading-tight">
                        This is Your Current Plan
                      </div>
                    ) : (
                      <Button
                        variant={`${
                          user?.docStatus === "Active"
                            ? "reactangleStroke"
                            : "rectangleFillDisabled"
                        }`}
                        size="medium"
                        onClick={() => setPaymentOpen((prev) => !prev)}
                      >
                        <span
                          className={`${
                            highlighted === index
                              ? "text-white"
                              : "text-[#73c002]"
                          }  text-xs font-semibold font-['Public Sans'] leading-tight`}
                        >
                          {highlighted0 === index ? "Switch" : "Upgrade"}{" "}
                          {plan.type}
                        </span>
                      </Button>
                    )}
                    <RightDrawer
                      isOpen={isPaymentOpen}
                      onClose={() => setPaymentOpen(false)}
                      style="w-1/3"
                    >
                      <UpgradePlan
                        onClose={() => setPaymentOpen(false)}
                        plan={plan}
                      />
                    </RightDrawer>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <PlanOverview />
    </div>
  );
};

export default page;
