import { BiEditAlt } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBin6Line, RiDraftLine } from "react-icons/ri";

export const homeData = {
  homeTitle: "Best platform to connect with available freight.",
  secondTitleSub:
    "KLS360 is an industry leader in load board solutions with affordable web and mobile app platforms. Some of the world’s largest carriers, owner-operators, and freight brokers rely on our load matching services to find loads and move truck freight.",
  cards: [
    {
      id: 1,
      title: "Find Loads",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds.",
      image: "/asset/website-images/find-loads.png", // Remove '/public'
    },
    {
      id: 2,
      title: "Route optimization",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds.",
      image: "/asset/website-images/route-optimization.png",
    },
    {
      id: 3,
      title: "Trip Builder",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds.",
      image: "/asset/website-images/trip-builder.png",
    },
    {
      id: 4,
      title: "Real Time notifications",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds. ",
      image: "/asset/website-images/real-time-optimizatrion.png",
    },
    {
      id: 5,
      title: "Rate Checker",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds.",
      image: "/asset/website-images/rate-cheacker.png",
    },
    {
      id: 6,
      title: "Quick Payment",
      description:
        "Intelligent route creation that improves capacity, performance, and fuel economy, mapping the perfect route in seconds.",
      image: "/asset/website-images/quick-payment.png",
    },
  ],

  testmonialCards: [
    {
      id: 1,
      rating: 5,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
      name: "David Kutta",
      compnay: "Al Madha Truck LLC",
    },
    {
      id: 2,
      rating: 5,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
      name: "David Kutta",
      compnay: "Al Madha Truck LLC",
    },
    {
      id: 2,
      rating: 5,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
      name: "David Kutta",
      compnay: "Al Madha Truck LLC",
    },
  ],
};

