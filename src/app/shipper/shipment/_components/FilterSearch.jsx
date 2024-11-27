"use client";

import { MdSearch } from "react-icons/md";

const FilterSearch = ({ onToggle }) => {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="relative w-full">
        <div className="flex items-center rounded-[100px] border border-[#919eab]  overflow-hidden">
          {/* Search Icon */}

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 py-2 px-4 text-base outline-none bg-transparent placeholder:text-[15px] placeholder:text-[#454f5b]" // Placeholder text size adjusted here
          />
        </div>
      </div>

      <div>
        <button className="me-5 ms-3 mt-1" onClick={onToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.5 21H10.5C10.1022 21 9.72064 20.842 9.43934 20.5607C9.15804 20.2794 9 19.8978 9 19.5V13.8075L3.4425 8.25C3.16081 7.96999 3.00167 7.58968 3 7.1925V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H19.5C19.8978 3 20.2794 3.15804 20.5607 3.43934C20.842 3.72064 21 4.10218 21 4.5V7.1925C20.9983 7.58968 20.8392 7.96999 20.5575 8.25L15 13.8075V19.5C15 19.8978 14.842 20.2794 14.5607 20.5607C14.2794 20.842 13.8978 21 13.5 21ZM4.5 4.5V7.1925L10.5 13.1925V19.5H13.5V13.1925L19.5 7.1925V4.5H4.5Z"
              fill="#454F5B"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterSearch;
