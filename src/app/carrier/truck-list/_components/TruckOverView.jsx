"use client";

import React from "react";
import totalTruck from "../../../../../public/asset/truck-overview-icons/truck-blue.svg";
import activeTruck from "../../../../../public/asset/truck-overview-icons/truck-green.svg";
import calender from "../../../../../public/asset/truck-overview-icons/calender.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import Cards from "../../_component/Cards";

const cardData = [
  {
    id: 1,
    icon: totalTruck,
    bgColor: "#DDEFFF",
    title: "Total Trucks",
    count: "3,654",
  },
  {
    id: 2,
    icon: activeTruck,
    bgColor: "#DDFFE1",
    title: "Active Truck",
    count: "2,200",
  },
  {
    id: 3,
    icon: activeTruck,
    bgColor: "#F3FFDD",
    title: "Inactive Truck",
    count: "50",
  },

  {
    id: 4,
    icon: calender,
    bgColor: "#EFDDFF",
    title: "Schedule for Pickup ",
    count: "10",
  },
];
const TruckOverView = () => {
    
  return (
    <div>
      <Cards cardData={cardData} columns={4} gap={5} />
    </div>
  );
};

export default TruckOverView;