// Carrier plans data
export const carrierPlans = [
  {
    id: 1,
    title: "Basic plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR250/", yearly: "SAR250/" },
    description: ["10 Vehicle Posts", "10 Load Posts", "1 User"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Select Plan",
    buttonVariant: "base",
    svgGreen: true,
    type: "Carrier",
  },
  {
    id: 2,
    title: "Professional plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR350/", yearly: "SAR350/" },
    description: ["25 Matches", "25 Vehicle Posts", "25 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    class: "custom-card-green",
    buttonText: "Select Plan",
    buttonVariant: "stroke",
    type: "Carrier",
  },
  {
    id: 3,
    title: "Expert plan",
    contactUs: "Contact us",
    pricing: "",
    description: ["40 Matches", "40 Vehicle Posts", "40 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Contact Sales",
    buttonVariant: "base",
    svgGreen: true,
    type: "Carrier",
  },
];

// Shipper plans data
export const shipperPlans = [
  {
    id: 1,
    title: "Basic plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR250/", yearly: "SAR250/" },
    description: ["10 Vehicle Posts", "10 Load Posts", "1 User"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Select Plan",
    buttonVariant: "base",
    svgGreen: true,
    type: "Shipper",
  },
  {
    id: 2,
    title: "Professional plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR350/", yearly: "SAR350/" },
    description: ["25 Matches", "25 Vehicle Posts", "25 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    class: "custom-card-green",
    buttonText: "Select Plan",
    buttonVariant: "stroke",
    type: "Shipper",
  },
  {
    id: 3,
    title: "Expert plan",
    contactUs: "Contact us",
    pricing: "",
    description: ["40 Matches", "40 Vehicle Posts", "40 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Contact Sales",
    buttonVariant: "base",
    svgGreen: true,
    type: "Shipper",
  },
];

// Broker plans data
export const brokerPlans = [
  {
    id: 1,
    title: "Basic plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR250/", yearly: "SAR250/" },
    description: ["10 Vehicle Posts", "10 Load Posts", "1 User"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Select Plan",
    buttonVariant: "base",
    svgGreen: true,
    type: "Broker",
  },
  {
    id: 2,
    title: "Professional plan",
    shortTitle: "Starting from",
    pricing: { monthly: "SAR350/", yearly: "SAR350/" },
    description: ["25 Matches", "25 Vehicle Posts", "25 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    class: "custom-card-green",
    buttonText: "Select Plan",
    buttonVariant: "stroke",
    type: "Broker",
  },
  {
    id: 3,
    title: "Expert plan",
    contactUs: "Contact us",
    pricing: "",
    description: ["40 Matches", "40 Vehicle Posts", "40 Load Posts"],
    facilities: [
      "Auto Match",
      "Search tools",
      "Email Notifications",
      "Receive offers",
    ],
    notAvaible: ["Send offers"],
    buttonText: "Contact Sales",
    buttonVariant: "base",
    svgGreen: true,
    type: "Broker",
  },
];

// static const file for posting truck
export const trucks = [
  { label: "Truck", value: "Truck" },
  { label: "Trailer", value: "Trailer" },
  { label: "Tractor", value: "Tractor" },
];

export const loadSize = [
  { label: "10 Ton", value: "10 Ton" },
  { label: "20 Ton", value: "20 Ton" },
  { label: "30 Ton", value: "30 Ton" },
  { label: "40 Ton", value: "40 Ton" },
  { label: "50 Ton", value: "50 Ton" },
];

export const length = [
  { label: "10 Feet", value: "10 Feet" },
  { label: "20 Feet", value: "20 Feet" },
  { label: "30 Feet", value: "30 Feet" },
  { label: "40 Feet", value: "40 Feet" },
  { label: "50 Feet", value: "50 Feet" },
];
// ======================================

// load companies card Data onboard, favourite , block/hidden
export const loadCompanies = [
  {
    id: 1,
    backgroundColorCard: "#E9FCFF",
    icon: "/asset/load-companies/onboard-icon.svg", // Adjusted path
    name: "Onboard",
    itemsCounts: 5,
    link: "onboard",
  },
  {
    id: 2,
    backgroundColorCard: "#F1F9E6",
    icon: "/asset/load-companies/favourite-icon.svg", // Adjusted path
    name: "Favourite",
    itemsCounts: 3,
    link: "favourite",
  },
  {
    id: 3,
    backgroundColorCard: "#FFF3E8",
    icon: "/asset/load-companies/blocked-icon.svg", // Adjusted path
    name: "Blocked/Hidden",
    itemsCounts: 2,
    link: "blocked",
  },
];

// ======================================

// onboard cards here tempo
export const onboardCompanies = [
  {
    id: 1,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 2,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 3,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 4,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 5,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 6,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 7,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 8,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 9,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
  {
    id: 10,
    usid: "USID #1245636",
    company: "Tiron Logistics Company",
    location: "Los Angeles, CA, 45100",
  },
];

// dashboard data is here
export const dashboardData = {
  cardData: {
    id: 1,
    name: "Hello, Tiron Dev, ",
    title: "Load Companies",
    buttonText: "Post Loads",
  },
  secondCardData: {
    id: 2,
    title: "Market Rate",
    subText:
      "Get market freight Rates and find the right carrier for you shipments.",
    buttonText: "Get Rate",
  },
  shipmentCardData: [
    {
      id: 1,
      icon: "/asset/shipper_dashboard/card-one.png",
      itemsCount: "325",
      title: "Total Shipment",
      link: "/dashboard",
    },
    {
      id: 2,
      icon: "/asset/shipper_dashboard/card-two.png",
      itemsCount: "10",
      title: "Active Shipment",
      link: "/dashboard",
    },
    {
      id: 3,
      icon: "/asset/shipper_dashboard/card-three.png",
      itemsCount: "12",
      title: "Draft Shipment",
      link: "/dashboard",
    },
    {
      id: 4,
      icon: "/asset/shipper_dashboard/message.png",
      itemsCount: "322",
      title: "Message",
      link: "/dashboard",
    },
  ],
};

// custom style for styles
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#73C002" : "#73C002",
    boxShadow: state.isFocused ? "0 0 0 1px #73C002" : "none",
    fontSize: "0.875rem",
    padding: "4px 8px",
    "&:hover": {
      borderColor: "#73C002",
      boxShadow: "0 0 0 1px #73C002",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#73C002" : "white",
    "&:hover": {
      backgroundColor: "#F1F9E6",
      color: "black",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "gray",
    fontSize: "0.875rem",
  }),
};

// tempo data of posting options in shipper

export const postOptions = [
  {
    id: 1,
    title: "Public",
  },
  {
    id: 2,
    title: "Private Network",
  },
  {
    id: 3,
    title: "Specific Groups",
  },
];

// tempo data of specific group in shipper

export const specificGroup = [
  {
    id: 1,
    groupName: "Group 1",
    contacts: "8",
  },
  {
    id: 2,
    groupName: "Group 2",
    contacts: "12",
  },
  {
    id: 3,
    groupName: "Group 3",
    contacts: "18",
  },
];

// shipment details buttons
export const buttonData = [
  {
    id: 1,
    icon: <RiDraftLine size={16} />,
    routeName: "Draft",
    link: "/draft",
  },
  {
    id: 2,
    icon: <BiEditAlt size={16} />,
    routeName: "Edit",
    link: "/shipper/shipment/1/edit",
  },
  {
    id: 3,
    icon: <RiDeleteBin6Line size={16} />,
    routeName: "Delete",
    link: "/delete",
  },
  {
    id: 4,
    icon: <HiOutlineDuplicate size={16} />,
    routeName: "Duplicate",
    link: "/shipper/shipment/1/duplicate",
  },
];

// tempo data
export const dataSet = [
  {
    id: 1,
    age: 25,
    pickup: "Philadelphia, PA",
    trip: "Los Angeles, CA",
    reference: "Email Ref",
    equipment: "Flatbed",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 2,
    age: 32,
    pickup: "Chicago, IL",
    trip: "San Francisco, CA",
    reference: "Phone Ref",
    equipment: "Reefer",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
    status: "pending",
  },
  {
    id: 3,
    age: 41,
    pickup: "Houston, TX",
    trip: "New York, NY",
    reference: "Web Ref",
    equipment: "Aluminum Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 4,
    age: 28,
    pickup: "Phoenix, AZ",
    trip: "Dallas, TX",
    reference: "Email Ref",
    equipment: "Steel Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
    status: "pending",
  },
  {
    id: 5,
    age: 35,
    pickup: "Philadelphia, PA",
    trip: "Washington D.C.",
    reference: "Phone Ref",
    equipment: "Flatbed",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 6,
    age: 40,
    pickup: "Chicago, IL",
    trip: "Los Angeles, CA",
    reference: "Web Ref",
    equipment: "Reefer",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
    status: "pending",
  },
  {
    id: 7,
    age: 22,
    pickup: "Houston, TX",
    trip: "San Francisco, CA",
    reference: "Email Ref",
    equipment: "Aluminum Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 8,
    age: 37,
    pickup: "Phoenix, AZ",
    trip: "New York, NY",
    reference: "Phone Ref",
    equipment: "Steel Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
    status: "pending",
  },
  {
    id: 9,
    age: 29,
    pickup: "Philadelphia, PA",
    trip: "Dallas, TX",
    reference: "Email Ref",
    equipment: "Flatbed",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 10,
    age: 34,
    pickup: "Chicago, IL",
    trip: "Washington D.C.",
    reference: "Web Ref",
    equipment: "Reefer",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
    status: "pending",
  },
  {
    id: 11,
    age: 20,
    pickup: "Houston, TX",
    trip: "Los Angeles, CA",
    reference: "Email Ref",
    equipment: "Aluminum Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Standard Propose",
    status: "pending",
  },
  {
    id: 12,
    age: 33,
    pickup: "Phoenix, AZ",
    trip: "San Francisco, CA",
    reference: "Phone Ref",
    equipment: "Steel Body",
    rate: { totalPoint: 30, earning: 26 },
    propose: "Express Propose",
  },
];

// Roles Action
export const contextMenuItems = [
  // { text: "View Role", type: "VIEW" },
  { text: "Edit Role", type: "EDIT" },
  { text: "Delete Role", type: "DELETE" },
];

// Users Action
export const userMenuItems = [
  // { text: "View Profile", type: "VIEW" },
  { text: "Edit User", type: "EDIT" },
  { text: "Delete User", type: "DELETE" },
];

// statusStyles
export const statusStyles = {
  Active: "text-[#73c002] bg-[#f1f9e6]",
  Inactive: "text-[#d9534f] bg-[#fce8e8]",
  Pending: "text-[#ffb822] bg-[#fff5e6]",
  Completed: "text-[#17a2b8] bg-[#e6f7f9]",
  Done: "text-[#5cb85c] bg-[#e6f9e6]",
};



export const truckListData = [
  {
    id: 1,
    truckNumber: "1234",
    truckName: "Truck A",
    available: true,
    equipmentType: "Flatbed",
    length: "40 ft",
    height: "12 ft",
    weight: "10,000 lbs",
    attachmentCount: 2,
    Status: "Active",
  },
  {
    id: 2,
    truckNumber: "5678",
    truckName: "Truck B",
    available: false,
    equipmentType: "Reefer",
    length: "45 ft",
    height: "13 ft",
    weight: "15,000 lbs",
    attachmentCount: 0,
    Status: "Pending",
  },
  {
    id: 3,
    truckNumber: "9101",
    truckName: "Truck C",
    available: true,
    equipmentType: "Tanker",
    length: "35 ft",
    height: "11 ft",
    weight: "9,000 lbs",
    attachmentCount: 1,
    Status: "Suspended",
  },
];