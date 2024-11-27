import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { BILLING_INVOICE } from "@/utils/router";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { mutate } from "swr";

const PlanOverview = ({ plan = "", isPaid}) => {
  const { data: billSummary, mutate } = apiClient.useAxiosSWR(
    apiEndpoint.payments.billSummary
  );

  useEffect(() => {
    if (isPaid) {
      mutate();
    }
  }, [isPaid, mutate]);
  const {
    balance: {
      expiredAt,
      durationType,
      totalLoadPost,
      totalQuota,
      totalTruckPost,
      totalUsedLoadPost,
      totalUsedQuota,
      totalUsedTruckPost,
    } = {},
    bill: { amount, nextPayment, subscription } = {},
  } = billSummary?.data ?? {};

  

  return (
    <div className="mx-auto mt-9">
      <h2 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7 mb-3">
        Plan Overview
      </h2>
      <hr className="w-full mb-4" />
      <div className="flex gap-4 mb-4">
        {/* Current Monthly Bill */}
        <div
          className="bg-white rounded-xl w-full p-4"
          style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <h3 className="text-[#637381] text-xs font-semibold font-['Public Sans'] leading-tight mb-1">
            Current {durationType} Bill
          </h3>
          <p className="text-[#454f5b] text-2xl font-semibold font-['Public Sans'] leading-loose">
            ${Number(amount).toFixed(2)}
          </p>
        </div>

        {/* Next Payment Date */}
        <div
          className="bg-white rounded-xl w-full p-4"
          style={{ boxShadow: "0px 5px 40px rgba(0, 0, 0, 0.05)" }}
        >
          <h3 className="text-[#637381] text-xs font-semibold font-['Public Sans'] leading-tight mb-1">
            Next Payment Date
          </h3>
          <p className="text-[#454f5b] text-2xl font-semibold font-['Public Sans'] leading-loose">
            {nextPayment ? dayjs(nextPayment).format("DD MMM, YYYY") : "---"}
          </p>
        </div>

        {/* Payment Information */}
        <div
          className="bg-white rounded-xl w-full p-4"
          style={{ boxShadow: "0px 5px 40px rgba(0, 0, 0, 0.05)" }}
        >
          <h3 className="text-[#637381] text-xs font-semibold font-['Public Sans'] leading-tight">
            Payment Information
          </h3>
          <Link
            href={BILLING_INVOICE}
            className="text-[#73c002] text-2xl font-semibold font-['Public Sans'] underline leading-loose"
          >
            View Payment History
          </Link>
        </div>
      </div>

      {/* Current Plan Information */}
      <div className="bg-white">
        <h3 className="text-[#454f5b] text-xl font-semibold font-['Public Sans'] leading-7">
          Current Plan: {plan}
        </h3>
        <hr className="w-full my-3" />
        <table className="w-full">
          <tbody>
            <tr className="border border-[#e0e0e0]">
              <td className="p-2 text-[#454f5b] border border-[#e0e0e0] text-base font-medium font-['Public Sans'] leading-normal">
                Total Laod Post
              </td>
              <td className="p-2 w-[150px] text-[#454f5b] text-base font-medium font-['Public Sans'] leading-normal">
                {Number(totalLoadPost) - Number(totalUsedLoadPost)} /{" "}
                {totalLoadPost}
              </td>
            </tr>
            <tr className="border border-[#e0e0e0]">
              <td className="p-2 text-[#454f5b] border border-[#e0e0e0] text-base font-medium font-['Public Sans'] leading-normal">
                Total Quota
              </td>
              <td className="p-2 w-[150px] text-[#454f5b] text-base font-medium font-['Public Sans'] leading-normal">
                {Number(totalQuota) - Number(totalUsedQuota)} / {totalQuota}
              </td>
            </tr>
            <tr className="border border-[#e0e0e0]">
              <td className="p-2 text-[#454f5b] border border-[#e0e0e0] text-base font-medium font-['Public Sans'] leading-normal">
                Total truck Post
              </td>
              <td className="p-2 w-[150px] text-[#454f5b] text-base font-medium font-['Public Sans'] leading-normal">
                {Number(totalTruckPost) - Number(totalUsedTruckPost)} /{" "}
                {totalTruckPost}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanOverview;
