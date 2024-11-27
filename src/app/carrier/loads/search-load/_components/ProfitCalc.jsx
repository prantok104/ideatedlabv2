import React from "react";

export default function ProfitCalc() {
  return (
    <div>
      <h1 className="mt-12 mb-9 ml-20 text-[#1c252e] text-3xl font-medium leading-7">
        Profit Calculator
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Linehaul Revenue</h2>
        <div className="text-gray-700 space-y-3">
          <div className="flex items-center justify-between text-right text-[#454f5b] text-base font-normal leading-tight">
            <p>Total Distance</p>
            <p>188ml</p>
          </div>
          <div className="flex items-center justify-between text-right text-[#454f5b] text-base font-normal leading-tight">
            <p>Per miles rate</p>
            <p>$6.38</p>
          </div>
          <hr className="w-full border border-[#c4cdd5] h-[0px]" />
          <div className="flex items-center justify-between text-[#637381] text-md font-semibold leading-tight">
            <p>Sub- Total</p>
            <p>$1,200</p>
          </div>
          <div className="flex items-center justify-between text-right text-[#454f5b] text-base font-normal leading-tight">
            <p>Estimate fuel costs</p>
            <p>-$56</p>
          </div>
          <div className="flex items-center justify-between text-right text-[#454f5b] text-base font-normal leading-tight">
            <p>Additional Costs</p>
            <p>-$0.00</p>
          </div>
          <hr className="w-full border border-[#c4cdd5] h-[0px] my-3" />
          <div className="flex items-center justify-between text-[#1c252e] text-sm font-semibold leading-tight">
            <p>Total Profit</p>
            <p>$1,254.45</p>
          </div>
        </div>
      </div>
    </div>
  );
}
