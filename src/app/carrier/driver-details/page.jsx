"use client";

import Button from "@/components/button/Button";
import React from "react";
import DriverDetails from "./_component/DriverDetails";
import Cards from "../_component/Cards";
import { driverDetailsCard, loadList } from "@/utils/static-const";
import LoadListDriver from "./_component/LoadListDriver";

const page = () => {
  return (
    <div>
      <div className="flex justify-between mb-8">
        <div>
          <div className="text-[#1c252e] text-2xl font-semibold font-['Public Sans'] leading-loose">
            Driver Details
          </div>
        </div>
        <div>
          <Button variant="base" size="medium">
            Edit
          </Button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-2">
            <DriverDetails />
          </div>

          <div className="col-span-4">
            <div>
              <Cards cardData={driverDetailsCard} columns={3} gap={5} />
            </div>

            <div>
            <div className="text-[#1c252e] text-2xl font-semibold mb-5 leading-loose mt-[23px]">Load History</div>
                <LoadListDriver rows={loadList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
