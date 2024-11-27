export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const IS_USER_VERIFY = "isUserVerified";

export const HTTP_OK = 200;
export const HTTP_CREATED = 201;

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const USER_TYPE_ADMIN = "Admin";
export const USER_TYPE_CARRIER = "Carrier";
export const USER_TYPE_SHIPPER = "Shipper";
export const USER_TYPE_BROKER = "Broker";

export const USER_RESPONSIBILITY_ADMIN = "Admin";
export const USER_RESPONSIBILITY_MAINTAINER = "Maintainer";

export const USER_VERIFICATION_TYPE_EMAIL = "Email";
export const USER_VERIFICATION_TYPE_PHONE = "Phone";

export const USER_VERIFICATION_PURPOSE_NEW = "New";
export const USER_VERIFICATION_PURPOSE_RENEW = "Renew";

export const DOC_STATUS_ACTIVE = "Active";
export const DOC_STATUS_IN_ACTIVE = "InActive";
export const DOC_STATUS_PENDING = "Pending";

export const DOC_ORDER_DIRECETION_DESC = "desc";
export const DOC_ORDER_DIRECETION_ASC = "asc";

export const SUBSCRIPTION_TYPE_FREE = "Free";
export const SUBSCRIPTION_TYPE_PREMIUM = "Premium";
export const SUBSCRIPTION_TYPE_ENTERPRISE = "Enterprise";
export const SUBSCRIPTION_TYPE_CUSTOM = "Custom";

export const SUBSCRIPTION_TYPES = [
  { label: SUBSCRIPTION_TYPE_FREE, value: SUBSCRIPTION_TYPE_FREE },
  { label: SUBSCRIPTION_TYPE_PREMIUM, value: SUBSCRIPTION_TYPE_PREMIUM },
  { label: SUBSCRIPTION_TYPE_ENTERPRISE, value: SUBSCRIPTION_TYPE_ENTERPRISE },
  { label: SUBSCRIPTION_TYPE_CUSTOM, value: SUBSCRIPTION_TYPE_CUSTOM },
];

export const SUBSCRIPTION_DURATION_TYPE_MONTHLY = "Monthly";
export const SUBSCRIPTION_DURATION_TYPE_YEARLY = "Yearly";
export const SUBSCRIPTION_DURATION_TYPE_HALF_YEARLY = "HalfYearly";
export const SUBSCRIPTION_DURATION_TYPE_QUATERLY = "Quaterly";

export const SUBSCRIPTION_DURATION_TYPES = [
  {
    label: SUBSCRIPTION_DURATION_TYPE_MONTHLY,
    value: SUBSCRIPTION_DURATION_TYPE_MONTHLY,
  },
  {
    label: SUBSCRIPTION_DURATION_TYPE_YEARLY,
    value: SUBSCRIPTION_DURATION_TYPE_YEARLY,
  },
  {
    label: SUBSCRIPTION_DURATION_TYPE_HALF_YEARLY,
    value: SUBSCRIPTION_DURATION_TYPE_HALF_YEARLY,
  },
  {
    label: SUBSCRIPTION_DURATION_TYPE_QUATERLY,
    value: SUBSCRIPTION_DURATION_TYPE_QUATERLY,
  },
];

export const MODULE_ADMIN = "Admin";
export const MODULE_CARRIER = "Carrier";
export const MODULE_SHIPPER = "Shipper";
export const MODULE_BROKER = "Broker";

export const MODULE_TYPES = [
  { label: MODULE_CARRIER, value: MODULE_CARRIER },
  { label: MODULE_SHIPPER, value: MODULE_SHIPPER },
  { label: MODULE_BROKER, value: MODULE_BROKER },
];

export const USER_OTP_TYPE_EMAIL = "Email";
export const USER_OTP_TYPE_PHONE = "Phone";

export const CURRENT_APP = "current_workspace";

export const SHIPPER = { POST_CREATE: "/shipper/shipment/post-new-shipment" };
export const USER_PROFILE = "user-managment/user-profile";

export const SHIPPER_SETTINGS_COMPANY_PROFILE = "/settings/company-profile";
export const SETTINGS_USER_MANAGMENT = "/settings/users-managment";
export const SETTINGS_TRANSACTION = "/settings/transactions";

export const REGISTERED_EMAIL = "registered_email";

export const UNVERIFIED = "Unverified";

export const MEMBERS_STATUS = {
  VERIFIED: "Verified",
  UNVERIFIED: "Unverified",
  SUBSCRIBED: "Subscribed",
  MEMBER: "Member",
};

