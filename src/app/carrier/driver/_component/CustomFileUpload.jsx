'use client';

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiUploadCloud, FiEdit2 } from "react-icons/fi";
import { ErrorMessage } from "formik"; // Assuming you're using Formik for error handling

const CustomFileUpload = ({ label, name, accept, onChange, existingImage, isImage = true, ...rest }) => {
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(null);

  // Use useEffect to set the preview if an existing image is provided
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
      setFileName(existingImage.split('/').pop()); // Set the file name based on the URL
    }
  }, [existingImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size should be under 5MB");
      return;
    }

    // Set preview for image files
    if (isImage && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }

    setFileName(file.name);
    onChange(file); // Notify Formik of the file change
  };

  return (
    <div className="relative my-4 flex flex-col items-start">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>

      {/* Circular Box for File/Image Upload */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Display preview if image is uploaded or existing image is available */}
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="text-gray-500 text-lg">
              <FiUploadCloud size={40} />
            </div>
          )}
        </div>

        {/* Upload/Edit Icon positioned at the bottom */}
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
          <label htmlFor={name} className="cursor-pointer">
            <FiEdit2 size={16} className="text-gray-500" />
          </label>
          <input
            id={name}
            type="file"
            accept={isImage ? "image/*" : "*"}
            className="hidden"
            onChange={handleFileChange}
            {...rest}
          />
        </div>
      </div>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-2" />
    </div>
  );
};

export default CustomFileUpload;