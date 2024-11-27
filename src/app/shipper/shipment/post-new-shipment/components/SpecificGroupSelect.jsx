"use client";

import { specificGroup } from "@/utils/home-static-data";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const SpecificGroupSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const options = specificGroup;

  // Handle option selection and close dropdown
  const handleSelect = (option) => {
    setSelectedGroup(option);
    setIsOpen(false);  
  };

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.contacts.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-xs pt-2">
      {/* Main Button */}
      <button
        type="button"
        className="w-full flex items-center justify-between border border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-300 ease-in-out"
        onClick={() => setIsOpen((prev) => !prev)} 
      >
        <span className="text-sm text-[#454F5B]">
          {selectedGroup?.groupName || "Select"}
        </span>
        <MdOutlineKeyboardArrowDown size={20} className="text-[#454F5B]" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full bg-[#FFFFFF] rounded-lg max-h-60 overflow-auto z-40">

          {/* Search Field */}
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Header */}
          <div className="flex justify-between px-4 py-2 ">
            <h1 className="text-sm font-bold">Group Name</h1>
            <h1 className="text-sm font-bold">Contacts</h1>
          </div>

          

          {/* Show all options if no search query, else show filtered options */}
          {(searchQuery ? filteredOptions : options).length > 0 ? (
            (searchQuery ? filteredOptions : options).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)} 
                className="w-full text-sm text-left py-2 px-4 font-normal text-[#454F5B] hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <div className="flex justify-between">
                  <div>
                    <p>{option.groupName}</p>
                  </div>
                  <div>
                    <p>{option.contacts}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No matching groups found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecificGroupSelect;