export const ACTION_TYPES = {
  VIEW: "VIEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  STATUS: "STATUS",
};

export const PACKAGE_FEATURES = [
  "Get a fully designed Website.",
  "Unlimited Support",
  "Get a Unlimited Page",
  "24/7 Support system",
];

// Talk to piyal bhai need to add static constant from env variable
export const REDIRECT_URL = {
  SUCCESS: "/shipper/settings/subscriptions",
  FAILED: "/shipper/settings/subscriptions",
};

export const REDIRECT_RESET_URL = {
  URL: "/auth/set-password",
};

export const CURRENCY_USD = "USD";
export const CURRENCY_SAR = "SAR";

export const CURRENCY_TYPES = [
  { label: "United States Dollar", value: CURRENCY_USD },
  { label: "Saudi Riyal", value: CURRENCY_SAR },
];

export const MENU_SHOW_IN_SIDEBAR = "sidebar";

// wquipmentTupe

export const EQUIPMENT_TYPES = [
  { label: "Full", value: "full" },
  { label: "Partial", value: "partial" },
];

// avavabile type
export const AVAILABILITY_TYPES = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const ratingOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

export const driverTruckData = [
  {
    id: 1,
    icon: "/asset/truck-overview-icons/ri_user-line-blue.svg",
    bgColor: "#DDEFFF",
    title: "Total Driver",
    count: "3,654",
  },
  {
    id: 2,
    icon: "/asset/truck-overview-icons/green-user.svg",
    bgColor: "#DDFFE1",
    title: "Active Driver",
    count: "2,200",
  },
  {
    id: 3,
    icon: "/asset/truck-overview-icons/red-use-icon.svg",
    bgColor: "#FFE4DD",
    title: "Block Driver",
    count: "50",
  },

  {
    id: 4,
    icon: "/asset/truck-overview-icons/ri_user-line-litegreen.svg",
    bgColor: "#F3FFDD",
    title: "Inactive Driver",
    count: "10",
  },
];

export const driverList = [
  {
    id: 1,
    driverId: "D001",
    driverName: "John Doe",
    phoneNumber: "123-456-7890",
    email: "johndoe@example.com",
    address: "123 Elm Street, Springfield",
    rating: 4.5,
    attachmentCount: 3,
    Status: "Active",
  },
  {
    id: 2,
    driverId: "D002",
    driverName: "Jane Smith",
    phoneNumber: "987-654-3210",
    email: "janesmith@example.com",
    address: "456 Oak Avenue, Shelbyville",
    rating: 3.8,
    attachmentCount: 5,
    Status: "Subscribed",
  },
  {
    id: 3,
    driverId: "D003",
    driverName: "Bob Brown",
    phoneNumber: "555-123-4567",
    email: "bobbrown@example.com",
    address: "789 Maple Drive, Capital City",
    rating: 4.2,
    attachmentCount: 2,
    Status: "Pending",
  },
  {
    id: 4,
    driverId: "D004",
    driverName: "Alice White",
    phoneNumber: "555-987-6543",
    email: "alicewhite@example.com",
    address: "101 Pine Road, Ogdenville",
    rating: 2.5,
    attachmentCount: 1,
    Status: "Unverified",
  },
  {
    id: 5,
    driverId: "D005",
    driverName: "Tom Green",
    phoneNumber: "444-567-8910",
    email: "tomgreen@example.com",
    address: "202 Cedar Street, North Haverbrook",
    rating: 4.9,
    attachmentCount: 4,
    Status: "Banned",
  },
  {
    id: 6,
    driverId: "D006",
    driverName: "Sara Black",
    phoneNumber: "333-678-9012",
    email: "sarablack@example.com",
    address: "303 Birch Lane, Brockway",
    rating: 3.0,
    attachmentCount: 0,
    Status: "Suspended",
  },
];

export const driverDetailsCard = [
  {
    id: 1,
    icon: "/asset/truck-overview-icons/total-load-completed.svg",
    bgColor: "#DDEFFF",
    title: "Total Load Completed",
    count: "3,654",
  },

  {
    id: 2,
    icon: "/asset/truck-overview-icons/load-in-progress.svg",
    bgColor: "#DDFFE1",
    title: "Load in Progress",
    count: "20",
  },

  {
    id: 3,
    icon: "/asset/truck-overview-icons/upcoming-load.svg",
    bgColor: "#FFE4DD",
    title: "Upcoming load",
    count: "10",
  },
];

