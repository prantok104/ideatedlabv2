import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiArrowElbowUpLeft } from "react-icons/pi";

export default function Backhauls() {
  const trips = [
    { from: "Indianapolis, IN", to: "Chicago, IL", time: 12 },
    { from: "New York, NY", to: "Boston, MA", time: 5 },
    { from: "Los Angeles, CA", to: "San Francisco, CA", time: 6 },
    { from: "Dallas, TX", to: "Austin, TX", time: 3 },
  ];

  return (
    <div>
      <h1 className="mt-12 mb-6 ml-16 text-[#1c252e] text-3xl font-medium leading-7">
        Backhauls
      </h1>
      <div className="bg-white rounded-lg max-w-lg mx-auto p-4">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-2"
          >
            <div className="flex items-center">
              <span className="text-gray-800">{trip.from}</span>
              <MdOutlineKeyboardArrowRight className="mx-2 text-gray-500" />
              <span className="text-gray-800">{trip.to}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800 mr-2">{trip.time}</span>
              <PiArrowElbowUpLeft />
              {/* Reusing the same icon */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
