import React from "react";
import { FakeData } from "./FakeData";
import HistoryCard from "./HistoryCard";

const RecentHistory = () => {
  return (
    <div>
      <h1 className="mt-14 mb-4 font-semibold text-3xl">Recent Search</h1>
      {FakeData.map((data, index) => (
        <HistoryCard
          key={index}
          time={data.time}
          location={data.location}
          distance={data.distance}
          destination={data.destination}
          filterOptions={data.filterOptions}
          onSaveSearch={() => alert(`Save Search clicked for ${data.location}`)}
        />
      ))}
    </div>
  );
};

export default RecentHistory;