export const loadList = [
  {
    id: 1,
    loadId: "L001",
    pickupLocation: "Los Angeles, CA",
    dropoffLocation: "New York, NY",
    trailerType: "Refrigerated",
    company: "Fresh Logistics",
    companyLogo: "/path/to/company-logo-1.png", // Replace with the actual path to the image
    rate: 4.5,
    star: "/path/to/star-icon.png", // Replace with the actual path to the star image
    Status: "Active",
  },
  {
    id: 2,
    loadId: "L002",
    pickupLocation: "Houston, TX",
    dropoffLocation: "Chicago, IL",
    trailerType: "Flatbed",
    company: "Speed Transport",
    companyLogo: "/path/to/company-logo-2.png",
    rate: 3.8,
    star: "/path/to/star-icon.png",
    Status: "Pending",
  },
  {
    id: 3,
    loadId: "L003",
    pickupLocation: "San Francisco, CA",
    dropoffLocation: "Seattle, WA",
    trailerType: "Dry Van",
    company: "Pacific Haulers",
    companyLogo: "/path/to/company-logo-3.png",
    rate: 4.0,
    star: "/path/to/star-icon.png",
    Status: "Subscribed",
  },
  {
    id: 4,
    loadId: "L004",
    pickupLocation: "Miami, FL",
    dropoffLocation: "Atlanta, GA",
    trailerType: "Tanker",
    company: "Sunshine Freight",
    companyLogo: "/path/to/company-logo-4.png",
    rate: 4.7,
    star: "/path/to/star-icon.png",
    Status: "Banned",
  },
  {
    id: 5,
    loadId: "L005",
    pickupLocation: "Dallas, TX",
    dropoffLocation: "Denver, CO",
    trailerType: "Lowboy",
    company: "Heavy Haul Co.",
    companyLogo: "/path/to/company-logo-5.png",
    rate: 4.2,
    star: "/path/to/star-icon.png",
    Status: "Suspended",
  },
];

export const unitOptions = [
  { label: "ft", value: "ft" },
  { label: "m", value: "m" },
  { label: "lbs", value: "lbs" },
  { label: "kg", value: "kg" },
];

export const loadOptions = [
  {
    label: "Full",
    value: "full",
  },
  {
    label: "Partial",
    value: "partial",
  },
];

export const truckPostedList = [
  {
    id: 1,
    truckNumber: "T123",
    truckName: "Truck A",
    pickupLocation: "Los Angeles, CA",
    dropoffLocation: "Chicago, IL",
    dh: "50 miles",
    trailer: "Flatbed",
    assign: "Driver A",
    size: "20 ft",
    preferredContact: "John Doe",
    Status: "Active",
  },
  {
    id: 2,
    truckNumber: "T456",
    truckName: "Truck B",
    pickupLocation: "Houston, TX",
    dropoffLocation: "Phoenix, AZ",
    dh: "30 miles",
    trailer: "Reefer",
    assign: "Driver B",
    size: "40 ft",
    preferredContact: "Jane Smith",
    Status: "Pending",
  },
  {
    id: 3,
    truckNumber: "T789",
    truckName: "Truck C",
    pickupLocation: "Miami, FL",
    dropoffLocation: "New York, NY",
    dh: "70 miles",
    trailer: "Dry Van",
    assign: "Driver C",
    size: "60 ft",
    preferredContact: "Bob Johnson",
    Status: "Subscribed",
  },
  {
    id: 4,
    truckNumber: "T101",
    truckName: "Truck D",
    pickupLocation: "San Francisco, CA",
    dropoffLocation: "Seattle, WA",
    dh: "90 miles",
    trailer: "Tanker",
    assign: "Driver D",
    size: "80 ft",
    preferredContact: "Alice Brown",
    Status: "Unverified",
  },
  {
    id: 5,
    truckNumber: "T202",
    truckName: "Truck E",
    pickupLocation: "Atlanta, GA",
    dropoffLocation: "Orlando, FL",
    dh: "25 miles",
    trailer: "Car Carrier",
    assign: "Driver E",
    size: "30 ft",
    preferredContact: "Tom White",
    Status: "Banned",
  },
];

