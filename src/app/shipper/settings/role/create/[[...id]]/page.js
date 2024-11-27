"use client";


import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import RoleForm from "../../_component/RoleForm";

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

export default CreateRole;