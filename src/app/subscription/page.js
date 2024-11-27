"use client";

import React, { useState } from "react";
import PackageList from "./_components/PackageList";
import { useApp } from "@/contexts/AppContext";
import { apiEndpoint } from "@/utils/api-endpoint";
import apiClient from "@/lib/axios";
import Button from "@/components/button/Button";
import useFilter from "@/hooks/useFilter";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ACTION_TYPES } from "@/utils/static-const";
import { SUBSCRIPTION_PACKAGES_PLAN_CREATE } from "@/utils/router";
import { updateQueryParams } from "@/utils/helper";
import Modal from "@/components/modal/Modal";
import {
  BROWSE_SUBSCRIPTION,
  BROWSE_SUBSCRIPTION_PLAN,
  VIEW_SUBSCRIPTION,
} from "@/utils/permission";
import WithAuthorization from "../HigherOrderComponents/WithAuthorization";

const SubscriptionPackage = () => {
  const { appConfig, updateAppConfig } = useApp();
  const { filter } = useFilter();
  const [modal, setModal] = useState(false);
  const router = useRouter();

  // Define the subscription endpoint
  const subscriptionEndPoint = apiEndpoint.subscription.default;

  // Fetch plans using SWR
  const { data: packages } = apiClient.useAxiosSWR(subscriptionEndPoint, {
    params: filter,
  });

  const handleActionMenu = (type, row) => {
    switch (type) {
      case ACTION_TYPES.EDIT:
        router.push(`${SUBSCRIPTION_PACKAGES_PLAN_CREATE}/${row?.id}`);
        return;
      case ACTION_TYPES.DELETE:
        setModal(true);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-9 mt-2">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search package list..."
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 pl-10 w-1/2 border border-gray-300 rounded"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div>
          <Button
            variant="rectangleFill"
            size="medum"
            onClick={() => router.push(SUBSCRIPTION_PACKAGES_PLAN_CREATE)}
          >
            <span className="text-xl pr-1 my-auto">+</span>Create New Package
          </Button>
        </div>
      </div>
      <PackageList rows={packages} handleActionMenu={handleActionMenu} />

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setModal(false)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WithAuthorization(SubscriptionPackage, [
  BROWSE_SUBSCRIPTION_PLAN,
  BROWSE_SUBSCRIPTION,
  VIEW_SUBSCRIPTION,
]);
