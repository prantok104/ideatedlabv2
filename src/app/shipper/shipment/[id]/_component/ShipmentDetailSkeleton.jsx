import React from "react";

const ShipmentDetailSkeleton = () => {
  return (
    <div className="flex gap-6 p-6 mx-auto bg-white rounded-lg shadow-lg w-full">
      {/* Left Panel */}
      <div className="flex flex-col space-y-6 w-1/4">
        {/* Trip Information */}
        <div className="p-4 bg-gray-100 rounded-lg space-y-3">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Posted Details */}
        <div className="p-4 bg-gray-100 rounded-lg space-y-2">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Rate Information */}
        <div className="p-4 bg-gray-100 rounded-lg space-y-3">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Equipment Details */}
        <div className="p-4 bg-gray-100 rounded-lg space-y-2">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Contact Information */}
        <div className="p-4 bg-gray-100 rounded-lg space-y-2">
          <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col space-y-6 w-3/4">
        {/* Map Section */}
        <div className="p-4 bg-gray-100 rounded-lg h-[360px]">
          <div className="h-full bg-gray-300 rounded"></div>
        </div>

        {/* Activity Section */}
        <div className="p-4 flex items-center justify-start gap-6 bg-gray-100 rounded-lg">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        </div>

        {/* Bid & Booking Activity Items */}
        <div>
          <div className=" p-4 bg-gray-300 rounded-lg h-[500px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailSkeleton;
