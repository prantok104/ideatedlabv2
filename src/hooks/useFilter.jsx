import { useApp } from "@/contexts/AppContext";
import {
  buildRouterUrl,
  getFilterKeyName,
  updateQueryParams,
} from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFilter(defaultFilter = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { appConfig, updateAppConfig } = useApp();

  const [filter, setFilter] = useState({});
  let docType = getFilterKeyName();
  const pagination = {
    page: 1,
    limit: 10,
  };

  useEffect(() => {
    const queryParams = appConfig?.[docType]?.query || {};
    let formatFilter = {
      ...pagination,
      ...defaultFilter,
      ...{
        ...Object.fromEntries(searchParams),
      },
      ...queryParams,
    };

    setFilter(formatFilter);
    router.replace(
      buildRouterUrl(pathname, {
        query: Object.keys(formatFilter).reduce((acc, key) => {
          acc[key] = formatFilter[key];
          return acc;
        }, {}),
      })
    );
  }, [
    pathname,
    appConfig?.[docType]?.query,
    Object.keys(defaultFilter).length > 0,
  ]);

  // return {
  //   filter,
  //   setFilter,
  // };
  return {
    filter,
    setFilter: (params, filterKey = null) =>
      updateQueryParams(appConfig, updateAppConfig, params),
  };
}
