"use client";

import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import Button from "@/components/button/Button";
import { apiEndpoint } from "@/utils/api-endpoint";
import Switch from "react-switch";
import apiClient from "@/lib/axios";
import { useApp } from "@/contexts/AppContext";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import Payment from "./Payment";
import Image from "next/image";
import { MEMBERS_STATUS, PACKAGE_FEATURES } from "@/utils/static-const";
import PlanOverview from "./PlanOverview";
import { IoCloseOutline } from "react-icons/io5";
import UpgradePlan from "./UpgradePlan";
import { FaTimes } from "react-icons/fa";
import PackageSkeleton from "./PackageSkeleton";

const UserSubscription = () => {
  const [isPaid, setPaid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [pricingMode, setPricingMode] = useState("Monthly");
  const [selectedPlan, setSelectetedPlan] = useState({});
  const [isSelectedPackage, setIsSelectedPackage] = useState(null);

  // Webhook er karone user dat update hoite aktu time lage ai jonno bill theke subscription id niya selected dekhano hoise
  // Retrieve user information from the app context
  const { user, subscription, setAuthUpdate } = useApp();
  const {
    data: billSummary,
    isLoading: billLoading,
    mutate: billMute,
  } = apiClient.useAxiosSWR(apiEndpoint.payments.billSummary);

  // Define the subscription endpoint
  const subscriptionEndPoint = apiEndpoint.subscription.default;

  // Fetch plans using SWR
  const {
    data: plans,
    isLoading,
    mutate,
  } = apiClient.useAxiosSWR(subscriptionEndPoint, {
    params: { module: user?.userType },
  });
  const packages = plans?.data ?? [];

  useEffect(() => {
    setAuthUpdate(!isPaid);
    billMute();
    mutate();
  }, [isPaid, user, mutate, setAuthUpdate]);

  // Highlight index of the selected package (could be user-provided or hardcoded)
  const highlighted = 2;
  const highlighted0 = 1;

  // Handle the toggle between Monthly and Yearly pricing
  const handlePricingToggle = (checked) => {
    setPricingMode(checked ? "Monthly" : "Yearly");
  };

  // Update the pricing mode based on the user's selected package on component mount
  useEffect(() => {
    if (
      (Array.isArray(packages) && packages?.length > 0) ||
      billSummary?.data?.bill?.subscription ||
      user?.selectedPackage
    ) {
      const matchedId = billSummary?.data?.bill?.subscription
          ? billSummary?.data?.bill?.subscription
          : user?.selectedPackage;
      const selectedPlanType = packages?.find((item) => item?.id == matchedId);

      setPricingMode(selectedPlanType?.durationType ?? "Monthly");
    }
  }, [user, billSummary?.data?.bill?.subscription, packages]);

  // ! Hanlde Payment drawer open
  const handlePaymentDrawerOpen = (user, plan) => {
    if (user?.memberStatus === MEMBERS_STATUS?.UNVERIFIED) {
      return true;
    } else {
      setSelectetedPlan(plan);
      setPaid(false);
      setPaymentOpen((prev) => !prev);
    }
  };
  // ! Hanlde Payment drawer open
  const handleUpgradePaymentDrawerOpen = (user, plan) => {
    if (user?.memberStatus === MEMBERS_STATUS?.UNVERIFIED) {
      return true;
    } else {
      setSelectetedPlan(plan);
      setPaid(false);
      setPaymentOpen((prev) => !prev);
    }
  };

  useEffect(
    () => {
      if (billSummary?.data?.bill?.subscription) {
        setIsSelectedPackage(billSummary?.data?.bill?.subscription);
      }
     
    },
    billSummary?.data?.bill?.subscription,
    isPaid
  );

  return (
    <div className="min-h-screen">
      {/* Display warning if the user account is unverified */}
      {user?.memberStatus === MEMBERS_STATUS?.UNVERIFIED && (
        <div className="w-[755px] h-11 p-4 bg-yellow-50 border-l-4 border-yellow-400 flex items-center mb-4">
          <Image
            src="/asset/warning.svg"
            alt="warning message"
            width={20}
            height={20}
          />
          <p className="text-yellow-700 text-sm font-normal font-['Public Sans'] leading-tight pl-3">
            Your account has not been verified yet. Your account will be
            verified within 24 hours.
          </p>
        </div>
      )}

      {/* Page heading */}
      <h1 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7 mb-1">
        Subscription
      </h1>
      <hr className="w-full mb-4" />

      {/* Payment success message */}
      {(isPaid || isVisible) && (
        <div className="flex items-center justify-between bg-[#E6FAEC] text-[#1c252e] text-base font-semibold font-['Public Sans'] leading-normal px-4 py-3 rounded-md w-1/3 mb-3">
          <div className="flex items-center gap-2">
            <FaRegCircleCheck className="text-[#73C002]" />
            <span className="text-[#454f5b] text-base font-semibold font-['Public Sans'] leading-tight">
              Payment Successful
            </span>
          </div>
          <button
            onClick={() => {
              setPaid(false);
              setIsVisible(false);
            }}
          >
            <IoCloseOutline
              size={18}
              className="text-[#7A0916] hover:text-[#ff0000]"
            />
          </button>
        </div>
      )}

      {/* Pricing switch (Monthly/Yearly) */}
      <div className="flex flex-col items-start">
        {isLoading || billLoading || Object.keys(user)?.length < 1 ? (
          <div className="flex flex-row gap-3 justify-between">
            {[...Array(6)].map((_, index) => (
              <PackageSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
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

            {/* Render subscription plans based on pricing mode */}
            <div className="flex justify-start flex-wrap gap-10 mt-4">
              {plans?.data?.map((plan, index) => {
                if (plan?.durationType === pricingMode) {
                  const isSelected =
                    isSelectedPackage === plan?.id
                      ? true // If the subscription matches, select this plan
                      : subscription?.subscription == null &&
                        user?.selectedPackage === plan?.id;
                  return (
                    <div
                      key={index}
                      style={{
                        boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)",
                      }}
                      className={`w-56 px-3 py-5 rounded-xl ${
                        isSelected
                          ? "bg-[#73C002] text-white"
                          : "bg-white text-[#1c252e]"
                      }`}
                    >
                      {/* Plan type */}
                      <h2 className="text-sm font-normal font-['Public Sans'] leading-tight">
                        {plan.type} plan
                      </h2>
                      <p className="text-[10px] font-normal font-['Public Sans'] leading-tight mt-3">
                        Starting from
                      </p>
                      {/* Plan price */}
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
                      {/* Package features */}
                      <ul className="mb-6 mt-3">
                        {plan?.content?.map((con, i) => (
                          <li key={i} className="flex items-center mb-2">
                            <span
                              className={`mr-1 ${
                                isSelected
                                  ? "text-white"
                                  : con?.value
                                  ? "text-[#73C002]"
                                  : "text-red-500"
                              }`}
                            >
                              {con?.value ? (
                                <FaRegCircleCheck size={18} />
                              ) : (
                                <FaTimes size={18} />
                              )}
                            </span>
                            <span
                              className={`${
                                isSelected ? "text-white" : "text-[#454f5b]"
                              } text-xs font-normal font-['Public Sans'] leading-tight`}
                            >
                              {con?.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* Payment button for upgrading or getting started */}
                      {isPaid || isSelectedPackage ? (
                        <div>
                          {isSelectedPackage === plan?.id ? (
                            <div className="w-full h-[37px] justify-center items-center inline-flex text-white text-xs font-normal font-['Public Sans'] leading-tight">
                              This is Your Current Plan
                            </div>
                          ) : (
                            user?.userType != "Admin" && (
                              <Button
                                variant={`${
                                  user?.docStatus === "Active"
                                    ? "reactangleStroke"
                                    : "rectangleFillDisabled"
                                }`}
                                size="medium"
                                onClick={() =>
                                  handleUpgradePaymentDrawerOpen(user, plan)
                                }
                              >
                                <span
                                  className={`${
                                    isSelectedPackage === plan?.id
                                      ? "text-white"
                                      : "text-[#73c002]"
                                  }  text-xs font-semibold font-['Public Sans'] leading-tight`}
                                >
                                  {plans?.data?.find(
                                    (_i) => _i?.id === isSelectedPackage
                                  )?.fee >= plan?.fee
                                    ? "Switch"
                                    : "Upgrade"}{" "}
                                  {plan.type}
                                </span>
                              </Button>
                            )
                          )}

                          {/* RightDrawer for plan upgrade */}
                          <RightDrawer
                            isOpen={isPaymentOpen}
                            onClose={() => setPaymentOpen(false)}
                            style="w-1/3"
                          >
                            <UpgradePlan
                              onClose={() => setPaymentOpen(false)}
                              plan={selectedPlan}
                              setPaid={setPaid}
                            />
                          </RightDrawer>
                        </div>
                      ) : (
                        <div className="mx-5">
                          {user?.selectedPackage === plan?.id ||
                          subscription?.subscription === plan?.id
                            ? user?.userType != "Admin" && (
                                <button
                                  className={`w-[160px] h-[37px] px-3 py-2 md:px-5 md:py-2.5 md:text-sm rounded-md justify-center items-center inline-flex ${
                                    user?.memberStatus ===
                                    MEMBERS_STATUS?.UNVERIFIED
                                      ? "bg-[#919eab] text-[#f1f9e6]"
                                      : "bg-gray-50 text-[#73c002] hover:bg-green-800"
                                  } text-xs font-normal font-['Public Sans'] leading-tight`}
                                  onClick={() =>
                                    handlePaymentDrawerOpen(user, plan)
                                  }
                                >
                                  Get Started
                                </button>
                              )
                            : user?.userType != "Admin" && (
                                <Button
                                  variant={`${
                                    user?.memberStatus ===
                                    MEMBERS_STATUS?.UNVERIFIED
                                      ? "rectangleFillDisabled"
                                      : "reactangleStroke"
                                  }`}
                                  size="medium"
                                  onClick={() =>
                                    handlePaymentDrawerOpen(user, plan)
                                  }
                                >
                                  Get Started
                                </Button>
                              )}

                          {/* RightDrawer for payment */}
                          <RightDrawer
                            isOpen={isPaymentOpen}
                            onClose={() => setPaymentOpen(false)}
                            style="w-1/3"
                          >
                            <Payment
                              onClose={() => setPaymentOpen(false)}
                              plan={selectedPlan}
                              setPaid={setPaid}
                            />
                          </RightDrawer>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </>
        )}
      </div>

      {/* Display plan overview if the payment is successful */}
      {subscription?.subscription && user?.userType != "Admin" && (
        <PlanOverview
          plan={
            plans?.data?.find((item) => item?.id === subscription?.subscription)
              ?.type
          }
          isPaid={isPaid}
        />
      )}
    </div>
  );
};

export default UserSubscription;
