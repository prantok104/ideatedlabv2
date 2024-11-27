// import { AiOutlineProfile } from "react-icons/ai";
// import { BiAnalyse, BiDollarCircle, BiSolidPackage, BiUser, BiUserCircle } from "react-icons/bi";
// import { BsBoxes, BsSend, BsSubstack, BsTruck } from "react-icons/bs";
// import { CiSettings } from "react-icons/ci";
// import { FaRegUserCircle, FaTruckLoading } from "react-icons/fa";
// import { FaMoneyBills } from "react-icons/fa6";
// import { GoUnverified } from "react-icons/go";
// import { LiaIndustrySolid, LiaSearchDollarSolid, LiaShippingFastSolid, LiaTruckLoadingSolid } from "react-icons/lia";
// import { MdDashboardCustomize, MdOutlineAnnouncement, MdOutlineAutoAwesomeMotion, MdOutlineNotificationAdd } from "react-icons/md";
// import { RxDashboard } from "react-icons/rx";
// import {
//   BROWSE_BILL_AND_INVOICE,
//   BROWSE_COMPANIES,
//   BROWSE_LOAD,
//   BROWSE_LOAD_PLAN,
//   BROWSE_LOAD_SEARCH,
//   BROWSE_MEMBER,
//   BROWSE_MY_LOAD_SEARCH,
//   BROWSE_PERMISSION,
//   BROWSE_PRIVATE_LOAD,
//   BROWSE_PRIVATE_NETWORK,
//   BROWSE_ROLE,
//   BROWSE_SEARCH_TRUCK,
//   BROWSE_SHIPMENT,
//   BROWSE_SUBSCRIPTION,
//   BROWSE_SUBSCRIPTION_PLAN,
//   BROWSE_TRANSACTION,
//   BROWSE_UNVERIFIED_MEMBER,
//   BROWSE_USER,
//   MODULE_DASHBOARD,
//   MODULE_SETTING,
//   POST_PRIVATE_NETWORK,
//   VIEW_SUBSCRIPTION,
// } from "./permission";
// import { RiChatPrivateLine, RiUserSettingsLine } from "react-icons/ri";
// import { LuContact, LuPackageSearch } from "react-icons/lu";
// import { FiTruck } from "react-icons/fi";
// import { PiWheelchair } from "react-icons/pi";
// import { DASHBOARD_ROUTE } from "./router";

