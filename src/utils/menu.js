import { AiOutlineProfile } from "react-icons/ai";
import { BiDollarCircle, BiUser } from "react-icons/bi";
import { BsBoxes, BsSend, BsSubstack } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LiaIndustrySolid, LiaTruckLoadingSolid } from "react-icons/lia";
import {
  MdDashboardCustomize,
  MdOutlineAnnouncement,
  MdOutlineAutoAwesomeMotion,
  MdOutlineNotificationAdd,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {
  ADD_TRUCK_POST,
  ADMIN_ANNOUNCEMENTS,
  ADMIN_BROWSE_COMPANIES,
  ADMIN_NOTIFICATIONS,
  ADMIN_SHIPMENTS,
  AUTO_MATCH,
  BROWSE_ADMIN_CONTACT,
  BROWSE_BIDDING_LIST,
  BROWSE_BILL_AND_INVOICE,
  BROWSE_DRIVER_LIST,
  BROWSE_LOAD_SEARCH,
  BROWSE_MEMBER,
  BROWSE_MY_LOAD,
  BROWSE_ONBOARDING_COMPANY,
  BROWSE_PRIVATE_LOADS,
  BROWSE_PRIVATE_NETWORK,
  BROWSE_ROLE,
  BROWSE_SEARCH_TRUCK,
  BROWSE_SHIPMENT,
  BROWSE_SUBSCRIPTION,
  BROWSE_SUBSCRIPTION_PLAN,
  BROWSE_TRANSACTION,
  BROWSE_TRUCK_POST_LIST,
  BROWSE_USER,
  MODULE_DASHBOARD,
  MODULE_SETTING,
  SETTINGS_COMPNAY_PROFILES,
} from "./permission";
import { GrTransaction } from "react-icons/gr";
import { RiChatPrivateLine } from "react-icons/ri";
import { LuContact2, LuPackageSearch } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { PiWheelchair } from "react-icons/pi";
import {
  ADMIN_ANNOUNCEMENT,
  ADMIN_COMPANIES_LIST,
  ADMIN_CONTACT,
  ADMIN_MEMBER_MODULE,
  ADMIN_NOTIFICATION,
  ADMIN_SHIPMENT,
  BROWSE_TRANSACTION_ROUTE,
  CARRIER_AUTO_MATCH,
  CARRIER_BIDDING,
  CARRIER_COMPANY,
  CARRIER_DRIVER,
  CARRIER_MY_LOADS,
  CARRIER_POST_TRUCK,
  CARRIER_PRIVATE_LOADS,
  CARRIER_SEARCH_LOADS,
  CARRIER_TRUCK_LIST,
  DASHBOARD_ROUTE,
  SETTINGS_BILLING_AND_INVOICES,
  SETTINGS_COMPNAY_PROFILE,
  SETTINGS_ROLES,
  SETTINGS_USERS,
  SHIPPER_PRIVATE_NETWORK,
  SHIPPER_SEARCH_TRUCK,
  SHIPPER_SHIPMENT,
  SUBSCRIPTION_PACKAGES_PLAN,
  USER_SELECTED_PACKAGE,
} from "./router";

export const menu = [
  {
    id: DASHBOARD_ROUTE,
    icon: <RxDashboard size={20} />,
    routeName: "Dashboard",
    link: DASHBOARD_ROUTE,
    permission: MODULE_DASHBOARD,
  },

  // admin
  {
    id: ADMIN_MEMBER_MODULE.MEMBER,
    icon: <MdDashboardCustomize size={20} />,
    routeName: "Member",
    link: ADMIN_MEMBER_MODULE.MEMBER,
    permission: BROWSE_MEMBER,
    // isDropdown: true,
    // dropdownItems: [
    //   {
    //     id: ADMIN_MEMBER_MODULE.MEMBER,
    //     icon: <FaRegUserCircle size={20} />,
    //     name: "Member",
    //     link: ADMIN_MEMBER_MODULE.MEMBER,
    //     permission: BROWSE_MEMBER,
    //   },
    //   {
    //     id: ADMIN_MEMBER_MODULE.VERIFIED_MEMBER,
    //     icon: <FaRegUserCircle size={20} />,
    //     name: "Verified",
    //     link: ADMIN_MEMBER_MODULE.VERIFIED_MEMBER,
    //     permission: BROWSE_MEMBER,
    //   },
    //   // {
    //   //   id: ADMIN_MEMBER_MODULE.UNVERIFIED_MEMBER,
    //   //   icon: <GoUnverified className="whitespace-nowrap" size={20} />,
    //   //   name: "Unverified",
    //   //   link: ADMIN_MEMBER_MODULE.UNVERIFIED_MEMBER,
    //   //   permission: BROWSE_UNVERIFIED_MEMBER,
    //   // },
    //   {
    //     id: ADMIN_MEMBER_MODULE.SUBSCRIBER,
    //     icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
    //     name: "Subscriber",
    //     link: ADMIN_MEMBER_MODULE.SUBSCRIBER,
    //     permission: BROWSE_MEMBER,
    //   },
    // ],
  },
  {
    id: ADMIN_COMPANIES_LIST,
    icon: <LiaIndustrySolid size={20} />,
    routeName: "Company-list",
    link: ADMIN_COMPANIES_LIST,
    permission: ADMIN_BROWSE_COMPANIES,
  },
  {
    id: SUBSCRIPTION_PACKAGES_PLAN,
    icon: <BsSubstack size={20} />,
    routeName: "Subscription",
    link: SUBSCRIPTION_PACKAGES_PLAN,
    permission: BROWSE_SUBSCRIPTION,
  },
  //   contact channel menu, which we can find from where the lead come from (website, app, etc)
  // {
  //   id: ADMIN_CONTACT,
  //   icon: <LuContact size={20} />,
  //   routeName: "Contact",
  //   link: ADMIN_CONTACT,
  //   permission: ADMIN_CONTACTS, // Permission is undefined
  // },
  {
    id: ADMIN_NOTIFICATION,
    icon: <MdOutlineNotificationAdd size={20} />,
    routeName: "Notification",
    link: ADMIN_NOTIFICATION,
    permission: ADMIN_NOTIFICATIONS, // Permission is undefined
  },
  {
    id: ADMIN_ANNOUNCEMENT,
    icon: <MdOutlineAnnouncement size={20} />,
    routeName: "Announcement",
    link: ADMIN_ANNOUNCEMENT,
    permission: ADMIN_ANNOUNCEMENTS, // Permission is undefined
  },
  {
    id: ADMIN_SHIPMENT,
    icon: <MdOutlineAnnouncement size={20} />,
    routeName: "Shipment",
    link: ADMIN_SHIPMENT,
    permission: ADMIN_SHIPMENTS, // Permission is undefined
  },
  // --------------- admin menu end -------------------

  // shipper menu

  {
    id: SHIPPER_SHIPMENT,
    icon: <BsBoxes size={20} />,
    routeName: "Shipment",
    link: SHIPPER_SHIPMENT,
    permission: BROWSE_SHIPMENT,
  },
  {
    id: SHIPPER_PRIVATE_NETWORK,
    icon: <RiChatPrivateLine size={20} />,
    routeName: "Private Network",
    link: SHIPPER_PRIVATE_NETWORK,
    permission: BROWSE_PRIVATE_NETWORK, // Permission may need clarification
  },
  {
    id: SHIPPER_SEARCH_TRUCK,
    icon: <FiTruck size={20} />,
    routeName: "Search Truck",
    link: SHIPPER_SEARCH_TRUCK,
    permission: BROWSE_SEARCH_TRUCK,
  },

  // -----------shipper menu end ---------------

  // carrier menu
  // {
  //   id: CARRIER_SEARCH_LOADS,
  //   icon: <LuPackageSearch size={20} />,
  //   routeName: "Search Loads",
  //   link: CARRIER_SEARCH_LOADS,
  //   permission: MODULE_DASHBOARD,
  // },
  {
    id: "carrier_loads_search-load",
    icon: <LuPackageSearch size={20} />,
    routeName: "Search Loads",
    link: CARRIER_SEARCH_LOADS,
    permission: BROWSE_LOAD_SEARCH,
  },
  {
    id: CARRIER_MY_LOADS,
    icon: <LiaTruckLoadingSolid size={20} />,
    routeName: "My Loads",
    link: CARRIER_MY_LOADS,
    permission: BROWSE_MY_LOAD,
  },
  {
    id: CARRIER_BIDDING,
    icon: <BiDollarCircle size={20} />,
    routeName: "Bidding",
    link: CARRIER_BIDDING,
    permission: BROWSE_BIDDING_LIST,
  },
  {
    id: CARRIER_COMPANY,
    icon: <LiaIndustrySolid size={20} />,
    routeName: "Company",
    link: CARRIER_COMPANY,
    permission: BROWSE_ONBOARDING_COMPANY,
  },
  {
    id: CARRIER_PRIVATE_LOADS,
    icon: <RiChatPrivateLine size={20} />,
    routeName: "Private Loads",
    link: CARRIER_PRIVATE_LOADS,
    permission: BROWSE_PRIVATE_LOADS,
  },
  {
    id: CARRIER_AUTO_MATCH,
    icon: <MdOutlineAutoAwesomeMotion size={20} />,
    routeName: "Auto Match",
    link: CARRIER_AUTO_MATCH,
    permission: AUTO_MATCH,
  },
  {
    id: CARRIER_POST_TRUCK,
    icon: <BsSend size={20} />,
    routeName: "Post Truck",
    link: CARRIER_POST_TRUCK,
    permission: ADD_TRUCK_POST,
  },
  {
    id: CARRIER_TRUCK_LIST,
    icon: <FiTruck size={20} />,
    routeName: "Truck Lists",
    link: CARRIER_TRUCK_LIST,
    permission: BROWSE_TRUCK_POST_LIST,
  },
  {
    id: CARRIER_DRIVER,
    icon: <PiWheelchair size={20} />,
    routeName: "Driver",
    link: CARRIER_DRIVER,
    permission: BROWSE_DRIVER_LIST,
  },

  // -----------carrier menu end ---------------
  {
    id: ADMIN_CONTACT,
    icon: <LuContact2 size={20} />,
    permission: BROWSE_ADMIN_CONTACT,
    routeName: "Contact",
    link: ADMIN_CONTACT,
  },
  {
    id: BROWSE_TRANSACTION_ROUTE,
    icon: <GrTransaction size={20} />,
    permission: BROWSE_TRANSACTION,
    routeName: "Transactions",
    link: BROWSE_TRANSACTION_ROUTE,
  },
  {
    id: 28,
    icon: <CiSettings size={20} />,
    routeName: "Settings",
    permission: MODULE_SETTING,
    isDropdown: true,
    dropdownItems: [
      {
        id: SETTINGS_COMPNAY_PROFILE,
        icon: <AiOutlineProfile size={20} />,
        name: "Company Profile",
        link: SETTINGS_COMPNAY_PROFILE,
        permission: SETTINGS_COMPNAY_PROFILES, // Permission is undefined
      },
      {
        id: SETTINGS_USERS,
        icon: <AiOutlineProfile size={20} />,
        name: "Users",
        link: SETTINGS_USERS,
        permission: BROWSE_USER,
      },
      {
        id: SETTINGS_ROLES,
        icon: <BiUser size={20} />,
        name: "Roles",
        link: SETTINGS_ROLES,
        permission: BROWSE_ROLE,
      },
      {
        id: USER_SELECTED_PACKAGE,
        icon: <AiOutlineProfile size={20} />,
        name: "Plan",
        link: USER_SELECTED_PACKAGE,
        permission: BROWSE_SUBSCRIPTION_PLAN,
      },
      {
        id: SETTINGS_BILLING_AND_INVOICES,
        icon: <AiOutlineProfile size={20} />,
        name: "Billing and Invoice",
        link: SETTINGS_BILLING_AND_INVOICES,
        permission: BROWSE_BILL_AND_INVOICE,
      },
    ],
  },
];
