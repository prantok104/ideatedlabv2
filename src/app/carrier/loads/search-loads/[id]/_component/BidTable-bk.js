"use client";

import React, { useState, useEffect } from "react";
import BidDataList from "./BidDataList";
import { dataSet } from "./TemporaryData";

export default function BidTable({bids =[]}) {
  const [data, setData] = useState({
    data: [],
    total: 0,
    perPage: 30,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 30,
    totalRows: 30,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      data: bids,
      total: bids?.length,
      perPage: 30,
    }))
  },[bids])

  //   const [loading, setLoading] = useState(false);

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  };

  return (
    <div>
      <BidDataList
        rows={data}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        pagination={pagination}
      />
    </div>
  );
}