// export const menu = [
//   {
//     id: 1,
//     icon: <RxDashboard size={20} />,
//     routeName: "Dashboard",
//     link: "/dashboard",
//     permission: MODULE_DASHBOARD,
//   },
//   // {
//   //   id: 2,
//   //   icon: <BiAnalyse size={20} />,
//   //   routeName: "Analysis",
//   //   link: "/analysis",
//   //   permission: Permissions.BROWSE_ANALYSIS,
//   // },
//   {
//     id: 3,
//     icon: <FaTruckLoading size={20} />,
//     routeName: "Loads",
//     isDropdown: true,
//     permission: BROWSE_LOAD,
//     dropdownItems: [
//       {
//         id: 31,
//         name: "Search Loads",
//         link: "/carrier/loads/search-load",
//         permission: BROWSE_LOAD_SEARCH,
//       },
//       {
//         id: 32,
//         name: "My Loads",
//         link: "/carrier/loads/my-loads",
//         permission: BROWSE_MY_LOAD_SEARCH,
//       },
//       {
//         id: 33,
//         name: "Private Loads",
//         link: "/carrier/loads/private-loads",
//         permission: BROWSE_PRIVATE_LOAD,
//       },
//       {
//         id: 34,
//         name: "Load Plan",
//         link: "/carrier/loads/load-plan",
//         permission: BROWSE_LOAD_PLAN,
//       },
//       {
//         id: 35,
//         name: "Companies",
//         link: "/carrier/loads/companies",
//         permission: BROWSE_COMPANIES,
//       },
//     ],
//   },
//   {
//     id: 4,
//     icon: <BsTruck size={20} />,
//     routeName: "Truck",
//     permission: BROWSE_SEARCH_TRUCK,
//     isDropdown: true,
//     dropdownItems: [
//       {
//         id: 41,
//         name: "Search Truck",
//         link: "/carrier/truck/search-truck",
//         permission: BROWSE_SEARCH_TRUCK,
//       },
//       {
//         id: 42,
//         name: "Post Truck",
//         link: "/carrier/truck/post-truck",
//         permission: POST_PRIVATE_NETWORK, // Assuming this permission matches for posting trucks
//       },
//     ],
//   },
//   {
//     id: 5,
//     icon: <LiaShippingFastSolid />,
//     routeName: "Shipment",
//     link: "/shipper/shipment",
//     permission: BROWSE_SHIPMENT,
//   },
//   {
//     id: 6,
//     icon: <MdDashboardCustomize size={20} />,
//     routeName: "Subscription",
//     isDropdown: true,
//     permission: VIEW_SUBSCRIPTION,
//     dropdownItems: [
//       {
//         id: 61,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Packages",
//         link: "/admin/subscription/packages",
//         permission: VIEW_SUBSCRIPTION,
//       },
//     ],
//   },
//   {
//     id: 7,
//     icon: <MdDashboardCustomize size={20} />,
//     routeName: "Member",
//     isDropdown: true,
//     dropdownItems: [
//       {
//         id: 70,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Member",
//         link: "/admin/members/member",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 71,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Verified",
//         link: "/admin/members/verified",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 72,
//         icon: <GoUnverified className="whitespace-nowrap" size={20} />,
//         name: "Unverified",
//         link: "/admin/members/unverified",
//         permission: BROWSE_UNVERIFIED_MEMBER,
//       },
//       {
//         id: 73,
//         icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
//         name: "Subscriber",
//         link: "/admin/members/subscriber",
//         permission: BROWSE_MEMBER,
//       },
//     ],
//   },
//   {
//     id: 8,
//     icon: <CiSettings size={20} />,
//     routeName: "Settings",
//     isDropdown: true,
//     permission: MODULE_SETTING,
//     dropdownItems: [
//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Company Profile",
//         link: "/settings/company-profile",
//         permission: BROWSE_COMPANIES,
//       },
//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Users",
//         link: "/settings/users",
//         permission: BROWSE_USER,
//       },
//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Roles",
//         link: "/settings/roles",
//         permission: BROWSE_ROLE,
//       },
//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Billing and Invoice",
//         link: "/settings/billing-and-invoices",
//         permission: BROWSE_BILL_AND_INVOICE,
//       },
//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Plan",
//         link: "/settings/plans",
//         permission: BROWSE_SUBSCRIPTION,
//       },
//       {
//         id: 82,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Plan",
//         link: "/settings/plans",
//         permission: BROWSE_SUBSCRIPTION_PLAN,
//       },

//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Transactions",
//         link: "/settings/transactions",
//         permission: BROWSE_TRANSACTION,
//       },

//       // {
//       //   id: 81,
//       //   icon: <AiOutlineProfile size={20} />,
//       //   name: "Company Profile",
//       //   link: "/settings/company-profile",
//       //   permission: Permissions.BROWSE_COMPANIES,
//       // },
//       // {
//       //   id: 82,
//       //   icon: <AiOutlineProfile size={20} />,
//       //   name: "Users",
//       //   link: "/settings/users",
//       //   permission: Permissions.BROWSE_USER,
//       // },
//       // {
//       //   id: 83,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Role",
//       //   link: "/settings/role",
//       //   permission: Permissions.BROWSE_ROLE,
//       // },
//       // {
//       //   id: 84,
//       //   icon: <LiaSearchDollarSolid size={20} />,
//       //   name: "Billing & Invoices",
//       //   link: "/settings/billing-invoices",
//       //   permission: Permissions.BROWSE_BILL_AND_INVOICE,
//       // },
//       // {
//       //   id: 85,
//       //   icon: <FaMoneyBills size={20} />,
//       //   name: "Transactions",
//       //   link: "/shipper/settings/transactions",
//       //   permission: Permissions.BROWSE_TRANSACTION,
//       // },
//       // {
//       //   id: 86,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Packages",
//       //   link: "/users/packages",
//       //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
//       // },
//       // {
//       //   id: 87,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Plan",
//       //   link: "/settings/plan",
//       //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
//       // },
//     ],
//   },
// ];


