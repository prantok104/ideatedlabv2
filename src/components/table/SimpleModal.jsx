import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md"; // Close icon for modal

const SimpleModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Demo Modal</h2>
        <p>This is a demo modal. There is nothing to show here.</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SimpleModal;
