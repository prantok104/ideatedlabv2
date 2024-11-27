"use client";

import React from "react";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import MyLoadsList from "../my-loads/_components/MyLoadsList";
import { useRouter } from "next/navigation";

const MyBiddingPage = () => {
  const router = useRouter();
  const { filter, setFilter } = useFilter({});
  const {
    data: loads,
    isLoading: loader,
    mutate,
  } = apiClient.useAxiosSWR(apiEndpoint.carrier.myBiddingLoads, {
    params: filter,
  });

  const handleActionMenu = (actionType, row) => {
    const { id } = row;
    switch (actionType) {
      case "Details":
        router.push(`/carrier/loads/search-loads/${id}`);
        break;
      // case "Save":
      //   router.push(`search-load/${id}/save`);
      //   break;
      default:
        console.warn("Unhandled action type:", actionType);
    }
  };

  return (
    <>
      <h1 className="text-[#1c252e] text-2xl font-semibold leading-loose">
        Loads
      </h1>
      <div className="mt-5">
        {/* Pass the rows to your table component */}
        <MyLoadsList rows={loads} handleActionMenu={handleActionMenu} />
      </div>
    </>
  );
};
export default MyBiddingPage;