// export const menus = [
//   {
//     id: 1,
//     icon: <RxDashboard size={20} />,
//     routeName: "Dashboard",
//     link: DASHBOARD_ROUTE,
//     permission: MODULE_DASHBOARD,
//   },

//   // Admin menu
//   {
//     id: 6,
//     icon: <MdDashboardCustomize size={20} />,
//     routeName: "Member",
//     permission: BROWSE_MEMBER,
//     isDropdown: true,
//     dropdownItems: [
//       {
//         id: 7,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Member",
//         link: "/admin/members/member",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 8,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Verified",
//         link: "/admin/members/verified",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 9,
//         icon: <GoUnverified className="whitespace-nowrap" size={20} />,
//         name: "Unverified",
//         link: "/admin/members/unverified",
//         permission: BROWSE_UNVERIFIED_MEMBER,
//       },
//       {
//         id: 10,
//         icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
//         name: "Subscriber",
//         link: "/admin/members/subscriber",
//         permission: BROWSE_MEMBER,
//       },
      
//     ],
//   },
//   {
//     id: 11,
//     icon: <BsSubstack size={20} />,
//     routeName: "Subscription",
//     link: "",
//     permission: BROWSE_SUBSCRIPTION_PLAN,
//   },
//     //   contact channel menu
//   {
//     id: 12,
//     icon: <LuContact size={20} />,
//     routeName: "Contact",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 13,
//     icon: <MdOutlineNotificationAdd size={20} />,
//     routeName: "Notification",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 14,
//     icon: <MdOutlineAnnouncement size={20} />,
//     routeName: "Announcement",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//    {
//     id: 14,
//     icon: <MdOutlineAnnouncement size={20} />,
//     routeName: "Shipment",
//     link: "",
//     permission: '', // Permission is undefined
//    },

//   // Shipper menu
//   {
//     id: 15,
//     icon: <BsBoxes size={20} />,
//     routeName: "Shipment",
//     link: "",
//     permission: BROWSE_SHIPMENT,
//   },
//   {
//     id: 16,
//     icon: <RiChatPrivateLine size={20} />,
//     routeName: "Private Network",
//     link: "",
//     permission: BROWSE_PRIVATE_NETWORK, // Permission may need clarification
//   },
//   {
//     id: 17,
//     icon: <FiTruck size={20} />,
//     routeName: "Search Truck",
//     link: "",
//     permission: BROWSE_SEARCH_TRUCK,
//   },

//   // Carrier menu
//   {
//     id: 18,
//     icon: <LuPackageSearch size={20} />,
//     routeName: "Search Loads",
//     link: "",
//     permission: BROWSE_LOAD_SEARCH,
//   },
//   {
//     id: 19,
//     icon: <LiaTruckLoadingSolid size={20} />,
//     routeName: "My Loads",
//     link: "",
//     permission: BROWSE_MY_LOAD_SEARCH,
//   },
//   {
//     id: 20,
//     icon: <BiDollarCircle size={20} />,
//     routeName: "Bidding",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 21,
//     icon: <LiaIndustrySolid size={20} />,
//     routeName: "Company",
//     link: "",
//     permission: BROWSE_COMPANIES,
//   },
//   {
//     id: 22,
//     icon: <RiChatPrivateLine size={20} />,
//     routeName: "Private Loads",
//     link: "",
//     permission: BROWSE_PRIVATE_LOAD,
//   },
//   {
//     id: 23,
//     icon: <MdOutlineAutoAwesomeMotion size={20} />,
//     routeName: "Auto Match",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 24,
//     icon: <BsSend size={20} />,
//     routeName: "Post Truck",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 25,
//     icon: <FiTruck size={20} />,
//     routeName: "Truck Lists",
//     link: "",
//     permission: '', // Permission is undefined
//   },
//   {
//     id: 26,
//     icon: <PiWheelchair size={20} />,
//     routeName: "Driver",
//     link: "",
//     permission: '', // Permission is undefined
//   },


