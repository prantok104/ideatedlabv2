"use client";

import RightDrawer from "@/components/rightDrawer/RightDrawer";
import React, { useEffect, useState } from "react";
import DriverListComponent from "./DriverListComponent";
import { FiFilter } from "react-icons/fi";
import Button from "@/components/button/Button";
import { driverList } from "@/utils/static-const";
import TruckListFilterForm from "../../truck-list/_components/TruckListFilterForm";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import { useApp } from "@/contexts/AppContext";
import { updateQueryParams } from "@/utils/helper";

const DriverTable = ({ isDriverModified = false }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { filter, setFilter } = useFilter({});
  const { appConfig, updateAppConfig } = useApp();

  const userListApiEndPoint =
    filter && Object.keys(filter).length > 0
      ? apiEndpoint.driver.driverList
      : null;

  const { data: driverList, mutate } = apiClient.useAxiosSWR(
    userListApiEndPoint,
    {
      params: filter,
    }
  );

  useEffect(() => {
    if (isDriverModified) {
      mutate();
    }
  }, [isDriverModified, mutate]);

  const handleSearch = (value) => {
    updateQueryParams(appConfig, updateAppConfig, {
      search: value,
    });
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="text-[#1c252e] text-2xl font-semibold mb-4 leading-loose">
          Driver List
        </div>

        <div className="flex justify-center items-center gap-2">
          {/* input box */}
          <div>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              className=" px-6 py-2 rounded-[100px] border border-[#c4cdd5] "
            />
          </div>
          {/* input box end  */}

          {/* filter button */}
          <div>
            {/* <Button
              variant="text"
              size="large"
              onClick={() => setOpenDrawer(true)}
            >
              <FiFilter size={24} />
            </Button> */}
          </div>
          {/* filter button end */}
        </div>
      </div>
      <DriverListComponent rows={driverList} />

      {/* filter drawer is here */}
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        <TruckListFilterForm />
      </RightDrawer>
    </div>
  );
};

export default DriverTable;
