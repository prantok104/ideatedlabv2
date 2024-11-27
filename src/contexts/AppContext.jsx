"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Loader from "@/components/Loader";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  getAccessToken,
  getCurrentApp,
  notify,
  NOTIFY_MESSAGE_ERROR,
  removeAuthToken,
} from "@/utils/helper";
import {
  freeRouter,
  LOGIN_ROUTE,
  OTP_VERIFY_ROUTE,
  SUBSCRIPTION_EXPIRE_ROUTE,
} from "@/utils/router";
import { menu } from "@/utils/menu"; // Assuming the menu is available globally
import { usePathname, useRouter } from "next/navigation";
import { HTTP_UNAUTHORIZED } from "@/utils/http-status-code";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [_appConfig, _setAppConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentMenu, setCurrentmenu] = useState([]);
  const pathname = usePathname();
  const [authUpdate, setAuthUpdate] = useState(false);

  const _updateAppConfig = (newConfig) => {
    _setAppConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const fetchUser = useCallback(async () => {
    try {
      const { data: currentUser } = await apiClient.get(apiEndpoint.auth.user);
      if (Object.keys(currentUser).length > 0) {
        setUser(currentUser);
      }
    } catch (error) {
      if (error?.status == HTTP_UNAUTHORIZED) {
        removeAuthToken();
        router.push(LOGIN_ROUTE);
      }
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  }, [pathname, authUpdate]);

  useEffect(() => {
    setLoading(true);
    if (getAccessToken()) {
      fetchUser();
    }
    setLoading(false);
  }, [fetchUser]);

  // Filter menu based on user permissions
  const getFilteredMenu = useCallback(() => {
    if (!user?.permissions) return [];

    return menu.filter((menuItem) => {
      const parentHasPermission =
        !menuItem.permission || user?.permissions.includes(menuItem.permission);

      if (!parentHasPermission) return false;

      if (menuItem.isDropdown) {
        menuItem.dropdownItems = menuItem.dropdownItems.filter(
          (dropdownItem) => {
            return (
              !dropdownItem.permission ||
              user?.permissions.includes(dropdownItem.permission)
            );
          }
        );

        return menuItem.dropdownItems.length > 0;
      }

      return true;
    });
  }, [user]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      const currentUser = user;
      const accessToken = getAccessToken();

      if (currentUser?.authenticated && currentUser?.isUserVerified === false) {
        router.push(OTP_VERIFY_ROUTE);
      }

      if (!currentUser?.authenticated && !freeRouter.includes(pathname)) {
        window.location.href = pathname;
      } else if (
        currentUser?.authenticated &&
        currentUser?.isSubscriptionExpire &&
        pathname !== SUBSCRIPTION_EXPIRE_ROUTE
      ) {
        router.push(SUBSCRIPTION_EXPIRE_ROUTE);
      } else if (
        currentUser?.authenticated &&
        !currentUser?.isSubscriptionExpire
      ) {
        if (freeRouter.includes(pathname)) {
          if (getCurrentApp()) {
            window.location.href = getCurrentApp()?.slug;
          } else {
            // router.push(DASHBOARD_ROUTE);
          }
        } else if (
          pathname === SUBSCRIPTION_EXPIRE_ROUTE &&
          !currentUser?.isSubscriptionExpire
        ) {
          if (getCurrentApp()) {
            window.location.href = getCurrentApp()?.slug;
          } else {
            // router.push(DASHBOARD_ROUTE);
          }
        }
      }

      // Redirect user if they try to access an unauthorized route
      const filteredMenu = getFilteredMenu();
      const allowedRoutes = filteredMenu.flatMap((menuItem) => {
        if (menuItem.isDropdown) {
          return menuItem.dropdownItems.map((item) => item.link);
        }
        return menuItem.link;
      });

      // if (!allowedRoutes.includes(pathname) && !freeRouter.includes(pathname)) {
      //   router.push(UNAUTHORIZED_ROUTE);  // Redirect to unauthorized page
      // }
    }
  }, [user, pathname]);

  return loading ? (
    <Loader />
  ) : (
    <AppContext.Provider
      value={{
        appConfig: _appConfig,
        updateAppConfig: (appConfig) => {
          _updateAppConfig(appConfig);
        },
        user: user?.user ?? {},
        isAuth: user?.authenticated,
        isSubscriptionExpire: user?.isSubscriptionExpire,
        permissions: user?.permissions ?? [],
        subscription: user?.subscription ?? {},
        setAuthUpdate: setAuthUpdate,
        filteredMenu: getFilteredMenu(), // Expose the filtered menu
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