//   // settings menu
//   {
//     id: 27,
//     icon: <CiSettings size={20} />,
//     routeName: "Settings",
//     permission: MODULE_SETTING,
//     isDropdown: true,
//     dropdownItems: [
//         {
//           id: 28,
//           icon: <AiOutlineProfile size={20} />,
//           routeName: "Company Profile",
//           link: "",
//           permission: "", // Permission is undefined
//         },
//         {
//           id: 29,
//           icon: <AiOutlineProfile size={20} />,
//           routeName: "Users",
//           link: "",
//           permission: BROWSE_USER,
//         },
//         {
//           id: 30,
//           icon: <BiUser size={20} />,
//           routeName: "Roles",
//           link: "",
//           permission: BROWSE_ROLE,
//         },
//         {
//           id: 31,
//           icon: "",
//           routeName: 'Plan',
//           link: '',
//           permission: BROWSE_SUBSCRIPTION_PLAN,
//         },
//         {
//           id: 32,
//           icon: <AiOutlineProfile size={20} />,
//           routeName: "Billing and Invoice",
//           link: "",
//           permission: BROWSE_BILL_AND_INVOICE,
//         }
//     ]
//   },

  
// ];



// export const menu = [
//   {
//     id: 1,
//     icon: <RxDashboard size={20} />,
//     routeName: "Dashboard",
//     link: "/dashboard",
//     permission: MODULE_DASHBOARD,
//   },
//   // {
//   //   id: 2,
//   //   icon: <BiAnalyse size={20} />,
//   //   routeName: "Analysis",
//   //   link: "/analysis",
//   //   permission: Permissions.BROWSE_ANALYSIS,
//   // },
//   {
//     id: 3,
//     icon: <FaTruckLoading size={20} />,
//     routeName: "Loads",
//     isDropdown: true,
//     permission: BROWSE_LOAD,
//     dropdownItems: [
//       {
//         id: CARRIER_SEARCH_LOADS,
//         name: "Search Loads",
//         link: CARRIER_SEARCH_LOADS,
//         permission: BROWSE_LOAD_SEARCH,
//       },
//       {
//         id: 32,
//         name: "My Loads",
//         link: "/carrier/loads/my-loads",
//         permission: BROWSE_MY_LOAD_SEARCH,
//       },
//       {
//         id: 33,
//         name: "Private Loads",
//         link: "/carrier/loads/private-loads",
//         permission: BROWSE_PRIVATE_LOAD,
//       },
//       {
//         id: 34,
//         name: "Load Plan",
//         link: "/carrier/loads/load-plan",
//         permission: BROWSE_LOAD_PLAN,
//       },
//       {
//         id: 35,
//         name: "Companies",
//         link: "/carrier/loads/companies",
//         permission: BROWSE_COMPANIES,
//       },
//     ],
//   },
//   {
//     id: 4,
//     icon: <BsTruck size={20} />,
//     routeName: "Truck",
//     permission: BROWSE_SEARCH_TRUCK,
//     isDropdown: true,
//     dropdownItems: [
//       {
//         id: 41,
//         name: "Search Truck",
//         link: "/carrier/truck/search-truck",
//         permission: BROWSE_SEARCH_TRUCK,
//       },
//       {
//         id: 42,
//         name: "Post Truck",
//         link: "/carrier/truck/post-truck",
//         permission: POST_PRIVATE_NETWORK, // Assuming this permission matches for posting trucks
//       },
//     ],
//   },
//   {
//     id: 5,
//     icon: <LiaShippingFastSolid />,
//     routeName: "Shipment",
//     link: "/shipper/shipment",
//     permission: BROWSE_SHIPMENT,
//   },
//   {
//     id: 6,
//     icon: <MdDashboardCustomize size={20} />,
//     routeName: "Subscription",
//     isDropdown: true,
//     permission: VIEW_SUBSCRIPTION,
//     dropdownItems: [
//       {
//         id: 61,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Packages",
//         link: "/admin/subscription/packages",
//         permission: VIEW_SUBSCRIPTION,
//       },
//     ],
//   },
//   {
//     id: 7,
//     icon: <MdDashboardCustomize size={20} />,
//     routeName: "Member",
//     isDropdown: true,
//     dropdownItems: [
//       {
//         id: 70,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Member",
//         link: "/admin/members/member",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 71,
//         icon: <FaRegUserCircle size={20} />,
//         name: "Verified",
//         link: "/admin/members/verified",
//         permission: BROWSE_MEMBER,
//       },
//       {
//         id: 72,
//         icon: <GoUnverified className="whitespace-nowrap" size={20} />,
//         name: "Unverified",
//         link: "/admin/members/unverified",
//         permission: BROWSE_UNVERIFIED_MEMBER,
//       },
//       {
//         id: 73,
//         icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
//         name: "Subscriber",
//         link: "/admin/members/subscriber",
//         permission: BROWSE_MEMBER,
//       },
//     ],
//   },
//   {
//     id: 8,
//     icon: <CiSettings size={20} />,
//     routeName: "Settings",
//     isDropdown: true,
//     permission: MODULE_SETTING,
//     dropdownItems: [
//       {
//         id: SETTINGS_COMPNAY_PROFILE,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Company Profile",
//         link: SETTINGS_COMPNAY_PROFILE,
//         permission: BROWSE_COMPANIES,
//       },
//       {
//         id: SETTINGS_USERS,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Users",
//         link: SETTINGS_USERS,
//         permission: BROWSE_USER,
//       },
//       {
//         id: SETTINGS_ROLES,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Roles",
//         link: SETTINGS_ROLES,
//         permission: BROWSE_ROLE,
//       },
//       {
//         id: SETTINGS_BILLING_AND_INVOICES,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Billing and Invoice",
//         link: SETTINGS_BILLING_AND_INVOICES,
//         permission: BROWSE_BILL_AND_INVOICE,
//       },
//       {
//         id: 82,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Plan",
//         link: "/settings/plans",
//         permission: BROWSE_SUBSCRIPTION_PLAN,
//       },

