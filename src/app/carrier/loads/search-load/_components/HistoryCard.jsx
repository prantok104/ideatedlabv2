import Button from "@/components/button/Button";
import React from "react";
import { FaHeart } from "react-icons/fa";

const HistoryCard = ({
  time,
  location,
  distance,
  destination,
  filterOptions,
  onSaveSearch,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex justify-between items-center space-x-4 mb-5">
      {/* Left Section - Time, Location, and Distance */}
      <div>
        <p className="text-gray-600 mb-3">{time}</p>
        <div className="flex items-center space-x-2 text-gray-800 mb-3">
          <span>{location}</span>
          <p className="text-blue-500 underline">{distance}</p>
          <span>&rarr;</span>
          <span>{destination}</span>
        </div>

        {/* Filter Buttons (Any, V, R) */}
        <div className="flex space-x-2 mt-2">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section - Save Search Button */}
      <div className="flex items-baseline">
        <Button variant="reactangleStroke" size="small" onClick={onSaveSearch}>
          <FaHeart />
          <span className="pl-1">Save Search</span>
        </Button>
      </div>
    </div>
  );
};

export default HistoryCard;
