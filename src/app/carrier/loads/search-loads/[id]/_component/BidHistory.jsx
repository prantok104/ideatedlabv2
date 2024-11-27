import React from "react";
import BidTable from "./BidTable-bk";

export default function BidHistory({bids=[]}) {
  return (
    <div>
      <h1 className="mt-12 mb-5 text-[#1c252e] text-xl font-medium font-['Inter'] leading-7">
        Bid History
      </h1>
      <div
        className="bg-white p-4 py-3 rounded-lg"
        style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <BidTable bids={bids} />
      </div>
    </div>
  );
}
