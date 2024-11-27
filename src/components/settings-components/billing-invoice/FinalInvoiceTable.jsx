"use client";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import { FaPrint } from "react-icons/fa6";
import List from "@/components/settings-components/billing-invoice/List";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import InvoiceList from "./InvoiceList";
import dayjs from "dayjs";
import { useApp } from "@/contexts/AppContext";
import useFilter from "@/hooks/useFilter";
import SearchableSelect from "@/components/form/SearchableSelect";

// const dataSet = [
//   {
//     planName: "Premium",
//     name: "John Doe",
//     amount: "﷼300",
//     transactionId: "TXN001",
//     date: "2024-08-01",
//     status: "paid",
//     address: "123 Elm Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Jane Smith",
//     amount: "﷼200",
//     transactionId: "TXN002",
//     date: "2024-08-02",
//     status: "due",
//     address: "456 Oak Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "Michael Johnson",
//     amount: "﷼100",
//     transactionId: "TXN003",
//     date: "2024-08-03",
//     status: "paid",
//     address: "789 Pine Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "Emily Davis",
//     amount: "﷼300",
//     transactionId: "TXN004",
//     date: "2024-08-04",
//     status: "paid",
//     address: "321 Maple Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Daniel Brown",
//     amount: "﷼200",
//     transactionId: "TXN005",
//     date: "2024-08-05",
//     status: "due",
//     address: "654 Cedar Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "Olivia Wilson",
//     amount: "﷼100",
//     transactionId: "TXN006",
//     date: "2024-08-06",
//     status: "paid",
//     address: "987 Spruce Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "Sophia Martinez",
//     amount: "﷼300",
//     transactionId: "TXN007",
//     date: "2024-08-07",
//     status: "paid",
//     address: "123 Birch Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Liam Garcia",
//     amount: "﷼200",
//     transactionId: "TXN008",
//     date: "2024-08-08",
//     status: "due",
//     address: "456 Redwood Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "William Lee",
//     amount: "﷼100",
//     transactionId: "TXN009",
//     date: "2024-08-09",
//     status: "paid",
//     address: "789 Fir Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "Isabella Rodriguez",
//     amount: "﷼300",
//     transactionId: "TXN010",
//     date: "2024-08-10",
//     status: "due",
//     address: "321 Aspen Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Lucas Martinez",
//     amount: "﷼200",
//     transactionId: "TXN011",
//     date: "2024-08-11",
//     status: "paid",
//     address: "654 Willow Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "Mia Hernandez",
//     amount: "﷼100",
//     transactionId: "TXN012",
//     date: "2024-08-12",
//     status: "due",
//     address: "987 Elm Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "James Lopez",
//     amount: "﷼300",
//     transactionId: "TXN013",
//     date: "2024-08-13",
//     status: "paid",
//     address: "123 Spruce Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Charlotte Gonzalez",
//     amount: "﷼200",
//     transactionId: "TXN014",
//     date: "2024-08-14",
//     status: "paid",
//     address: "456 Birch Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "Alexander Perez",
//     amount: "﷼100",
//     transactionId: "TXN015",
//     date: "2024-08-15",
//     status: "due",
//     address: "789 Cedar Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "Amelia Thompson",
//     amount: "﷼300",
//     transactionId: "TXN016",
//     date: "2024-08-16",
//     status: "paid",
//     address: "321 Oak Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Benjamin Hall",
//     amount: "﷼200",
//     transactionId: "TXN017",
//     date: "2024-08-17",
//     status: "due",
//     address: "654 Pine Avenue, Jeddah, KSA",
//   },
//   {
//     planName: "Basic",
//     name: "Harper Allen",
//     amount: "﷼100",
//     transactionId: "TXN018",
//     date: "2024-08-18",
//     status: "paid",
//     address: "987 Maple Road, Dammam, KSA",
//   },
//   {
//     planName: "Premium",
//     name: "Elijah Wright",
//     amount: "﷼300",
//     transactionId: "TXN019",
//     date: "2024-08-19",
//     status: "paid",
//     address: "123 Fir Street, Riyadh, KSA",
//   },
//   {
//     planName: "Pro",
//     name: "Ava Scott",
//     amount: "﷼200",
//     transactionId: "TXN020",
//     date: "2024-08-20",
//     status: "due",
//     address: "456 Spruce Avenue, Jeddah, KSA",
//   },
// ];

