import Button from "@/components/button/Button";
import { notify, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";
import React from "react";

export default function BidConfirmation({ handleBidModal }) {
  const handleSubmit = () => {
    notify("Accept Successful", NOTIFY_MESSAGE_SUCCESS);
    handleBidModal();
  };

  return (
    <div>
      <h1 className="text-[#1c252e] text-xl font-medium font-['Inter'] leading-normal">
        Accept the Bid?
      </h1>
      <p className="text-[#637381] mt-4 text-xs font-normal font-['Inter'] leading-tight">
        The carrier will be notified that you’re
        <br />
        agreeing to this rate.
      </p>
      <p className="text-[#637381] mt-4 text-xs font-medium font-['Inter'] leading-tight">
        Note : the shipment will get unposted.
      </p>
      <div className="flex justify-between items-end gap-4 mt-4">
        <div className="w-2/3">
          <h2 className="text-[#454f5b] text-sm font-medium font-['Inter'] leading-tight">
            RATE
          </h2>
          <div className="flex justify-between items-end mt-1">
            <p className="text-[#1c252e] text-2xl font-semibold font-['Inter']">
              $52,000
            </p>
            <p className="text-[#454f5b] text-sm font-normal font-['Inter'] leading-loose">
              $4.80/ml
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <Button variant="rectangleFill" size="medium" onClick={handleSubmit}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
