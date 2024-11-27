"use client";

import React from "react";
import PackageForm from "../../_components/PackageForm";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "@/utils/permission";

function CreatePackages({ params }) {
  return (
    <div>
      <h1 className="font-semibold text-xl text-[#454F5B] mb-9">
        {params?.id ? "Edit Package" : "Create Package"}
      </h1>
      <PackageForm params={params} />
    </div>
  );
}

export default WithAuthorization(CreatePackages, [
  CREATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
]);
