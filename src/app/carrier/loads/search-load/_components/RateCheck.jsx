import React from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export default function RateCheck() {
  return (
    <div>
      <h1 className="mt-12 mb-9 ml-16 text-[#1c252e] text-3xl font-medium leading-7">
        Rate Check
      </h1>
      <hr className="w-full" />
      <div className="p-6 bg-white rounded-lg max-w-lg mx-auto space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-[#637381] text-base font-medium leading-tight">
            Average rate by rate check
          </span>
          <span className="text-[#454f5b] text-xl font-semibold leading-7">
            $6.52/mi
          </span>
        </div>

        <div className="flex justify-between items-center ">
          <span className="text-[#637381] text-base font-medium leading-tight">
            Posted rate
          </span>
          <span className="text-[#454f5b] text-xl font-semibold leading-7">
            $6.52/mi
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-[#637381] text-base font-medium leading-tight">
            Difference
          </span>
          <span className="text-green-500 text-xl font-semibold leading-7">
            $6.52/mi
          </span>
        </div>

        <div className="border p-4 rounded-lg mt-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <span className="block text-[#637381] text-sm font-medium leading-tight mb-3">
                Low
              </span>
              <span className="text-gray-800">$6.52/mi</span>
            </div>
            <GoArrowDown size={36} />
            <div className="text-center">
              <span className="block text-[#637381] text-sm font-medium leading-tight mb-3">
                Average
              </span>
              <span className="text-green-500">$6.52/mi</span>
            </div>
            <GoArrowUp size={36} />
            <div className="text-center">
              <span className="block text-[#637381] text-sm font-medium leading-tight mb-3">
                High
              </span>
              <span className="text-gray-800">$6.52/mi</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Is this rate accurate?</span>
          <div>
            <button className="text-yellow-500 font-semibold mr-4">Yes</button>
            <button className="text-red-500 font-semibold">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
