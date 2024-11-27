"use client";

import RightDrawer from "@/components/rightDrawer/RightDrawer";
import TruckList from "./_components/TruckList";
import TruckOverView from "./_components/TruckOverView";
import Button from "@/components/button/Button";
import { useState } from "react";
import AddTruck from "./_components/AddTruck";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";

const page = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isTruckModified, setTruckModified] = useState(false);

  const { data: truckList } = apiClient.useAxiosSWR(
    apiEndpoint.carrier.truckList
  );

  const id = truckList?.data[0]?.id;
  

  


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#1c252e] text-2xl font-semibold  leading-loose">
          Truck Overview
        </h1>

        <div>
          <Button
            variant="base"
            size="medium"
            onClick={() => setOpenDrawer(true)}
          >
            Add Truck
          </Button>
        </div>
      </div>

      <TruckOverView />
      <TruckList id = {id}  isTruckModified = {isTruckModified}/>

      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        <AddTruck setTruckModified = {setTruckModified}/>
      </RightDrawer>
    </div>
  );
};

export default page;