const statusOptions = [
  { value: "", label: "All" },
  { value: "due", label: "Due" },
  { value: "paid", label: "Paid" },
];
const FinalInvoiceTable = () => {
  const { user } = useApp();
  const { filter, setFilter } = useFilter();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#73C002" : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 1px #73C002" : "none",
      padding: "4px 8px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e7eb",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#73C002" : "white",
      cursor: "pointer",
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

  // Data fetch
  const { data: invoices } = apiClient.useAxiosSWR(
    apiEndpoint.payments.invoices,
    { params: filter }
  );

  // useEffect(() => {
  //   setPagination((prev) => ({
  //     ...prev,
  //     totalRows: filteredData.length,
  //   }));
  // }, [data, selectedStatus, searchTerm]);

  // const filteredData = data.data.filter((item) => {
  //   const matchesStatus = selectedStatus
  //     ? item.status === selectedStatus
  //     : true;
  //   const matchesSearchTerm =
  //     item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.planName.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesStatus && matchesSearchTerm;
  // });

  // const handlePageChange = (page) => {
  //   setPagination((prevPagination) => ({ ...prevPagination, page }));
  //   setFilter((prevState) => {
  //     return {
  //       ...prevState,
  //       page: page,
  //     };
  //   });
  // };

  // const handlePerPageChange = (perPage) => {
  //   setPagination((prevPagination) => ({
  //     ...prevPagination,
  //     perPage,
  //     page: 1,
  //   }));
  //   setFilter((prevState) => {
  //     return {
  //       ...prevState,
  //       limit: perPage,
  //     };
  //   });
  // };

  // const paginatedData = filteredData.slice(
  //   (pagination.page - 1) * pagination.perPage,
  //   pagination.page * pagination.perPage
  // );

  const handleActionMenu = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // print function here
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore original content
  };
  // print function here

  return (
    <>
      <div className="flex items-center">
        <div className="mb-4 w-full flex justify-between">
          <div className="relative ml-4">
            <input
              type="text"
              placeholder="Invoice"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFilter((prev) => ({
                  ...prev,
                  invoiceNumber: e.target.value,
                }));
              }}
              className="p-2 pl-10 border border-gray-300 rounded w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          <Select
            options={statusOptions}
            styles={customStyles}
            value={statusOptions.find(
              (option) => option.value === selectedStatus
            )}
            onChange={(option) => setSelectedStatus(option.value)}
            className="mb-1 border border-gray-300 rounded z-40"
          />
        </div>
      </div>
      <InvoiceList rows={invoices} handleActionMenu={handleActionMenu} />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="max-w-6xl"
        >
          {/* Display selected row details in the modal */}
          <div ref={printRef} className="p-6">
            {/* Invoice Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedRow?.company?.title}
                  </h2>
                  <p>{`${selectedRow?.company?.city ?? ""} ${
                    selectedRow?.company?.state ?? ""
                  } ${selectedRow?.company?.zipCode ?? ""}`}</p>
                  <p>Phone: {user?.phone}</p>
                  <p>Email: {selectedRow?.company?.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Invoice #: {selectedRow?.invoiceNumber}
                  </h3>
                  <p>
                    Date: {dayjs(selectedRow?.paidAt).format("DD MMM, YYYY")}
                  </p>
                  <p>
                    Status:{" "}
                    <span className="text-lg font-bold text-blue-600">
                      {selectedRow?.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Billed To */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold">Billed To:</h3>
              <p>{`${user?.firstName} ${user?.lastName}` || "Customer Name"}</p>
              <p>{user?.email || "Customer Address"}</p>
            </div>

            {/* Invoice Details Table */}
            <table className="w-full mb-8 border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-200 p-2 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2">
                    {selectedRow?.planName || "Service/Plan Name"}
                  </td>
                  <td className="border border-gray-200 p-2 text-right">
                    {selectedRow?.amount || "$0.00"}
                  </td>
                </tr>
                {/* Add more rows if needed */}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border border-gray-200 p-2 font-semibold">
                    Total
                  </td>
                  <td className="border border-gray-200 p-2 text-right font-semibold">
                    {selectedRow?.amount || "$0.00"}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Notes Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold">Notes:</h3>
              <p>Thank you for your business. Payment is due within 30 days.</p>
            </div>

            {/* Print Button */}
          </div>

          <div className="container mx-auto flex justify-center">
            <div className="w-48">
              <Button
                variant="printBtn"
                size="small"
                onClick={handlePrint}
                iconLeft={<FaPrint />}
              >
                Print Invoice
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FinalInvoiceTable;
