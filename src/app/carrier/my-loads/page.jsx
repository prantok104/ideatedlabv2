"use client";

import React, { useEffect, useState } from "react";
import Cards from "./_components/Cards";
import MyLoadsList from "./_components/MyLoadsList";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import { useSearchParams, useRouter } from "next/navigation";
import { CARRIER_MY_LOADS } from "@/utils/router";

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState("All");
  const [activeDataSet, setActiveDataSet] = useState([]);
  const [title, setTitle] = useState("All");
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("loadStatus") || "All";
  const { filter, setFilter } = useFilter({ loadStatus: typeParam });

  const handleOnClick = async (id, title) => {
    setActive(id);
    setTitle(title);
    router.push(`${CARRIER_MY_LOADS}?loadStatus=${id}`);
  };

  const {
    data: loads,
    isLoading: loader,
    mutate,
  } = apiClient.useAxiosSWR(apiEndpoint.carrier.myBookedLoads, {
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

  useEffect(() => {
    const newType = typeParam;
    setActive(newType);
    console.log(active);

    setFilter((prev) => ({
      ...prev,
      loadStatus: active,
    }));
  }, [typeParam]);

  return (
    <>
      {active}
      <h1 className="text-[#1c252e] text-2xl font-semibold leading-loose">
        Loads Overview
      </h1>

      <div>
        {/* card component is here */}
        <Cards active={active} onClick={handleOnClick} />
      </div>

      <div className="mt-5">
        <h1 className="text-[#1c252e] text-2xl font-semibold leading-loose">
          {title}
        </h1>

        {/* Pass the rows to your table component */}
        <MyLoadsList rows={loads} handleActionMenu={handleActionMenu} />
      </div>
    </>
  );
}
