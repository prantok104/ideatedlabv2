"use client";
import Button from "@/components/button/Button";
import { useApp } from "@/contexts/AppContext";
import useFilter from "@/hooks/useFilter";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  notify,
  NOTIFY_MESSAGE_WARNING,
  updateQueryParams,
} from "@/utils/helper";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import RoleList from "./_component/RoleList";
import SearchField from "@/components/table/tool/SearchField";
import { SETTINGS_ROLES_CREATE } from "@/utils/router";
import { BROWSE_ROLE } from "@/utils/permission";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { Modal } from "antd";
import { useState } from "react";

const Roles = () => {
  const router = useRouter();
  const { filter, setFilter } = useFilter({});
  const { appConfig, updateAppConfig } = useApp();
  /**
   * Control  the filter state and swr calling
   */
  const roleListApiEndPoint =
    filter && Object.keys(filter).length > 0 ? apiEndpoint.role.default : null;
  const { data: roleList } = apiClient.useAxiosSWR(roleListApiEndPoint, {
    params: filter,
  });

  // Set selectedRoleId and open the modal
  const handleActionMenu = (type, row) => {
    switch (type) {
      case "EDIT": {
        router.push(`${SETTINGS_ROLES_CREATE}/${row.id}`);
        break;
      }
      default: {
        notify(`The action=${type} is not exist`, NOTIFY_MESSAGE_WARNING);
        break;
      }
    }
  };
  /**
   * Module Selector
   */
  const handleSearch = (value) => {
    updateQueryParams(appConfig, updateAppConfig, {
      search: value,
    });
  };

  return (
    <>
      <div className="relative">
        <h1 className="text-3xl font-bold mb-6 col-span-0 md:col-span-10 text-gray-700">
          Role List
        </h1>
        <div className="flex justify-between items-center mb-4 mt-2">
          <div className="flex items-center gap-4 ml-4">
            <div>
              <SearchField
                placeholder="Search..."
                onChange={handleSearch}
                bottomText="Search by title"
              />
            </div>
          </div>
          <div>
            <Button
              variant="base"
              iconLeft={<BiPlus size={20} />}
              size="small"
              onClick={() => router.push(SETTINGS_ROLES_CREATE)}
            >
              Create Role
            </Button>
          </div>
        </div>
        <RoleList
          rows={roleList ?? {}}
          handleActionMenu={handleActionMenu} // Pass the action menu handler
        />
      </div>
    </>
  );
};
export default WithAuthorization(Roles, [BROWSE_ROLE]);
