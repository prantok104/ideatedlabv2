import React, { useState } from "react";
import AutocompleteComponent from "./AutoComplete";
import Button from "@/components/button/Button";
const MapModal = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4">Select a Location</h2>
        <AutocompleteComponent onSelectLocation={onSelectLocation} />
        <div className="w-[80px] inline-block ml-2">
          <Button type="button" variant="base" size="medium" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MapModal