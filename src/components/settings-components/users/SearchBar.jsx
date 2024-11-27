"use client";

import Button from "@/components/button/Button";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded pr-12"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button onClick={handleSearch} variant="text" size="small">
            <FaSearch />
          </Button>
        </div>
      </div>

      <p className="text-sm mb-0 text-slate-500">
        Search User by name, email or username
      </p>
    </div>
  );
};

export default SearchBar;
