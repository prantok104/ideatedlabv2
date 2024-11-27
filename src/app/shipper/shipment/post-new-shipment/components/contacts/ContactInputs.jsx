import React, { useState } from "react";
import { BsPlus, BsTrashFill } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import TextError from "@/components/form/TextError"; // Assuming you have a component for error display
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useField, useFormikContext } from "formik";

const ContactInputs = ({ onSearchChange }) => {
  const { setFieldValue } = useFormikContext();
  // State to manage multiple search inputs
  const [searchBoxes, setSearchBoxes] = useState([
    { searchTerm: "", selectedUserId: "", filteredUsers: [], showDropdown: false }
  ]);

  // Fetch user data from the API
  const { data: userData, error, isLoading } = apiClient.useAxiosSWR(apiEndpoint.user.default);

  // Handle search term change
  const handleSearchChange = (index, value) => {
    const updatedBoxes = [...searchBoxes];
    updatedBoxes[index].searchTerm = value;

    // Filter users based on firstName + lastName or search term
    if (userData?.data) {
      updatedBoxes[index].filteredUsers = userData.data.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    }

    updatedBoxes[index].showDropdown = value.length > 0;
    setSearchBoxes(updatedBoxes);
  };

  // Handle user selection
  const handleUserSelect = (index, user) => {
    const updatedBoxes = [...searchBoxes];
    updatedBoxes[index].searchTerm = `${user.firstName} ${user.lastName}`;
    updatedBoxes[index].selectedUserId = user._id; // Store selected user's ID
    updatedBoxes[index].showDropdown = false;
    setSearchBoxes(updatedBoxes);

    // Pass the selected user's _id back to the parent component
    if (onSearchChange) {
      onSearchChange(index, { userId: user._id }); // Send the selected user's _id
    }
  };

  // Add a new search box (but not notes)
  const addSearchBox = () => {
    setSearchBoxes([...searchBoxes, { searchTerm: "", selectedUserId: "", filteredUsers: [], showDropdown: false }]);
  };

  // Remove a search box
  const removeSearchBox = (index) => {
    const updatedBoxes = searchBoxes.filter((_, i) => i !== index);
    setSearchBoxes(updatedBoxes);
    if (onSearchChange) {
      onSearchChange(index, null); // Send null to remove user ID from the parent state
    }
  };

  return (
    <div className="space-y-4">
      {searchBoxes.map((box, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6"
        >
          <div className="col-span-12 md:col-span-12 w-1/2">
            <label className="text-gray-600 text-sm font-medium leading-tight">
              Contact {index + 1} *
            </label>
            <div className="flex items-center mt-2">
              <div className="flex-1 flex items-center border border-gray-300 rounded-lg focus-within:ring-slate-600">
                <input
                  type="text"
                  value={box.searchTerm}
                  onChange={(e) => handleSearchChange(index, e.target.value)}
                  placeholder="Search user by name..."
                  className="flex-1 border-none outline-none py-3 px-2 bg-transparent placeholder:text-sm placeholder:text-[#919eab]"
                  disabled={isLoading || error}
                  name="contacts"
                />
                <MdSearch className="mr-2 text-[#919eab]" size={20} />
              </div>

              {index === searchBoxes.length - 1 && (
                <button
                  type="button"
                  onClick={addSearchBox}
                  className="ml-2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#73C002] text-[#73C002] hover:bg-[#73C002] hover:text-white transition duration-150 ease-in-out"
                >
                  <BsPlus size={24} />
                </button>
              )}

              {searchBoxes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSearchBox(index)}
                  className="ml-2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-150 ease-in-out"
                >
                  <BsTrashFill size={24} />
                </button>
              )}
            </div>

            {/* Loading and Error States */}
            {isLoading && (
              <p className="text-sm text-gray-500 mt-2">Loading contacts...</p>
            )}
            {error && <TextError>{error.message}</TextError>}

            {/* Dropdown to select users */}
            {box.showDropdown && box.filteredUsers.length > 0 && (
              <ul className="w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto">
                {box.filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUserSelect(index, user)}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      {/* Single Notes TextArea (separate from search boxes) */}
      <div className="col-span-12 md:col-span-12 w-1/2">
        <label className="text-gray-600 text-sm font-medium leading-tight">
          Additional Notes (optional)
        </label>
        <textarea
          onChange={(e) => {
            setFieldValue("comment", e.target.value);
            onSearchChange(null, { notes: e.target.value });
          }} // Handle note changes
          placeholder="Add additional notes..."
          className="w-full mt-2 border border-gray-300 rounded-lg py-2 px-3"
          rows={3}
          name="comments"
        />
      </div>
    </div>
  );
};

export default ContactInputs;