//       {
//         id: 81,
//         icon: <AiOutlineProfile size={20} />,
//         name: "Transactions",
//         link: "/settings/transactions",
//         permission: BROWSE_TRANSACTION,
//       },

//       // {
//       //   id: 81,
//       //   icon: <AiOutlineProfile size={20} />,
//       //   name: "Company Profile",
//       //   link: "/settings/company-profile",
//       //   permission: Permissions.BROWSE_COMPANIES,
//       // },
//       // {
//       //   id: 82,
//       //   icon: <AiOutlineProfile size={20} />,
//       //   name: "Users",
//       //   link: "/settings/users",
//       //   permission: Permissions.BROWSE_USER,
//       // },
//       // {
//       //   id: 83,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Role",
//       //   link: "/settings/role",
//       //   permission: Permissions.BROWSE_ROLE,
//       // },
//       // {
//       //   id: 84,
//       //   icon: <LiaSearchDollarSolid size={20} />,
//       //   name: "Billing & Invoices",
//       //   link: "/settings/billing-invoices",
//       //   permission: Permissions.BROWSE_BILL_AND_INVOICE,
//       // },
//       // {
//       //   id: 85,
//       //   icon: <FaMoneyBills size={20} />,
//       //   name: "Transactions",
//       //   link: "/shipper/settings/transactions",
//       //   permission: Permissions.BROWSE_TRANSACTION,
//       // },
//       // {
//       //   id: 86,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Packages",
//       //   link: "/users/packages",
//       //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
//       // },
//       // {
//       //   id: 87,
//       //   icon: <FaRegUserCircle size={20} />,
//       //   name: "Plan",
//       //   link: "/settings/plan",
//       //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
//       // },
//     ],
//   },
// ];






