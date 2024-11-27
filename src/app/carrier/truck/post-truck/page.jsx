"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import TruckPostedTable from "./_components/TruckPostedTable";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import PostTruck from "./_components/PostTruck";

const page = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isTruckModified, setTruckModified] = useState(false);

  return (
    <>
      <section className="bg-[#F9FAFB] ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#1c252e] text-2xl font-semibold  leading-loose">
            Post Truck
          </h1>

          <div>
            <Button
              variant="base"
              size="medium"
              onClick={() => setOpenDrawer(true)}
            >
              post truck
            </Button>
          </div>
        </div>

        <TruckPostedTable isTruckModified={isTruckModified} />

        <RightDrawer
          isOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
          style="w-[85%]"
        >
          <PostTruck setTruckModified={setTruckModified} />
        </RightDrawer>
      </section>
    </>
  );
};

export default page;
