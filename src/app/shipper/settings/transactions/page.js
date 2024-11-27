"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import List from "@/components/settings-components/transaction/List";

const dataSet = [
  {
    name: "John Doe",
    invoiceNumber: "INV-001",
    date: "2024-08-28",
    amount: 100.0,
    status: "due",
  },
  {
    name: "Jane Smith",
    invoiceNumber: "INV-002",
    date: "2024-08-25",
    amount: 50.5,
    status: "paid",
  },
  {
    name: "Company A",
    invoiceNumber: "INV-003",
    date: "2024-08-20",
    amount: 250.0,
    status: "due",
  },
  {
    name: "Company B",
    invoiceNumber: "INV-004",
    date: "2024-08-15",
    amount: 100.0,
    status: "paid",
  },
  {
    name: "David Lee",
    invoiceNumber: "INV-005",
    date: "2024-08-10",
    amount: 75.25,
    status: "due",
  },
  {
    name: "Emily Chen",
    invoiceNumber: "INV-006",
    date: "2024-08-05",
    amount: 150.0,
    status: "paid",
  },
  {
    name: "Frank Wilson",
    invoiceNumber: "INV-007",
    date: "2024-07-30",
    amount: 200.0,
    status: "due",
  },
  {
    name: "Grace Kim",
    invoiceNumber: "INV-008",
    date: "2024-07-25",
    amount: 50.5,
    status: "paid",
  },
  {
    name: "Henry Baker",
    invoiceNumber: "INV-009",
    date: "2024-07-20",
    amount: 125.0,
    status: "due",
  },
  {
    name: "Isabella Taylor",
    invoiceNumber: "INV-010",
    date: "2024-07-15",
    amount: 75.25,
    status: "paid",
  },
  {
    name: "Jack Brown",
    invoiceNumber: "INV-011",
    date: "2024-07-10",
    amount: 100.0,
    status: "due",
  },
  {
    name: "Karen Davis",
    invoiceNumber: "INV-012",
    date: "2024-07-05",
    amount: 50.5,
    status: "paid",
  },
  {
    name: "Liam Johnson",
    invoiceNumber: "INV-013",
    date: "2024-06-30",
    amount: 250.0,
    status: "due",
  },
  {
    name: "Maria Jones",
    invoiceNumber: "INV-014",
    date: "2024-06-25",
    amount: 100.0,
    status: "paid",
  },
  {
    name: "Noah Miller",
    invoiceNumber: "INV-015",
    date: "2024-06-20",
    amount: 75.25,
    status: "due",
  },
  {
    name: "Olivia Smith",
    invoiceNumber: "INV-016",
    date: "2024-06-15",
    amount: 150.0,
    status: "paid",
  },
  {
    name: "Parker Johnson",
    invoiceNumber: "INV-017",
    date: "2024-06-10",
    amount: 200.0,
    status: "due",
  },
  {
    name: "Quinn Davis",
    invoiceNumber: "INV-018",
    date: "2024-06-05",
    amount: 50.5,
    status: "paid",
  },
  {
    name: "Riley Johnson",
    invoiceNumber: "INV-019",
    date: "2024-05-31",
    amount: 125.0,
    status: "due",
  },
  {
    name: "Sophia Brown",
    invoiceNumber: "INV-020",
    date: "2024-05-25",
    amount: 75.25,
    status: "paid",
  },
];

const statusOptions = [
  { value: "", label: "All" },
  { value: "due", label: "Due" },
  { value: "paid", label: "Paid" },
];

const Transactions = () => {
  const [data, setData] = useState({
    data: dataSet,
    total: dataSet.length,
    perPage: 5,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalRows: dataSet.length,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    // Update pagination total rows whenever data changes
    setPagination((prev) => ({
      ...prev,
      totalRows: filteredData.length,
    }));
  }, [data, selectedStatus]);

  // Filter data based on selected status
  const filteredData = data.data.filter((item) =>
    selectedStatus ? item.status === selectedStatus : true
  );

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      perPage,
      page: 1, // Reset to page 1 on perPage change
    }));
  };

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.perPage,
    pagination.page * pagination.perPage
  );

  const router = useRouter();
  const handleActionMenu = (data) => {
    const { type } = data;

    if (type === "VIEW") {
      router.push(`${USER?.GET_USER_DEATILS}/id-${data?.row?.age}`);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-gray-700 pb-6">Transactions</h1>

      <div className="mb-4 w-64">
        <Select
          options={statusOptions}
          value={statusOptions.find(
            (option) => option.value === selectedStatus
          )}
          onChange={(option) => setSelectedStatus(option.value)}
          className="mb-1  border border-gray-300 rounded z-40"
        />
      </div>

      <List
        rows={paginatedData}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        // handleActionMenu={handleDetailsClick}
      />
    </div>
  );
};

export default Transactions;