// // {
  // //   id: 2,
  // //   icon: <BiAnalyse size={20} />,
  // //   routeName: "Analysis",
  // //   link: "/analysis",
  // //   permission: Permissions.BROWSE_ANALYSIS,
  // // },
  // {
  //   id: 3,
  //   icon: <FaTruckLoading size={20} />,
  //   routeName: "Loads",
  //   isDropdown: true,
  //   permission: BROWSE_LOAD,
  //   dropdownItems: [
  //     {
  //       id: CARRIER_SEARCH_LOADS,
  //       name: "Search Loads",
  //       link: CARRIER_SEARCH_LOADS,
  //       permission: BROWSE_LOAD_SEARCH,
  //     },
  //     {
  //       id: 32,
  //       name: "My Loads",
  //       link: "/carrier/loads/my-loads",
  //       permission: BROWSE_MY_LOAD_SEARCH,
  //     },
  //     {
  //       id: 33,
  //       name: "Private Loads",
  //       link: "/carrier/loads/private-loads",
  //       permission: BROWSE_PRIVATE_LOAD,
  //     },
  //     {
  //       id: 34,
  //       name: "Load Plan",
  //       link: "/carrier/loads/load-plan",
  //       permission: BROWSE_LOAD_PLAN,
  //     },
  //     {
  //       id: 35,
  //       name: "Companies",
  //       link: "/carrier/loads/companies",
  //       permission: BROWSE_COMPANIES,
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   icon: <BsTruck size={20} />,
  //   routeName: "Truck",
  //   permission: BROWSE_SEARCH_TRUCK,
  //   isDropdown: true,
  //   dropdownItems: [
  //     {
  //       id: 41,
  //       name: "Search Truck",
  //       link: "/carrier/truck/search-truck",
  //       permission: BROWSE_SEARCH_TRUCK,
  //     },
  //     {
  //       id: 42,
  //       name: "Post Truck",
  //       link: "/carrier/truck/post-truck",
  //       permission: POST_PRIVATE_NETWORK, // Assuming this permission matches for posting trucks
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   icon: <LiaShippingFastSolid />,
  //   routeName: "Shipment",
  //   link: "/shipper/shipment",
  //   permission: BROWSE_SHIPMENT,
  // },
  // {
  //   id: 6,
  //   icon: <MdDashboardCustomize size={20} />,
  //   routeName: "Subscription",
  //   isDropdown: true,
  //   permission: VIEW_SUBSCRIPTION,
  //   dropdownItems: [
  //     {
  //       id: 61,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Packages",
  //       link: "/admin/subscription/packages",
  //       permission: VIEW_SUBSCRIPTION,
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   icon: <MdDashboardCustomize size={20} />,
  //   routeName: "Member",
  //   isDropdown: true,
  //   dropdownItems: [
  //     {
  //       id: 70,
  //       icon: <FaRegUserCircle size={20} />,
  //       name: "Member",
  //       link: "/admin/members/member",
  //       permission: BROWSE_MEMBER,
  //     },
  //     {
  //       id: 71,
  //       icon: <FaRegUserCircle size={20} />,
  //       name: "Verified",
  //       link: "/admin/members/verified",
  //       permission: BROWSE_MEMBER,
  //     },
  //     {
  //       id: 72,
  //       icon: <GoUnverified className="whitespace-nowrap" size={20} />,
  //       name: "Unverified",
  //       link: "/admin/members/unverified",
  //       permission: BROWSE_UNVERIFIED_MEMBER,
  //     },
  //     {
  //       id: 73,
  //       icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
  //       name: "Subscriber",
  //       link: "/admin/members/subscriber",
  //       permission: BROWSE_MEMBER,
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   icon: <CiSettings size={20} />,
  //   routeName: "Settings",
  //   isDropdown: true,
  //   permission: MODULE_SETTING,
  //   dropdownItems: [
  //     {
  //       id: SETTINGS_COMPNAY_PROFILE,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Company Profile",
  //       link: SETTINGS_COMPNAY_PROFILE,
  //       permission: BROWSE_COMPANIES,
  //     },
  //     {
  //       id: SETTINGS_USERS,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Users",
  //       link: SETTINGS_USERS,
  //       permission: BROWSE_USER,
  //     },
  //     {
  //       id: SETTINGS_ROLES,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Roles",
  //       link: SETTINGS_ROLES,
  //       permission: BROWSE_ROLE,
  //     },
  //     {
  //       id: SETTINGS_BILLING_AND_INVOICES,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Billing and Invoice",
  //       link: SETTINGS_BILLING_AND_INVOICES,
  //       permission: BROWSE_BILL_AND_INVOICE,
  //     },
  //     {
  //       id: 82,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Plan",
  //       link: "/settings/plans",
  //       permission: BROWSE_SUBSCRIPTION_PLAN,
  //     },

  //     {
  //       id: 81,
  //       icon: <AiOutlineProfile size={20} />,
  //       name: "Transactions",
  //       link: "/settings/transactions",
  //       permission: BROWSE_TRANSACTION,
  //     },

  //     // {
  //     //   id: 81,
  //     //   icon: <AiOutlineProfile size={20} />,
  //     //   name: "Company Profile",
  //     //   link: "/settings/company-profile",
  //     //   permission: Permissions.BROWSE_COMPANIES,
  //     // },
  //     // {
  //     //   id: 82,
  //     //   icon: <AiOutlineProfile size={20} />,
  //     //   name: "Users",
  //     //   link: "/settings/users",
  //     //   permission: Permissions.BROWSE_USER,
  //     // },
  //     // {
  //     //   id: 83,
  //     //   icon: <FaRegUserCircle size={20} />,
  //     //   name: "Role",
  //     //   link: "/settings/role",
  //     //   permission: Permissions.BROWSE_ROLE,
  //     // },
  //     // {
  //     //   id: 84,
  //     //   icon: <LiaSearchDollarSolid size={20} />,
  //     //   name: "Billing & Invoices",
  //     //   link: "/settings/billing-invoices",
  //     //   permission: Permissions.BROWSE_BILL_AND_INVOICE,
  //     // },
  //     // {
  //     //   id: 85,
  //     //   icon: <FaMoneyBills size={20} />,
  //     //   name: "Transactions",
  //     //   link: "/shipper/settings/transactions",
  //     //   permission: Permissions.BROWSE_TRANSACTION,
  //     // },
  //     // {
  //     //   id: 86,
  //     //   icon: <FaRegUserCircle size={20} />,
  //     //   name: "Packages",
  //     //   link: "/users/packages",
  //     //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
  //     // },
  //     // {
  //     //   id: 87,
  //     //   icon: <FaRegUserCircle size={20} />,
  //     //   name: "Plan",
  //     //   link: "/settings/plan",
  //     //   permission: Permissions.BROWSE_SUBSCRIPTION_PLAN,
  //     // },





  export const menus = [
    {
      id: DASHBOARD_ROUTE,
      icon: <RxDashboard size={20} />,
      routeName: "Dashboard",
      link: DASHBOARD_ROUTE,
      permission: MODULE_DASHBOARD,
    },
  
    // Admin menu
    {
      id: 6,
      icon: <MdDashboardCustomize size={20} />,
      routeName: "Member",
      permission: BROWSE_MEMBER,
      isDropdown: true,
      dropdownItems: [
        {
          id: ADMIN_MEMBER_MODULE.MEMBER,
          icon: <FaRegUserCircle size={20} />,
          name: "Member",
          link: ADMIN_MEMBER_MODULE.MEMBER,
          permission: BROWSE_MEMBER,
        },
        {
          id: ADMIN_MEMBER_MODULE.VERIFIED_MEMBER,
          icon: <FaRegUserCircle size={20} />,
          name: "Verified",
          link: ADMIN_MEMBER_MODULE.VERIFIED_MEMBER,
          permission: BROWSE_MEMBER,
        },
        {
          id: ADMIN_MEMBER_MODULE.UNVERIFIED_MEMBER,
          icon: <GoUnverified className="whitespace-nowrap" size={20} />,
          name: "Unverified",
          link: ADMIN_MEMBER_MODULE.UNVERIFIED_MEMBER,
          permission: BROWSE_UNVERIFIED_MEMBER,
        },
        {
          id: ADMIN_MEMBER_MODULE.SUBSCRIBER,
          icon: <BiSolidPackage className="whitespace-nowrap" size={20} />,
          name: "Subscriber",
          link: ADMIN_MEMBER_MODULE.SUBSCRIBER,
          permission: BROWSE_MEMBER,
        },
      ],
    },
    {
      id: ADMIN_SUBSCRIPTION_PLAN,
      icon: <BsSubstack size={20} />,
      routeName: "Subscription",
      link: ADMIN_SUBSCRIPTION_PLAN,
      permission: BROWSE_SUBSCRIPTION_PLAN,
    },
    //   contact channel menu, which we can find from where the lead come from (website, app, etc)
    {
      id: ADMIN_CONTACT,
      icon: <LuContact size={20} />,
      routeName: "Contact",
      link: ADMIN_CONTACT,
      permission: "", // Permission is undefined
    },
    {
      id: ADMIN_NOTIFICATION,
      icon: <MdOutlineNotificationAdd size={20} />,
      routeName: "Notification",
      link: ADMIN_NOTIFICATION,
      permission: "", // Permission is undefined
    },
    {
      id: ADMIN_ANNOUNCEMENT,
      icon: <MdOutlineAnnouncement size={20} />,
      routeName: "Announcement",
      link: ADMIN_ANNOUNCEMENT,
      permission: "", // Permission is undefined
    },
    {
      id: ADMIN_SHIPMENT,
      icon: <MdOutlineAnnouncement size={20} />,
      routeName: "Shipment",
      link: ADMIN_SHIPMENT,
      permission: "", // Permission is undefined
    },
  
    // Shipper menu
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
  
    // Carrier menu
    {
      id: CARRIER_SEARCH_LOADS,
      icon: <LuPackageSearch size={20} />,
      routeName: "Search Loads",
      link: CARRIER_SEARCH_LOADS,
      permission: BROWSE_LOAD_SEARCH,
    },
    {
      id: CARRIER_MY_LOAD,
      icon: <LiaTruckLoadingSolid size={20} />,
      routeName: "My Loads",
      link: CARRIER_MY_LOAD,
      permission: BROWSE_MY_LOAD_SEARCH,
    },
    {
      id: CARRIER_BIDDING,
      icon: <BiDollarCircle size={20} />,
      routeName: "Bidding",
      link: CARRIER_BIDDING,
      permission: "not defined", // Permission is undefined
    },
    {
      id: CARRIER_COMPANY,
      icon: <LiaIndustrySolid size={20} />,
      routeName: "Company",
      link: CARRIER_COMPANY,
      permission: BROWSE_COMPANIES,
    },
    {
      id: CARRIER_PRIVATE_LOADS,
      icon: <RiChatPrivateLine size={20} />,
      routeName: "Private Loads",
      link: CARRIER_PRIVATE_LOADS,
      permission: BROWSE_PRIVATE_LOAD,
    },
    {
      id: CARRIER_AUTO_MATCH,
      icon: <MdOutlineAutoAwesomeMotion size={20} />,
      routeName: "Auto Match",
      link: CARRIER_AUTO_MATCH,
      permission: "not defined", // Permission is undefined
    },
    {
      id: CARRIER_POST_TRUCK,
      icon: <BsSend size={20} />,
      routeName: "Post Truck",
      link: CARRIER_POST_TRUCK,
      permission: "not defined", // Permission is undefined
    },
    {
      id: CARRIER_TRUCK_LIST,
      icon: <FiTruck size={20} />,
      routeName: "Truck Lists",
      link: CARRIER_TRUCK_LIST,
      permission: "not defined", // Permission is undefined
    },
    {
      id: CARRIER_DRIVER,
      icon: <PiWheelchair size={20} />,
      routeName: "Driver",
      link: CARRIER_DRIVER,
      permission: "not defined", // Permission is undefined
    },
  
    // settings menu
    {
      id: 27,
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
          permission: "", // Permission is undefined
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
          icon: "",
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
  