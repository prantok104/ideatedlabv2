"use client";

import React, { useState } from "react";
import { temData } from "./_components/temData";
import ContactLists from "./_components/ContactLists";

const CONTACT_FORM = "Contact_form";
const CONTACT_SALES = "Contact_sales";

export default function Contact() {
  const [activeTab, setActiveTab] = useState(CONTACT_FORM);

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === CONTACT_FORM
              ? "border-b-2 border-[#73C002] text-[#73C002]"
              : "text-gray-500"
          }`}
          //   onClick={() => handleTabSwitch(MEMBERS_STATUS.MEMBER)}
          onClick={() => setActiveTab(CONTACT_FORM)}
        >
          Web Contact
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === CONTACT_SALES
              ? "border-b-2 border-[#73C002] text-[#73C002]"
              : "text-gray-500"
          }`}
          //   onClick={() => handleTabSwitch(MEMBERS_STATUS.UNVERIFIED)}
          onClick={() => setActiveTab(CONTACT_SALES)}
        >
          Contact Sales
        </button>
      </div>

      {/* Data display */}
      <div>
        <ContactLists rows={temData} />
      </div>
    </div>
  );
}
