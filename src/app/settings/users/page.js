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
import UserList from "./_components/UserList";
import { SETTINGS_USERS_CREATE } from "@/utils/router";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BROWSE_ROLE } from "@/utils/permission";

const Users = () => {
  const router = useRouter();
  const { filter, setFilter } = useFilter({});
  const { appConfig, updateAppConfig } = useApp();
  /**
   * Control  the filter state and swr calling
   */
  const userListApiEndPoint =
    filter && Object.keys(filter).length > 0 ? apiEndpoint.user.default : null;

  const { data: userList } = apiClient.useAxiosSWR(userListApiEndPoint, {
    params: filter,
  });

  // Set selectedRoleId and open the modal
  const handleActionMenu = (type, row) => {
    switch (type) {
      case "EDIT": {
        router.push(`${SETTINGS_USERS_CREATE}/${row.id}`);
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
          User List
        </h1>
        <div className="flex justify-between items-center mb-4 mt-2">
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
          <div>
            <Button
              variant="base"
              iconLeft={<BiPlus size={20} />}
              size="small"
              onClick={() => router.push(SETTINGS_USERS_CREATE)}
            >
              Create User
            </Button>
          </div>
        </div>

        <UserList
          rows={userList ?? {}}
          handleActionMenu={handleActionMenu} // Pass the action menu handler
        />
      </div>
    </>
  );
};

export default WithAuthorization(Users, [BROWSE_ROLE]);
