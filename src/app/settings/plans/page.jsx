"use client";
import React from "react";

import UserSubscription from "./_components/UserSubscription";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import {
  BROWSE_SUBSCRIPTION,
  BROWSE_SUBSCRIPTION_PLAN,
} from "@/utils/permission";
const Plans = () => {
  return <UserSubscription />;
};

export default WithAuthorization(Plans, [
  BROWSE_SUBSCRIPTION,
  BROWSE_SUBSCRIPTION_PLAN,
]);