export const LENGTH_UNIT_METER = "m";
export const LENGTH_UNIT_KILOMETER = "km";
export const LENGTH_UNIT_CENTIMETER = "cm";
export const LENGTH_UNIT_MILLIMETER = "mm";
export const LENGTH_UNIT_MILE = "mi";
export const LENGTH_UNIT_YARD = "yd";
export const LENGTH_UNIT_FOOT = "ft";
export const LENGTH_UNIT_INCH = "in";
export const LENGTH_UNIT_NAUTICAL_MILE = "nautical miles";

export const WEIGHT_UNIT_KILOGRAM = "kg";
export const WEIGHT_UNIT_GRAM = "g";
export const WEIGHT_UNIT_MILLIGRAM = "mg";
export const WEIGHT_UNIT_TONNE = "t";
export const WEIGHT_UNIT_POUND = "lb";
export const WEIGHT_UNIT_OUNCE = "oz";
export const WEIGHT_UNIT_STONE = "st";

export const lenghtUnits = [
  { label: LENGTH_UNIT_METER, value: LENGTH_UNIT_METER },
  { label: LENGTH_UNIT_KILOMETER, value: LENGTH_UNIT_KILOMETER },
  { label: LENGTH_UNIT_CENTIMETER, value: LENGTH_UNIT_CENTIMETER },
  { label: LENGTH_UNIT_MILLIMETER, value: LENGTH_UNIT_MILLIMETER },
  { label: LENGTH_UNIT_MILE, value: LENGTH_UNIT_MILE },
  { label: LENGTH_UNIT_YARD, value: LENGTH_UNIT_YARD },
  { label: LENGTH_UNIT_FOOT, value: LENGTH_UNIT_FOOT },
  { label: LENGTH_UNIT_INCH, value: LENGTH_UNIT_INCH },
  { label: LENGTH_UNIT_NAUTICAL_MILE, value: LENGTH_UNIT_NAUTICAL_MILE },
];

export const weightUnits = [
  { label: WEIGHT_UNIT_KILOGRAM, value: WEIGHT_UNIT_KILOGRAM },
  { label: WEIGHT_UNIT_GRAM, value: WEIGHT_UNIT_GRAM },
  { label: WEIGHT_UNIT_MILLIGRAM, value: WEIGHT_UNIT_MILLIGRAM },
  { label: WEIGHT_UNIT_TONNE, value: WEIGHT_UNIT_TONNE },
  { label: WEIGHT_UNIT_POUND, value: WEIGHT_UNIT_POUND },
  { label: WEIGHT_UNIT_OUNCE, value: WEIGHT_UNIT_OUNCE },
  { label: WEIGHT_UNIT_STONE, value: WEIGHT_UNIT_STONE },
];


export const ACCEPTENCE_STATUS = {
  ACCEPTED: "Accepted",
  TRUCK_ASSIGNED: "TruckAssigned",
  DRIVER_ASSIGNED: "DriverAssigned",
  SCHEDULE_PICKUP: "ScheduledForPickUp",
  AT_PICKUP: "AtPickUp",
  IN_TRANSIT: "InTransit",
  AT_DROPOFF: "AtDropOff",
  DELIVERED: "Delivered",
};
export const  RECENT_SEARCH_LOAD = "recentLoadSearch";
export const  SAVE_SEARCH_LOAD = "saveLoadSearch";

export const SHIPMENT_STATUS_DRAFT = "Draft";
export const SHIPMENT_STATUS_RUNNING = "Running";
export const SHIPMENT_STATUS_PUBLISHED = "Published";
export const SHIPMENT_STATUS_IN_REVIEW = "InReview";
export const SHIPMENT_STATUS_HISTORY = "History";
export const SHIPMENT_STATUS_PENDING = "Pending";
export const SHIPMENT_STATUS_ACCEPTED = "Accepted";
export const SHIPMENT_STATUS_TRUCK_ASSIGNED = "TruckAssigned";
export const SHIPMENT_STATUS_DRIVER_ASSIGNED = "DriverAssigned";
export const SHIPMENT_STATUS_SCHEDULED_FOR_PICK_UP = "ScheduledForPickUp";
export const SHIPMENT_STATUS_AT_PICK_UP = "AtPickUp";
export const SHIPMENT_STATUS_IN_TRANSIT = "InTransit";
export const SHIPMENT_STATUS_AT_DROP_OFF = "AtDropOff";
export const SHIPMENT_STATUS_DELIVERED = "Delivered";
export const SHIPMENT_STATUS_PARTIALLY_DELIVERED = "PartiallyDelivered";
export const SHIPMENT_STATUS_AT_RISK = "AtRisk";
export const SHIPMENT_STATUS_WAITING = "Waiting";