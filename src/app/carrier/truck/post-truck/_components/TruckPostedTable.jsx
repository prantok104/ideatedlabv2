"use client";

import Button from "@/components/button/Button";
import { FiFilter } from "react-icons/fi";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import { useEffect, useState } from "react";
import { truckPostedList } from "@/utils/static-const";
import TruckPostList from "./TruckPostList";
import TruckListFilterForm from "@/app/carrier/truck-list/_components/TruckListFilterForm";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import { useApp } from "@/contexts/AppContext";
import { updateQueryParams } from "@/utils/helper";
import Loader from "@/components/Loader";

const TruckPostedTable = ({ isTruckModified = false }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { filter, setFilter } = useFilter({});
  const { appConfig, updateAppConfig } = useApp();

  const userListApiEndPoint =
    filter && Object.keys(filter).length > 0
      ? apiEndpoint.truck.postTruckList
      : null;

  const {
    data: truckPostData,
    error,
    isLoading,
    mutate,
  } = apiClient.useAxiosSWR(userListApiEndPoint, {
    params: filter,
  });

  useEffect(() => {
    if (isTruckModified) {
      mutate();
    }
  }, [isTruckModified]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = (value) => {
    updateQueryParams(appConfig, updateAppConfig, {
      search: value,
    });
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-[#1c252e] text-2xl font-semibold mb-4 leading-loose">
          Truck List
        </div>

        <div className="flex justify-center items-center gap-2">
          {/* input box */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className=" px-6 py-2 rounded-[100px] border border-[#c4cdd5] "
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {/* input box end  */}

          {/* filter button */}
          <div>
            <Button
              variant="text"
              size="large"
              onClick={() => setOpenDrawer(true)}
            >
              <FiFilter size={24} />
            </Button>
          </div>
          {/* filter button end */}
        </div>
      </div>
      <TruckPostList rows={truckPostData} />

      {/* filter drawer is here */}
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[50%]"
      >
        <TruckListFilterForm />
      </RightDrawer>
    </div>
  );
};

export default TruckPostedTable;
