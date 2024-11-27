"use client";

import apiClient from "@/lib/axios";
import React, { useState } from "react";
import useFilter from "@/hooks/useFilter";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useApp } from "@/contexts/AppContext";
import {
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
  notify,
  updateQueryParams,
} from "@/utils/helper";
import { ACTION_TYPES, MEMBERS_STATUS } from "@/utils/static-const";
import MemberList from "../components/MemberLists";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import { HTTP_UNPROCESSABLE_ENTITY } from "@/utils/http-status-code";
import StatusDropdown from "../components/StatusDropdown";

export default function Unverified() {
  const { appConfig, updateAppConfig } = useApp();
  const [modal, setModal] = useState(false);
  const [getRow, setGetRow] = useState({});
  const { filter, setFilter } = useFilter({
    memberStatus: MEMBERS_STATUS.UNVERIFIED,
  });
  const [mute, setMute] = useState(false);

  const userListApiEndPoint =
    filter && Object.keys(filter).length > 0 && filter?.memberStatus
      ? apiEndpoint.members.default
      : null;

  const { data: members, mutate } = apiClient.useAxiosSWR(userListApiEndPoint, {
    params: filter,
  });

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

  const handleSearch = (value) => {
    updateQueryParams(appConfig, updateAppConfig, {
      search: value,
    });
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

  return (
    <div>
      <div className="flex items-center gap-4 ml-4">
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mb-1 p-2 border border-gray-300 rounded"
          />
          <p className="text-sm mb-4 text-slate-500">
            Search by name,username,email,phone
          </p>
        </div>
      </div>
      <MemberList rows={members} handleActionMenu={handleActionMenu} />

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
    </div>
  );
}
