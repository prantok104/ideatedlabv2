"use client";

import React, { useState } from "react";
import WithAuthorization from "../HigherOrderComponents/WithAuthorization";
import { BROWSE_PRIVATE_NETWORK } from "@/utils/permission";
import AllContactLists from "./_components/AllContactLists";
import { allContactData } from "./_components/tempData";
import SearchField from "@/components/table/tool/SearchField";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import AddContactForm from "./_components/AddContactForm";
import AddGroup from "./_components/AddGroup";

const ALL_CONTACTS = "All_contacts";
const GROUP = "Group";

const PrivateNetwork = () => {
  const [activeTab, setActiveTab] = useState(ALL_CONTACTS);
  const [contactOpen, setContactOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  // const handleSearch = (value) => {
  //   updateQueryParams(appConfig, updateAppConfig, {
  //     search: value,
  //   });
  // };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-base font-semibold font-['Inter'] leading-normal">
          <button
            className={`py-3 px-4 ${
              activeTab === ALL_CONTACTS
                ? "border-b-2 border-[#73C002] text-[#73C002]"
                : "text-gray-500"
            }`}
            //   onClick={() => handleTabSwitch(MEMBERS_STATUS.MEMBER)}
            onClick={() => setActiveTab(ALL_CONTACTS)}
          >
            ALL COMPANY
          </button>
          <button
            className={`py-3 px-4 ${
              activeTab === GROUP
                ? "border-b-2 border-[#73C002] text-[#73C002]"
                : "text-gray-500"
            }`}
            //   onClick={() => handleTabSwitch(MEMBERS_STATUS.UNVERIFIED)}
            onClick={() => setActiveTab(GROUP)}
          >
            GROUP
          </button>
        </div>

        {activeTab == ALL_CONTACTS ? (
          // <button
          //   className="px-2 py-2.5 w-32 text-gray-50 text-sm font-semibold font-['Public Sans'] leading-tight bg-[#73c002] rounded-md justify-center items-center gap-3 inline-flex"
          //   onClick={() => setContactOpen((prev) => !prev)}
          // >
          //   <span className="text-lg">+</span>
          //   <span className="">Add Contact</span>
          // </button>
          ""
        ) : (
          <button
            className="px-2 py-2.5 w-32 text-gray-50 text-sm font-semibold font-['Public Sans'] leading-tight bg-[#73c002] rounded-md justify-center items-center gap-3 inline-flex"
            onClick={() => setGroupOpen((prev) => !prev)}
          >
            <span className="text-lg">+</span>
            <span className="">Add Group</span>
          </button>
        )}
      </div>

      <RightDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        style="w-1/3"
      >
        <AddContactForm onClose={() => setContactOpen(false)} />
      </RightDrawer>

      <RightDrawer
        isOpen={groupOpen}
        onClose={() => setGroupOpen(false)}
        style="w-[calc(100%-240px)]"
      >
        <AddGroup onClose={() => setGroupOpen(false)} />
      </RightDrawer>

      <div className="flex items-center gap-4 mt-4 mb-2">
        <div className="w-1/2">
          <SearchField
            placeholder="Search Contacts"
            // onChange={handleSearch}
            bottomText="Search name, email, authority, company or affiliate IDSearch name, email, authority, company or affiliate ID"
          />
        </div>
      </div>

      {/* Data display */}
      <div>
        <AllContactLists rows={allContactData} />
      </div>
    </div>
  );
};

// export default WithAuthorization(PrivateNetwork, [BROWSE_PRIVATE_NETWORK]);

export default PrivateNetwork;
