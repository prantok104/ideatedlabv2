// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete this subscription?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-[#73C002] text-white p-2 rounded mr-2"
          >
            Confirm
          </button>
          <button onClick={onCancel} className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
