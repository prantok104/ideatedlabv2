import {
  ACCESS_TOKEN_KEY,
  CURRENT_APP,
  IS_USER_VERIFY,
  REFRESH_TOKEN_KEY,
  REGISTERED_EMAIL,
} from "@/utils/static-const";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import { isNil, omitBy } from "lodash";
import queryString from "query-string";
import { LiaTimesCircle } from "react-icons/lia";
import { toast } from "sonner";
/**
 * Retrieves the authentication token from cookies.
 * @returns The authentication token or null if not found.
 */
export function getAccessToken() {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function getUserVeirfy() {
  return getCookie(IS_USER_VERIFY);
}

/**
 * Sets the authentication token in cookies.
 * @param token - The authentication token to be set.
 */
export function setAuthToken(token) {
  setCookie(ACCESS_TOKEN_KEY, token?.accessToken);
  setCookie(REFRESH_TOKEN_KEY, token?.refreshToken);
  setCookie(IS_USER_VERIFY, token?.isUserVerified);
}

export function removeAuthToken() {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(IS_USER_VERIFY);
}

export const parseResponse = (response) => {
  const finalResponse = response?.data ?? response?.response?.data;
  // console.log(finalResponse, response);

  const {
    data = {},
    limit,
    page,
    total,
    errors,
    status,
    message,
    statusText,
  } = finalResponse;

  /**
   * Ongoing changes to remove null and undefined values from the response
   * @param {Object} obj - The object to be filtered
   * @returns {Object} - The filtered object without null and undefined values
   */

  return omitBy(
    {
      status: status,
      message: message ?? statusText,
      data: data,
      page,
      limit,
      total,
      errors,
    },
    isNil
  );
};

export const NOTIFY_MESSAGE_SUCCESS = 200;
export const NOTIFY_MESSAGE_WARNING = 422;
export const NOTIFY_MESSAGE_INFO = 100;
export const NOTIFY_MESSAGE_ERROR = 500;

// export const notify = (message, statusCode) => {
//   switch (statusCode) {
//     case NOTIFY_MESSAGE_SUCCESS:
//       toast.success(message, {
//         position: "top-right",
//       });
//       break;
//     case NOTIFY_MESSAGE_ERROR:
//       toast.error(message, {
//         position: "top-right",
//       });
//       break;
//     case NOTIFY_MESSAGE_WARNING:
//       toast.warn(message, {
//         position: "top-right",
//       });
//       break;
//     default:
//       toast.error(message, {
//         position: "top-right",
//       });
//   }
// };

export const notify = (message, statusCode, description = "") => {
  let icon, style;
  switch (statusCode) {
    case NOTIFY_MESSAGE_SUCCESS:
      icon = "notify_success";
      style = { background: "#00AB5529" };
      break;
    case NOTIFY_MESSAGE_ERROR:
      icon = "notify_error";
      style = { background: "#F42B0329" };
      break;
    case NOTIFY_MESSAGE_WARNING:
      icon = "notify_warning";
      style = { background: "#FFAB0029" };
      break;
    case NOTIFY_MESSAGE_INFO:
      icon = "notify_info";
      style = { background: "#00B8D929" };
      break;
    default:
      icon = "notify_error";
      style = { background: "#F42B0329" };
      break;
  }

  const toastId = toast(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "7px 4px",
        gap: "12px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* {icon && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              padding: "8px",
              width: "40px",
              height: "40px",
              ...style,
            }}
          >
            <SmartIcon
              name={icon}
              style={{ fontSize: icon == "notify_warning" ? "35" : "20px" }}
            />
          </span>
        )} */}
        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              color: "#212B36",
            }}
          >
            {message}
          </p>
          {description && <p style={{ fontSize: "0.9em" }}>{description}</p>}
        </div>
      </div>

      <button
        aria-label="Close toast"
        onClick={() => toast.dismiss(toastId)}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <LiaTimesCircle />
      </button>
    </div>
  );
  return toastId;
};


export function setCurrentApp(app) {
  setCookie(CURRENT_APP, app);
}

export function getCurrentApp() {
  return getCookie(CURRENT_APP);
}

export function buildRouterUrl(url, options = {}) {
  let routerUrl = url;
  if (Object.keys(options).includes("params")) {
    let replacer = options?.params || {};
    let replacedValue = Object.keys(replacer).map((itemIndex) => {
      routerUrl = routerUrl.replace(`:${itemIndex}`, replacer[itemIndex]);
      return routerUrl;
    });
    routerUrl = replacedValue[replacedValue.length - 1];
  } else if (Object.keys(options).includes("query")) {
    routerUrl += `?${queryString.stringify(options?.query || {})}`;
  }
  return routerUrl;
}

