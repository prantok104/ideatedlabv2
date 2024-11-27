"use client";

import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import PackageCreate from "../_components/PackageCreate";
import { BROWSE_SUBSCRIPTION, BROWSE_SUBSCRIPTION_PLAN } from "@/utils/permission";


const CreatePackagePage = () => {
  return (
    <PackageCreate />
  );
};

export default WithAuthorization(CreatePackagePage, [
  BROWSE_SUBSCRIPTION_PLAN,
  BROWSE_SUBSCRIPTION,
]);