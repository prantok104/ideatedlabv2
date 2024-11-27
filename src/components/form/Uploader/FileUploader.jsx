"use client"
import React, { useState } from "react";
import { useField, useFormikContext } from "formik";

const FileUploader = ({ name }) => {
  const [filePreview, setFilePreview] = useState(null);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue(name, file);
      setFilePreview({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
      });
    }
  };

  const handleFileRemove = () => {
    setFieldValue(name, null);
    setFilePreview(null);
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload File
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <div className="flex items-center space-x-4">
        {!filePreview ? (
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded cursor-pointer hover:bg-blue-100"
          >
            Choose File
          </label>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-600 text-xs">
                  {filePreview.type.split("/")[1] || "File"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{filePreview.name}</p>
                <p className="text-xs text-gray-500">{filePreview.size}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFileRemove}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      {field.value && <input type="hidden" name={name} value={field.value} />}
    </div>
  );
};

export default FileUploader;
