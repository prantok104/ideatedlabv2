"use client";

import { useEffect, useState } from "react";
import useFilter from "@/hooks/useFilter";
import apiClient from "@/lib/axios";
import { ACTION_TYPES, MEMBERS_STATUS } from "@/utils/static-const";
import { apiEndpoint } from "@/utils/api-endpoint";
import MemberList from "./components/MemberLists";
import Modal from "@/components/modal/Modal";
import StatusDropdown from "./components/StatusDropdown";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
  updateQueryParams,
} from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import ModalDialogs from "@/components/modal/ModalDialogs";
import { AiOutlineCheckCircle } from "react-icons/ai";

const UNVERIFIED = "Unverified";
const MEMBER = "Members";

const MemberTabs = () => {
  const [verifyModal, setVerifyModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [getRow, setGetRow] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [searchQueryParams, setSearchQueryParams] = useSearchParams();

  // Initialize filter for 'members' by default
  const { filter, setFilter } = useFilter({
    memberStatus:
      activeTab === MEMBERS_STATUS.UNVERIFIED
        ? MEMBERS_STATUS.UNVERIFIED
        : undefined,
  });

  // Determine the endpoint based on activeTab
  const userListApiEndPoint =
    activeTab === MEMBERS_STATUS.UNVERIFIED
      ? apiEndpoint.members.default
      : apiEndpoint.members.default;

  // API call using the selected endpoint and filter
  const { data: members, mutate } = apiClient.useAxiosSWR(userListApiEndPoint, {
    params: filter,
  });

  // Handle tab switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFilter({
      memberStatus:
        tab === MEMBERS_STATUS.UNVERIFIED
          ? MEMBERS_STATUS.UNVERIFIED
          : undefined,
    });
    mutate(); // re-fetch data based on updated filter
  };

  const handleActionMenu = (type, row) => {
    switch (type) {
      case ACTION_TYPES?.STATUS:
        setModal(true);
        setGetRow(row);
        return;
      default:
        return;
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await apiClient.put(
        `${apiEndpoint?.members?.verify}/${id}`,
        {
          memberStatus: status,
        }
      );
      const data = response?.data ?? {};
      if (data?.id) {
        notify("Successfully updated", NOTIFY_MESSAGE_SUCCESS);
        await mutate();
        setModal(false);
        setGetRow({});
      }
    } catch (error) {
      if (error?.status == HTTP_UNPROCESSABLE_ENTITY) {
        toast.error(error?.message);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    } finally {
    }
  };

  useEffect(() => {
    setActiveTab(filter.memberStatus || MEMBERS_STATUS.MEMBER);
    console.log(filter);
  }, [filter]);

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === MEMBERS_STATUS.MEMBER
              ? "border-b-2 border-[#73C002] text-[#73C002]"
              : "text-gray-500"
          }`}
          onClick={() => handleTabSwitch(MEMBERS_STATUS.MEMBER)}
        >
          Members
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === MEMBERS_STATUS.UNVERIFIED
              ? "border-b-2 border-[#73C002] text-[#73C002]"
              : "text-gray-500"
          }`}
          onClick={() => handleTabSwitch(MEMBERS_STATUS.UNVERIFIED)}
        >
          Unverified
        </button>
      </div>

      {/* Data display */}
      <div>
        <MemberList
          setGetRow={setGetRow}
          activeTab={activeTab}
          rows={members}
          handleActionMenu={handleActionMenu}
          setVerifyModal={() => setVerifyModal(true)}
        />
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        maxWidth="min-w-[250px]"
        maxHeight="min-h-[400px]"
      >
        <h5 className="mt-2">Current status: {getRow?.memberStatus}</h5>
        <StatusDropdown
          currentStatus={getRow?.memberStatus}
          onChangeStatus={(status) => handleStatusChange(getRow?.id, status)}
        />
      </Modal>

      {/* <Modal isOpen={verifyModal} onClose={() => setVerifyModal(false)}>
        <h2 className="text-lg font-bold mb-4">Confirm Verification</h2>
        <p className="mb-6">
          Are you sure you want to verify this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setVerifyModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#73C002] text-white rounded hover:bg-[#74c002e8]"
            // onClick={() => setModal(false)}
          >
            Verify
          </button>
        </div>
      </Modal> */}

      <ModalDialogs
        isOpen={verifyModal}
        onClose={() => setVerifyModal(false)}
        header="Confirm Verification"
        body="Are you sure you want to verify this item? This action cannot be undone."
        icon={
          <AiOutlineCheckCircle size={35} className="text-[#73C002] text-2xl" />
        } // Icon with green color
        primaryButtonText="Confirm"
        primaryButtonColor="bg-[#73C002] hover:bg-[#74c002e8]"
        onPrimaryButtonClick={() => {
          handleStatusChange(getRow.id, MEMBERS_STATUS.VERIFIED);
          console.log("Item verified");
          setVerifyModal(false); // Close modal after the action
        }}
      />
    </div>
  );
};

export default MemberTabs;
