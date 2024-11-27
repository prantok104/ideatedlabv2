"use client";

import { useState } from "react";
import DataList from "../app/shipper/shipment/_components/DataList-bk";

const dataSet = [
  {
    publishAt: "2024-09-11 19:19:59",
    pickDate: "2024-10-09",
    picUp: {
      location: "Philadelphia,PA",
      lat: "39.95",
      long: "75.17",
    },
    dropOff: [
      {
        location: "New York,NY",
        lat: "40.71",
        long: "74.01",
      },
      {
        location: "New York2,NY",
        lat: "40.7187",
        long: "74.0189",
      },
    ],
    reference: "Email Ref",
    equipment: "Aluminum Body",
    rate: {
      totalPoint: 15,
      earnning: 14,
    },
    Propose: "Express Propose",
    status: "pending",
  },
  {
    publishAt: "2024-09-12 10:10:10",
    pickDate: "2024-10-11",
    picUp: {
      location: "Chicago,IL",
      lat: "41.87",
      long: "87.62",
    },
    dropOff: [
      {
        location: "Los Angeles,CA",
        lat: "34.05",
        long: "118.25",
      },
      {
        location: "Los Angeles2,CA",
        lat: "34.0522",
        long: "118.2437",
      },
    ],
    reference: "Phone Ref",
    equipment: "Steel Body",
    rate: {
      totalPoint: 20,
      earnning: 18,
    },
    Propose: "Standard Propose",
    status: "pending",
  },
  {
    publishAt: "2024-09-13 12:12:12",
    pickDate: "2024-10-13",
    picUp: {
      location: "Houston,TX",
      lat: "29.76",
      long: "95.36",
    },
    dropOff: [
      {
        location: "Dallas,TX",
        lat: "32.77",
        long: "96.79",
      },
      {
        location: "Dallas2,TX",
        lat: "32.7767",
        long: "96.7969",
      },
    ],
    reference: "Web Ref",
    equipment: "Reefer",
    rate: {
      totalPoint: 25,
      earnning: 22,
    },
    Propose: "Express Propose",
    status: "pending",
  },
  {
    publishAt: "2024-09-14 14:14:14",
    pickDate: "2024-10-15",
    picUp: {
      location: "Phoenix,AZ",
      lat: "33.45",
      long: "112.07",
    },
    dropOff: [
      {
        location: "San Francisco,CA",
        lat: "37.77",
        long: "122.42",
      },
      {
        location: "San Francisco2,CA",
        lat: "37.7749",
        long: "122.4194",
      },
    ],
    reference: "Email Ref",
    equipment: "Flatbed",
    rate: {
      totalPoint: 30,
      earnning: 26,
    },
    Propose: "Standard Propose",
    status: "pending",
  },
  {
    publishAt: "2024-09-15 16:16:16",
    pickDate: "2024-10-17",
    picUp: {
      location: "Philadelphia,PA",
      lat: "39.95",
      long: "75.17",
    },
    dropOff: [
      {
        location: "Washington D.C.",
        lat: "38.90",
        long: "77.04",
      },
      {
        location: "Washington D.C.2",
        lat: "38.8951",
        long: "77.0365",
      },
    ],
    reference: "Phone Ref",
    equipment: "Aluminum Body",
    rate: {
      totalPoint: 35,
      earnning: 30,
    },
    Propose: "Express Propose",
    status: "pending",
  },
];

export default function page() {
  const [data, setData] = useState({
    data: dataSet,
    total: dataSet.length,
    perPage: 2,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 0,
  });

  const [loading, setLoading] = useState(false);

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  };

  return (
    <div>
      <DataList
        rows={data}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
      />
    </div>
  );
}
