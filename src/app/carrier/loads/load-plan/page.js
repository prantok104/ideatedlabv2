import React from "react";
import SearchTrips from "./_components/SearchTrips";
import TruckCard from "./_components/TruckCard";

export default function page() {
  return (
    <div>
      <div>
        <TruckCard />
      </div>
      <div>
        <SearchTrips />
      </div>
    </div>
  );
}
