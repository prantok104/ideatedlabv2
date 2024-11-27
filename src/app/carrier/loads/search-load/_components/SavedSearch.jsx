import React from "react";
import HistoryCard from "./HistoryCard";
import { FakeData } from "./FakeData";

export default function SavedSearch() {
  return (
    <div>
      <h1 className="mt-14 mb-4 font-semibold text-3xl">Saved Search</h1>
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
}
