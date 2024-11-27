"use client";

import ListComponent from "./ListComponent";
import Button from "@/components/button/Button";
import { FiFilter } from "react-icons/fi";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import { useEffect, useState } from "react";
import TruckListFilterForm from "./TruckListFilterForm";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import { useApp } from "@/contexts/AppContext";
import { updateQueryParams } from "@/utils/helper";

const TruckList = ( {id, isTruckModified } ) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  // api calling
  

  const { filter, setFilter } = useFilter({});
  const { appConfig, updateAppConfig } = useApp();

  const userListApiEndPoint =
  filter && Object.keys(filter).length > 0 ? apiEndpoint.carrier.truckList : null;


  const { data: truckList, mutate } = apiClient.useAxiosSWR(userListApiEndPoint, {
    params: filter,
  });

  useEffect(() => {
    if (isTruckModified) {
      mutate();
    }
  }, [isTruckModified]);


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
              onChange={(e) => handleSearch(e.target.value)}
              className=" px-6 py-2 rounded-[100px] border border-[#c4cdd5] "
            />
            <p className="text-sm mb-4 text-slate-500">
                Search by name,username,email,phone
              </p>
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
      <ListComponent rows={truckList}/>

        

      {/* filter drawer is here */}
      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        <TruckListFilterForm/>
      </RightDrawer>


      {/* attachment download section  */}
      
      {/* attachment download section end */}
    </div>
  );
};

export default TruckList;