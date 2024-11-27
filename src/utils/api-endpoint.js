export const apiEndpoint = {
  auth: {
    login: "/login",
    register: "/register",
    user: "/auth-user",
    getOtp: "/send-verification-code",
    verifyOtp: "/verify-otp",
    resendOtp: "/send-verification-code",
    resetPassword: "/request-reset-password",
    passwordChange: "/reset-password",
    resetPasswordOtp: "/reset-password-otp",
    resetNewPassword: "/reset-new-password",
  },
  role: {
    default: "/roles",
  },
  user: {
    default: "/users",
    update: "update-profile",
  },
  permission: {
    default: "/permissions",
  },
  subscription: {
    default: "/subscriptions",
  },
  members: {
    default: "/members",
    verify: "verify-member",
  },
  packages: {
    default: "/packages",
    features: "/features",
    companyList: "company-list",
  },
  // subscriptionPackages: {
  //   default: "/subscriptions",
  // },
  payments: {
    savedCards: "/billings/payment-methods",
    createToken: "/tokens",
    billPay: "/billings/pay-now",
    billSummary: "/billings/details",
    invoices: "/billings/invoices",
    addPaymentMethod: "/billings/add-payment-method",
  },
  compnay: {
    default: "/companies",
    editInfo: "/company",
  },
  address: {
    city: "/cities",
    state: "/states",
    district: "/districts",
    country: "/countries",
  },
  trailers: {
    default: "/trailers",
  },
  commodities: {
    default: "/commodities",
  },
  shipment: {
    default: "/shipments",
    update: "/shipment",
    list: "/shipments",
    flatRate: "shipments/flat-rate",
  },
  utils: {
    measurements: "/utils/measurement-units",
  },

  chnagePassword: {
    default: "/change-password",
  },

  carrier: {
    truck: "/trucks",
    truckList: "/trucks",
    loadSummary: "/load-summary",
    myBookedLoads: "/my-booked-loads",
    myBiddingLoads: "/my-bid-loads",
  },

  driver: {
    default: "/drivers",
    driverList: "/drivers",
  },

  truck: {
    trucksList: "/trucks",
    postTruck: "trucks/posts",
    postTruckList: "trucks/posts",
  },  

  //upload file
  upload: {
    default: "/upload-file",
    delete: "/delete-file",
  },
  
  loadSearch:{
    default: "/load-search",
    bidding: "/load",
    carrierBidding: "/load/bidding-history",
    allBidding: "/load/biddings",
    bidAcceptReject: "/load/bid-accept-or-reject",
    bookingActions: "/booking-actions",
    bookingAction: "/update-booking-action",
    trucks: "/trucks",
    drivers: "/drivers",
    loadBooking: "/load-booking"
  }
};
