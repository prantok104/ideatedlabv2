export const REGISTER_ROUTE = "/auth/create-account";
export const SEND_OTP_ROUTE = "/auth/get-otp";
export const VERIFY_OTP_ROUTE = "/auth/verify-otp";

export const LOGIN_ROUTE = "/auth/login";
export const FORGET_PASSWORD_ROUTE = "/auth/forget-password";
export const LINK_SENT = "/auth/forget-password/link-sending";
export const SET_PASSWORD = "/auth/forget-password/set-password";
export const SUBSCRIPTION_EXPIRE_ROUTE = "/error/subscription-expire";
export const SUBSCRIPTION_EXPIRED_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const HOME = "/";
export const OTP_VERIFY_ROUTE = "/auth/verify-otp";
export const UNAUTHORIZED_ROUTE = "/unauthorized";
export const freeRouter = [
  REGISTER_ROUTE,
  HOME,
  LOGIN_ROUTE,
  SEND_OTP_ROUTE,
  FORGET_PASSWORD_ROUTE,
  LINK_SENT,
  SET_PASSWORD,
];

export const ADMIN_BASE_ROUTE = "/admin";
export const SHIPPER_BASE_ROUTE = "/shipper";

export const SHIPPER = {
  POST_NEW_SHIPMENT: `${SHIPPER_BASE_ROUTE}/shipment/post-new-shipment`,
  GET_SHIPMENT_DEATILS: `${SHIPPER_BASE_ROUTE}/shipment`,
};

export const BILLING_INVOICE = "/shipper/settings/billing-invoices";

export const ADMIN_SUBSCRIPTION_MODULE = {
  PACAKGES: "/admin/subscription/packages",
};

// admin --- member route
export const ADMIN_MEMBER_MODULE = {
  MEMBER: "/admin/members",
  VERIFIED_MEMBER: "/admin/members/verified",
  UNVERIFIED_MEMBER: "/admin/members/unverified",
  SUBSCRIBER: "/admin/members/subscriber",
};

export const ADMIN_SUBSCRIPTION_PLAN = "/admin/subscription/packages";
export const ADMIN_COMPANIES_LIST = "/admin/companies";
export const ADMIN_CONTACT = "/contact"; // it will come in future
export const ADMIN_NOTIFICATION = ""; // it will come in future
export const ADMIN_ANNOUNCEMENT = ""; // it will come in future
export const ADMIN_SHIPMENT = ""; // it will come in future

// shipment route here
export const SHIPPER_SHIPMENT = "/shipper/shipment";
export const SHIPPER_PRIVATE_NETWORK = "/private-network"; // it will come in future
export const SHIPPER_SEARCH_TRUCK = ""; // it will come in future

// carrier route here
export const CARRIER_SEARCH_LOADS = "/carrier/loads/search-loads";
export const CARRIER_MY_LOAD = "/carrier/loads/my-load";
export const CARRIER_MY_LOADS = "/carrier/my-loads";
export const CARRIER_BIDDING = "/carrier/bids"; // it will come in future
export const CARRIER_COMPANY = "";
export const CARRIER_PRIVATE_LOADS = "/carrier/loads/private-loads";
export const CARRIER_AUTO_MATCH = "/carrier/auto-match";
export const CARRIER_POST_TRUCK = "/carrier/truck/post-truck";
export const CARRIER_TRUCK_LIST = "/carrier/truck-list"; // it will come in future
export const CARRIER_DRIVER = "/carrier/driver"; // it will come in future
export const CARRIER_DRIVER_DETAILS = "/carrier/driver-details";

// SETTINGS
export const SETTINGS_COMPNAY_PROFILE = "/settings/company-profile";
export const SETTINGS_USERS = "/settings/users";
export const SETTINGS_USERS_CREATE = "/settings/users/create";
export const SETTINGS_ROLES = "/settings/roles";
export const SETTINGS_ROLES_CREATE = "/settings/roles/create";
export const SETTINGS_BILLING_AND_INVOICES = "/settings/billing-and-invoices";
export const USER_SELECTED_PACKAGE = "/settings/plans";

// SUBSCRIPTIONS
export const SUBSCRIPTION_PACKAGES_PLAN = "/subscription";
export const SUBSCRIPTION_PACKAGES_PLAN_CREATE = "/subscription/create";
export const BROWSE_TRANSACTION_ROUTE = "/transactions";
