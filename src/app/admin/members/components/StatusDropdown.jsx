import { MEMBERS_STATUS } from "@/utils/static-const";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function StatusDropdown({ currentStatus, onChangeStatus }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`btn-primary flex items-center justify-center px-7 mt-3 mb-3 py-2 border border-gray-300 rounded-md focus:outline-none 
          ${dropdownOpen ? "ring-2 ring-green-400" : ""} 
          mx-auto transition duration-300 ease-in-out`}
      >
        Change Status <FaChevronDown className="ml-2" />
      </button>
      {dropdownOpen && (
        <ul className="dropdown-menu absolute right-1/2 transform translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {Object.values(MEMBERS_STATUS)
            .filter((status) => status !== currentStatus)
            .map((status, index) => (
              <li key={index}>
                <button
                  className="w-full text-center px-4 py-2 hover:bg-gray-100 focus:bg-green-100 transition duration-200 ease-in-out"
                  onClick={() => {
                    console.log(status);
                    
                    onChangeStatus(status); // Notify parent of the change
                    setDropdownOpen(false); // Close dropdown
                  }}
                >
                  {status}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
