"use client";

import { useState } from "react";
import Image from "next/image";
import { useField } from "formik";
import { BiUpload } from "react-icons/bi"; // Use upload icon from react-icons
import userAvatar from "../../../../../public/asset/user-avatar.png";
import TextInput from "@/components/form/TextInput"; // Assuming you have a custom TextInput
import { useApp } from "@/contexts/AppContext";

const ProfileEdit = () => {
  const [file, setFile] = useState(null); // State for storing the uploaded file

  // Use Formik field to bind the profile name and location fields
  const [nameField] = useField('profileName'); // Formik field for profile name
  const [locationField] = useField('profileLocation'); // Formik field for location

  const { user } = useApp(); // Get the user object from the context
  console.log("user", user);
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Create a URL for the selected file
    }
  };

  return (
    <div className="p-6 bg-slate-50 rounded-md shadow-sm">
      <div className="grid grid-cols-2 justify-items-stretch">
        <div className="flex gap-6 justify-start items-center relative">
          <div className="relative w-[54px] h-[54px]">
            <Image
              src={file || userAvatar} // Display the uploaded file or default avatar
              alt="Profile image"
              width={54}
              height={54}
              className="rounded-full"
            />
            {/* Always visible upload button */}
            <label htmlFor="file-upload" className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 rounded-full">
              <BiUpload className="text-white w-6 h-6" /> {/* Upload icon */}
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="hidden" // Hide the default file input
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="items-center">
            {/* Display static text (non-editable) */}
            <h1 className="text-xl font-semibold leading-7 pb-2 text-[#454F5B]">
              {nameField.value || "User Name"}
            </h1>
            <p className="text-xs font-medium text-[#637381] leading-5">
              Account
            </p>
            <p className="text-xs font-medium text-[#637381] leading-5">
              {locationField.value || "Location not set"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
