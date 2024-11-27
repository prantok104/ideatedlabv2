"use client";

import React, { useState } from "react";
import RelatedTrucksDataList from "./RelatedTrucksDataList";

const dataSet = [
  {
    id: 1,
    age: "4h+",
    rate: "-",
    available: "03/11-03/12",
    trip: {
      pickup: "Los Angeles",
      dropoff: "Chicago, IL",
    },
    dh_0: "(0)",
    equipment: {
      name: "F Flatbed",
      size: "63 ft - full",
    },
    company: {
      name: "Xr Logistic Group",
      phone: "+8801234567",
    },
  },
  {
    id: 2,
    age: "2h+",
    rate: "-",
    available: "03/13-03/14",
    trip: {
      pickup: "New York, NY",
      dropoff: "Houston, TX",
    },
    dh_0: "(50)",
    equipment: {
      name: "R Reefer",
      size: "53 ft - full",
    },
    company: {
      name: "Swift Transport",
      phone: "+8802345678",
    },
  },
  {
    id: 3,
    age: "6h+",
    rate: "-",
    available: "03/15-03/16",
    trip: {
      pickup: "Dallas, TX",
      dropoff: "Miami, FL",
    },
    dh_0: "(100)",
    equipment: {
      name: "D Dry Van",
      size: "48 ft - full",
    },
    company: {
      name: "Prime Logistics",
      phone: "+8803456789",
    },
  },
  {
    id: 4,
    age: "8h+",
    rate: "-",
    available: "03/17-03/18",
    trip: {
      pickup: "San Francisco, CA",
      dropoff: "Denver, CO",
    },
    dh_0: "(25)",
    equipment: {
      name: "F Flatbed",
      size: "60 ft - full",
    },
    company: {
      name: "Express Freight",
      phone: "+8804567890",
    },
  },
  {
    id: 5,
    age: "1h+",
    rate: "-",
    available: "03/19-03/20",
    trip: {
      pickup: "Seattle, WA",
      dropoff: "Las Vegas, NV",
    },
    dh_0: "(75)",
    equipment: {
      name: "R Reefer",
      size: "53 ft - full",
    },
    company: {
      name: "Fast Movers",
      phone: "+8805678901",
    },
  },
  {
    id: 6,
    age: "3h+",
    rate: "-",
    available: "03/21-03/22",
    trip: {
      pickup: "Atlanta, GA",
      dropoff: "Orlando, FL",
    },
    dh_0: "(10)",
    equipment: {
      name: "D Dry Van",
      size: "48 ft - full",
    },
    company: {
      name: "Reliable Transport",
      phone: "+8806789012",
    },
  },
  {
    id: 7,
    age: "5h+",
    rate: "-",
    available: "03/23-03/24",
    trip: {
      pickup: "Boston, MA",
      dropoff: "Philadelphia, PA",
    },
    dh_0: "(30)",
    equipment: {
      name: "F Flatbed",
      size: "55 ft - full",
    },
    company: {
      name: "Cargo Express",
      phone: "+8807890123",
    },
  },
  {
    id: 8,
    age: "7h+",
    rate: "-",
    available: "03/25-03/26",
    trip: {
      pickup: "Las Vegas, NV",
      dropoff: "Phoenix, AZ",
    },
    dh_0: "(5)",
    equipment: {
      name: "R Reefer",
      size: "50 ft - full",
    },
    company: {
      name: "Logistic Solutions",
      phone: "+8808901234",
    },
  },
  {
    id: 9,
    age: "9h+",
    rate: "-",
    available: "03/27-03/28",
    trip: {
      pickup: "Portland, OR",
      dropoff: "Salt Lake City, UT",
    },
    dh_0: "(60)",
    equipment: {
      name: "D Dry Van",
      size: "53 ft - full",
    },
    company: {
      name: "Speedy Transport",
      phone: "+8809012345",
    },
  },
  {
    id: 10,
    age: "4h+",
    rate: "-",
    available: "03/29-03/30",
    trip: {
      pickup: "Minneapolis, MN",
      dropoff: "Milwaukee, WI",
    },
    dh_0: "(15)",
    equipment: {
      name: "F Flatbed",
      size: "60 ft - full",
    },
    company: {
      name: "Haul Masters",
      phone: "+8800123456",
    },
  },
  {
    id: 11,
    age: "2h+",
    rate: "-",
    available: "03/11-03/12",
    trip: {
      pickup: "Miami, FL",
      dropoff: "Jacksonville, FL",
    },
    dh_0: "(20)",
    equipment: {
      name: "R Reefer",
      size: "48 ft - full",
    },
    company: {
      name: "Southern Transport",
      phone: "+8801236547",
    },
  },
  {
    id: 12,
    age: "5h+",
    rate: "-",
    available: "03/13-03/14",
    trip: {
      pickup: "Houston, TX",
      dropoff: "Austin, TX",
    },
    dh_0: "(0)",
    equipment: {
      name: "D Dry Van",
      size: "50 ft - full",
    },
    company: {
      name: "Texas Logistics",
      phone: "+8804567231",
    },
  },
  {
    id: 13,
    age: "1h+",
    rate: "-",
    available: "03/15-03/16",
    trip: {
      pickup: "Phoenix, AZ",
      dropoff: "Tucson, AZ",
    },
    dh_0: "(12)",
    equipment: {
      name: "F Flatbed",
      size: "55 ft - full",
    },
    company: {
      name: "Desert Freight",
      phone: "+8807890124",
    },
  },
  {
    id: 14,
    age: "6h+",
    rate: "-",
    available: "03/17-03/18",
    trip: {
      pickup: "San Diego, CA",
      dropoff: "Los Angeles, CA",
    },
    dh_0: "(0)",
    equipment: {
      name: "R Reefer",
      size: "53 ft - full",
    },
    company: {
      name: "Coastal Transport",
      phone: "+8805678902",
    },
  },
  {
    id: 15,
    age: "7h+",
    rate: "-",
    available: "03/19-03/20",
    trip: {
      pickup: "Las Vegas, NV",
      dropoff: "San Francisco, CA",
    },
    dh_0: "(5)",
    equipment: {
      name: "D Dry Van",
      size: "48 ft - full",
    },
    company: {
      name: "Western Movers",
      phone: "+8808901278",
    },
  },
  {
    id: 16,
    age: "8h+",
    rate: "-",
    available: "03/21-03/22",
    trip: {
      pickup: "Orlando, FL",
      dropoff: "Atlanta, GA",
    },
    dh_0: "(100)",
    equipment: {
      name: "F Flatbed",
      size: "60 ft - full",
    },
    company: {
      name: "Sunshine Logistics",
      phone: "+8802347891",
    },
  },
  {
    id: 17,
    age: "9h+",
    rate: "-",
    available: "03/23-03/24",
    trip: {
      pickup: "New York, NY",
      dropoff: "Boston, MA",
    },
    dh_0: "(25)",
    equipment: {
      name: "R Reefer",
      size: "50 ft - full",
    },
    company: {
      name: "Metro Transport",
      phone: "+8803456780",
    },
  },
  {
    id: 18,
    age: "3h+",
    rate: "-",
    available: "03/25-03/26",
    trip: {
      pickup: "Chicago, IL",
      dropoff: "Detroit, MI",
    },
    dh_0: "(45)",
    equipment: {
      name: "D Dry Van",
      size: "48 ft - full",
    },
    company: {
      name: "Great Lakes Freight",
      phone: "+8804567894",
    },
  },
  {
    id: 19,
    age: "2h+",
    rate: "-",
    available: "03/27-03/28",
    trip: {
      pickup: "Dallas, TX",
      dropoff: "Houston, TX",
    },
    dh_0: "(12)",
    equipment: {
      name: "F Flatbed",
      size: "60 ft - full",
    },
    company: {
      name: "Lone Star Transport",
      phone: "+8805678903",
    },
  },
  {
    id: 20,
    age: "1h+",
    rate: "-",
    available: "03/29-03/30",
    trip: {
      pickup: "Denver, CO",
      dropoff: "Salt Lake City, UT",
    },
    dh_0: "(0)",
    equipment: {
      name: "R Reefer",
      size: "50 ft - full",
    },
    company: {
      name: "Mountain Movers",
      phone: "+8806789015",
    },
  },
  {
    id: 21,
    age: "4h+",
    rate: "-",
    available: "04/01-04/02",
    trip: {
      pickup: "Portland, OR",
      dropoff: "Seattle, WA",
    },
    dh_0: "(25)",
    equipment: {
      name: "D Dry Van",
      size: "53 ft - full",
    },
    company: {
      name: "Pacific Transport",
      phone: "+8807890146",
    },
  },
  {
    id: 22,
    age: "6h+",
    rate: "-",
    available: "04/03-04/04",
    trip: {
      pickup: "Phoenix, AZ",
      dropoff: "San Diego, CA",
    },
    dh_0: "(50)",
    equipment: {
      name: "F Flatbed",
      size: "55 ft - full",
    },
    company: {
      name: "Desert Logistics",
      phone: "+8808901257",
    },
  },
  {
    id: 23,
    age: "9h+",
    rate: "-",
    available: "04/05-04/06",
    trip: {
      pickup: "San Antonio, TX",
      dropoff: "Dallas, TX",
    },
    dh_0: "(10)",
    equipment: {
      name: "R Reefer",
      size: "48 ft - full",
    },
    company: {
      name: "Alamo Freight",
      phone: "+8809012368",
    },
  },
  {
    id: 24,
    age: "3h+",
    rate: "-",
    available: "04/07-04/08",
    trip: {
      pickup: "Jacksonville, FL",
      dropoff: "Tampa, FL",
    },
    dh_0: "(0)",
    equipment: {
      name: "D Dry Van",
      size: "53 ft - full",
    },
    company: {
      name: "Sunshine Express",
      phone: "+8800123498",
    },
  },
  {
    id: 25,
    age: "2h+",
    rate: "-",
    available: "04/09-04/10",
    trip: {
      pickup: "Raleigh, NC",
      dropoff: "Charlotte, NC",
    },
    dh_0: "(15)",
    equipment: {
      name: "F Flatbed",
      size: "60 ft - full",
    },
    company: {
      name: "Carolina Movers",
      phone: "+8802345679",
    },
  },
  {
    id: 26,
    age: "5h+",
    rate: "-",
    available: "04/11-04/12",
    trip: {
      pickup: "Indianapolis, IN",
      dropoff: "Cincinnati, OH",
    },
    dh_0: "(35)",
    equipment: {
      name: "R Reefer",
      size: "50 ft - full",
    },
    company: {
      name: "Midwest Transport",
      phone: "+8803456785",
    },
  },
  {
    id: 27,
    age: "8h+",
    rate: "-",
    available: "04/13-04/14",
    trip: {
      pickup: "Louisville, KY",
      dropoff: "Nashville, TN",
    },
    dh_0: "(12)",
    equipment: {
      name: "D Dry Van",
      size: "48 ft - full",
    },
    company: {
      name: "Bluegrass Logistics",
      phone: "+8804567891",
    },
  },
  {
    id: 28,
    age: "7h+",
    rate: "-",
    available: "04/15-04/16",
    trip: {
      pickup: "Cleveland, OH",
      dropoff: "Pittsburgh, PA",
    },
    dh_0: "(60)",
    equipment: {
      name: "F Flatbed",
      size: "53 ft - full",
    },
    company: {
      name: "Steel City Transport",
      phone: "+8805678906",
    },
  },
  {
    id: 29,
    age: "1h+",
    rate: "-",
    available: "04/17-04/18",
    trip: {
      pickup: "Richmond, VA",
      dropoff: "Washington, DC",
    },
    dh_0: "(0)",
    equipment: {
      name: "R Reefer",
      size: "48 ft - full",
    },
    company: {
      name: "Capitol Movers",
      phone: "+8806789032",
    },
  },
  {
    id: 30,
    age: "9h+",
    rate: "-",
    available: "04/19-04/20",
    trip: {
      pickup: "Kansas City, MO",
      dropoff: "St. Louis, MO",
    },
    dh_0: "(5)",
    equipment: {
      name: "D Dry Van",
      size: "53 ft - full",
    },
    company: {
      name: "Heartland Logistics",
      phone: "+8807890120",
    },
  },
];

export default function RelatedTrucksTable() {
  const [data, setData] = useState({
    data: dataSet,
    total: dataSet.length,
    perPage: 10,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 10,
  });

  console.log(data);

  //   const [loading, setLoading] = useState(false);

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  };

  return (
    <div>
      <RelatedTrucksDataList
        rows={data}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        pagination={pagination}
      />
    </div>
  );
}
