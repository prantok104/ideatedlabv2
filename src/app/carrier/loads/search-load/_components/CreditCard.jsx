import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function CreditCard() {
  return (
    <div>
      <h1 className="mt-12 mb-6 ml-16 text-[#1c252e] text-3xl font-medium leading-7">
        Backhauls
      </h1>
      <div className="bg-white rounded-lg max-w-lg mx-auto p-4 space-y-4">
        {/* First Row */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Credit Score</p>
            <p className="text-xl font-bold">94</p>
          </div>
          <div>
            <p className="text-gray-500">Days to Pay</p>
            <p className="text-xl font-bold">31</p>
          </div>
          <FcGoogle size={40} /> {/* Google Icon */}
        </div>

        {/* Second Row */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Credit Score</p>
            <p className="text-xl font-bold">A</p>
          </div>
          <div>
            <p className="text-gray-500">Days to Pay</p>
            <p className="text-xl font-bold">45</p>
          </div>
          <FcGoogle size={40} /> {/* Google Icon */}
        </div>

        {/* Footer Links */}
        <div className="flex justify-between pt-4 border-t">
          <div className="flex items-center text-yellow-500">
            <FaBolt className="mr-2" />
            <p>Get Paid Faster</p>
          </div>
          <div className="flex items-center text-yellow-500">
            <FaFileAlt className="mr-2" />
            <p>Credit Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
