import React from "react";

export default function Company() {
  return (
    <div>
      <h1 className="mt-12 mb-9 ml-20 text-[#1c252e] text-3xl font-medium leading-7">
        Company
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">SR EXPRESS LOGISTIC</h2>
        <div className="text-gray-700 space-y-2">
          <div className="flex items-center">
            <p className="w-44 shrink-0">
              <strong>Address</strong>:
            </p>
            <p>2857 Wyatt Street Fort Lauderdale, FL 33301</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>MC Number</strong>:
            </p>
            <p>636302</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>Dot Number</strong>:
            </p>
            <p>636302</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>Website</strong>:
            </p>
            <a href="https://www.srexpress.com" className="text-blue-500">
              www.srexpress.com
            </a>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>TIA Member</strong>:
            </p>
            <p>NO</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>Factorable</strong>:
            </p>
            <p>Pre-approved by</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>Bidding</strong>:
            </p>
            <a href="https://www.srexpress.com" className="text-blue-500">
              www.srexpress.com
            </a>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>TIA Member</strong>:
            </p>
            <p>No</p>
          </div>
          <div className="flex items-center">
            <p className="w-44">
              <strong>Factorable</strong>:
            </p>
            <p>Pre-approved by</p>
          </div>
        </div>
      </div>
    </div>
  );
}
