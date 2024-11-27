// components/TripCard.js
"use client";
import { MdOutlineFlagCircle, MdShareLocation } from "react-icons/md";

const TripCard = ({ pickupLocation, pickupDate, dropoffLocation }) => {
  return (
    <div
      className="bg-white rounded-lg p-4"
      style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <h2 className="text-[#454f5b] text-sm font-medium font-['Inter'] uppercase leading-tight">
        TRIP
      </h2>
      <div className="relative">
        <div className="mb-8 flex justify-start items-center">
          <MdShareLocation size={24} className="text-[#919EAB]" />
          <div className="ml-6">
            <h3 className="text-[#919eab] text-xs font-normal font-['Inter']">
              Pickup
            </h3>
            <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
              {pickupLocation}
            </p>
            <p className="text-[#919eab] text-xs font-normal font-['Inter']">
              {pickupDate}
            </p>
          </div>
        </div>

        {dropoffLocation.reverse().map((drop, index) => (
          <div className="flex justify-start items-center mb-4 relative">
            {index < dropoffLocation.length - 1 && (
              <div className="absolute top-10 flex flex-col justify-center space-y-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-[2px] h-1 ml-[10px] bg-[#919EAB]"
                  ></div>
                ))}
              </div>
            )}

            <div className="inline-flex items-center">
              <MdOutlineFlagCircle size={24} className="text-[#73C002]" />
            </div>
            <div className="ml-6">
              <h3 className="text-[#637381] text-xs font-normal font-['Inter']">
                Dropoff point ({index + 1})
              </h3>
              <p className="text-[#1c252e] text-sm font-semibold font-['Public Sans'] leading-tight">
                {drop?.name}
              </p>
              <p className="text-[#919eab] text-xs font-normal font-['Inter']">
                {drop?.durationFromPickup?.text} (
                {drop?.distanceFromPickup?.text})
              </p>
            </div>
          </div>
        ))}

        <div className="absolute top-10 flex flex-col justify-center space-y-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="w-[2px] h-1 ml-[10px] bg-[#919EAB]"
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
          Total Distance{" "}
        </p>
        <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
          {Array.isArray(dropoffLocation)
            ? dropoffLocation?.reduce(
                (sum, item) => sum + Number(item?.distanceFromPickup?.value),
                0
              ) /
                1000 +
              "KM"
            : `0 KM`}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