export function getFilterKeyName() {
  return (
    "filter_" +
    (window.location.pathname || "")
      .split(/[^a-zA-Z0-9\\s]+/)
      .filter(Boolean)
      .join("_")
  );
}

export const updateQueryParams = (appConfig, updateAppConfig, params) => {
  const docType = getFilterKeyName();
  const existingQueryData = appConfig?.[docType]?.query ?? {};
  const existingData = appConfig?.[docType] ?? {};
  const updatedQueryData = { ...existingQueryData, ...params };
  updateAppConfig({
    ...appConfig,
    [docType]: {
      ...existingData,
      query: updatedQueryData,
    },
  });
};

export const updateAppConfigData = (appConfig, updateAppConfig, params) => {
  const docType = getFilterKeyName();
  const existingData = appConfig?.[docType] ?? {};
  const updatedQueryData = { ...existingData, ...params };
  updateAppConfig({
    ...appConfig,
    [docType]: {
      ...updatedQueryData,
    },
  });
};

export function setRegistedEmail(email) {
  setCookie(REGISTERED_EMAIL, email);
}
export function getRegistedEmail() {
  return getCookie(REGISTERED_EMAIL);
}
export function removeRegistedEmail() {
  deleteCookie(REGISTERED_EMAIL);
}
export function isUserVerified() {
  return getCookie("isUserVerified") === "true"; // Ensure it checks the correct cookie and compares as string
}

// serial number for table
export function rowIndex(rows) {
  return {
    name: "Serial",
    cell: (row, index) =>
      (Number(rows?.page ?? 1) - 1) * Number(rows?.limit ?? 10) + (index + 1),
    maxWidth: "80px",
    minWidth: "80px",
  };
}


// Human readable time
export function humanReadableDate(date) {
  const now = dayjs();
  const target = dayjs(date);

  const isFuture = target.isAfter(now);
  const diffInSeconds = Math.abs(now.diff(target, "second"));
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const hours = diffInHours % 24;
  const minutes = diffInMinutes % 60;

  let result;

  if (diffInDays > 0) {
    result = `${diffInDays}d${diffInDays > 1 ? "s" : ""} ${hours}h${
      hours !== 1 ? "s" : ""
    }`;
  } else if (diffInHours > 0) {
    result = `${diffInHours}h${diffInHours !== 1 ? "s" : ""} ${minutes}m${
      minutes !== 1 ? "s" : ""
    }`;
  } else if (diffInMinutes > 0) {
    result = `${diffInMinutes}m${diffInMinutes !== 1 ? "s" : ""}`;
  } else {
    result = `${diffInSeconds}s`;
  }

  return isFuture ? `${result} from now` : `${result} ago`;
}

// ! Set Search load with expiry in local storage
export const setLocalStorageWithExpiry = (key, value, expiryInHours = 24) => {
  const expiryTimestamp = new Date().getTime() + expiryInHours * 60 * 60 * 1000;
  const data = {
    value,
    expiry: expiryTimestamp
  };
  localStorage.setItem(key, JSON.stringify(data));
}

// ! Get Search load with expiry from Local storage
export const getLocalStorageWithExpiry = (key) => {
  if(typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  if(!data) return null;
  const parseData = JSON.parse(data);
  if(new Date().getTime() > parseData.expiry){
    localStorage.removeItem(key);
    return null;
  }
  return parseData.value;
}

const areItemsEqual = (item1, item2) => {
  const keys1 = Object.keys(item1).filter(
    (key) => key !== "expiry" && key !== "id" && key !== "timer"
  );
  const keys2 = Object.keys(item2).filter(
    (key) => key !== "expiry" && key !== "id" && key !== "timer"
  );

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => JSON.stringify(item1[key]) === JSON.stringify(item2[key]));
};

// ! Update search load in localstorage
export const updateLocalStorageArray = (key, newItem, maxItems = 10) => {
  const existingData = getLocalStorageWithExpiry(key) || [];
  const filteredData = existingData.filter(
    (item) => !areItemsEqual(item, newItem)
  );
  const updatedData = [
    ...filteredData,
    {
      ...newItem,
      expiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 24-hour expiry
    },
  ];
  const finalData = updatedData.slice(-maxItems);
  setLocalStorageWithExpiry(key, finalData);
} 

// Manual UUID generation
export const  generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}