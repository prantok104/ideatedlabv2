"use client";

import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WithAuthorization = (Component, requiredPermissions = []) => {
  return function AuthWrappedComponent(props) {
    const router = useRouter();
    const { permissions } = useApp();
    useEffect(() => {
      if (permissions.length > 0) {
        const userPermissions =
          permissions && Array.isArray(permissions) ? permissions : [];
        const hasPermission = Array.isArray(requiredPermissions)
          ? requiredPermissions.some((permission) =>
              userPermissions.includes(permission)
            )
          : userPermissions.includes(requiredPermissions);
        if (!hasPermission) {
          router.push("/unauthorized");
        }
      }
    }, [requiredPermissions, router, permissions]);

    return <Component {...props} />;
  };
};

export default WithAuthorization;
