"use client";

import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import RoleForm from "@/components/settings-components/role/RoleForm";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { CREATE_ROLE, UPDATE_ROLE } from "@/utils/permission";

const CreateRole = ({ params }) => {
  const { data: permissionList } = apiClient.useAxiosSWR(
    apiEndpoint.permission.default
  );

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        {params?.id ? "Edit Role" : "Create Role"}
      </h1>
      <RoleForm params={params} permissionList={permissionList?.data || []} />
    </section>
  );
};

export default WithAuthorization(CreateRole, [CREATE_ROLE, UPDATE_ROLE]);
