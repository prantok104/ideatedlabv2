'use client'

import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Accordion = ({ title = "Accordion Title", children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border-gray-200 bg-[#FFF] mb-10 py-4 px-6 rounded-lg">

      <button
        type="button"
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full text-left  hover:bg-[#FFF] transition-colors duration-300"
      >
        <span className="text-lg font-semibold text-[#454F5B]">{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <MdExpandLess className="w-6 h-6" />
          ) : (
            <MdExpandMore className="w-6 h-6" />
          )}
        </span>
      </button>


      <div
        className={`transition-all duration-300 ease-in-out bg-[#FFF] ${
          isOpen ? "h-auto bg-[#F9FAFB]" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
