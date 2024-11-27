"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import Cards from "../_component/Cards";
import { driverTruckData } from "@/utils/static-const";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import AddDriver from "./_component/AddDriver";
import DriverTable from "./_component/DriverTable";

const page = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDriverModified, setDriverModified] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#1c252e] text-2xl font-semibold  leading-loose">
          Driver Overview
        </h1>

        <div>
          <Button
            variant="base"
            size="medium"
            onClick={() => setOpenDrawer(true)}
          >
            Add Driver
          </Button>
        </div>
      </div>

      <Cards cardData={driverTruckData} columns={4} gap={5} />

      <DriverTable isDriverModified={isDriverModified} />

      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        <AddDriver setDriverModified={setDriverModified} />
      </RightDrawer>
    </div>
  );
};

export default page;
