'use client';

import { useField, ErrorMessage } from "formik";
import { useState } from "react";
import { FiUploadCloud, FiEdit2 } from "react-icons/fi"; 
import TextError from "@/components/form/TextError";

const FileUploadField = ({ label, name, isImage = true, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState(null); 

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file); 

    // Preview the uploaded image if it's an image field
    if (file && isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative my-4 flex flex-col items-center">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>

      {/* Circular Box for File/Image Upload */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Display preview if image is uploaded */}
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
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default FileUploadField;
