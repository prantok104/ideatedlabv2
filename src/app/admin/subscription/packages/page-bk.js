"use client";

import React, { useState, useEffect } from "react";
import fetchSubscriptionsApi from "./_components/fetchSubscriptionsApi";
import UpdateModal from "./_components/UpdateModal";
import ConfirmationModal from "./_components/ConfirmationModal";
import updateSubscriptionApi from "./_components/updateSubscriptionApi";
import deleteSubscriptionApi from "./_components/deleteSubscriptionApi";
import DataTableComponent from "@/components/table/DataTableComponent";
import FilterableSelect from "@/components/table/FilterableSelect";
import ActionMenu from "@/components/table/ActionMenu";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

const SubscriptionTable = () => {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDurationType, setSelectedDurationType] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    module: "",
    type: "",
    fee: "",
    currency: "",
    durationType: "",
    duration: "",
    docStatus: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const moduleOptions = [
    { label: "Select Module Type", value: "" },
    { label: "Carrier", value: "Carrier" },
    { label: "Shipper", value: "Shipper" },
    { label: "Broker", value: "Broker" },
  ];
  const typeOptions = [
    { label: "Select Type", value: "" },
    { label: "Enterprise", value: "Enterprise" },
    { label: "Premium", value: "Premium" },
    { label: "Free", value: "Free" },
  ];
  const durationTypeOptions = [
    { label: "Select Duration Type", value: "" },
    { label: "Yearly", value: "Yearly" },
    { label: "HalfYearly", value: "HalfYearly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Monthly", value: "Monthly" },
  ];

  const menuItems = [
    { text: "Update", type: "Update" },
    { text: "Delete", type: "Delete" },
  ];

  useEffect(() => {
    loadSubscriptions();
  }, [
    selectedModule,
    selectedType,
    selectedDurationType,
    currentPage,
    perPage,
  ]);

  const loadSubscriptions = async () => {
    try {
      const params = {
        page: currentPage,
        limit: perPage,
        module: selectedModule,
        type: selectedType,
        durationType: selectedDurationType,
      };
      const data = await fetchSubscriptionsApi(params);
      setSubscriptions(data.data.data); // Adjust according to your API response structure
      setTotalRows(data.data.total); // Adjust if your API provides a total count for pagination
    } catch (error) {
      console.error("Error loading subscriptions:", error);
    }
  };

  // const { data, error, isLoading, mutate } = fetchSubscriptionsApi({
  //   page: currentPage,
  //   limit: perPage,
  //   module: selectedModule,
  //   type: selectedType,
  //   durationType: selectedDurationType,
  // });

  // console.log(data?.data);

  // useEffect(() => {
  //   if (data) {
  //     setSubscriptions(data?.data); // Adjust according to your API response structure
  //     setTotalRows(data?.total); // Adjust if your API provides a total count for pagination
  //   }
  // }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // const handleModuleChange = (e) => {
  //   setSelectedModule(e.value);
  //   setCurrentPage(1); // Reset to first page on filter change
  //   // mutate(e.value);
  // };

  // const handleTypeChange = (e) => {
  //   setSelectedType(e.value);
  //   setCurrentPage(1); // Reset to first page on filter change
  //   // mutate(e.value);
  // };

  // const handleDurationTypeChange = (e) => {
  //   setSelectedDurationType(e.value);
  //   setCurrentPage(1); // Reset to first page on filter change
  //   // mutate(e.value);
  // };

  const handleSearchFilter = (value) => {
    console.log(value);
  };

  const handleActionMenu = (actionType, row) => {
    if (actionType === "Update") {
      handleUpdate(row.id);
    } else if (actionType === "Delete") {
      handleDelete(row.id);
    }
  };

  const handleUpdate = (id) => {
    console.log(id);
    const subscription = subscriptions.find((sub) => sub.id === id);
    console.log(subscription);
    if (subscription) {
      setFormData(subscription);
      setShowUpdateForm(true);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSubscriptionApi(deleteId);
      setShowConfirmationModal(false);
      setDeleteId(null);
      loadSubscriptions(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      await updateSubscriptionApi(formData.id, values);
      setShowUpdateForm(false);
      loadSubscriptions(); // Refresh the table after update
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const columns = [
    {
      name: "Module",
      selector: (row) => row.module,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Fee",
      selector: (row) => row.fee,
      sortable: true,
    },
    {
      name: "Currency",
      selector: (row) => row.currency,
    },
    {
      name: "Duration Type",
      selector: (row) => row.durationType,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Document Status",
      selector: (row) => row.docStatus,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          menuItems={menuItems}
          handleActionMenu={handleActionMenu}
          row={row}
        />
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4 mt-2">
        <div className="flex items-center gap-4 ml-4">
          <FilterableSelect
            defaultValue={selectedModule}
            onChange={(e) =>
              handleSearchFilter({
                module: e.value,
              })
            }
            options={moduleOptions}
            placeholder="Select Module Type"
          />
          <FilterableSelect
            defaultValue={selectedType}
            onChange={(e) =>
              handleSearchFilter({
                type: e.value,
              })
            }
            options={typeOptions}
            placeholder="Select Type"
          />
          <FilterableSelect
            defaultValue={selectedDurationType}
            onChange={(e) =>
              handleSearchFilter({
                durationType: e.value,
              })
            }
            options={durationTypeOptions}
            placeholder="Select Duration Type"
          />
        </div>
        <div>
          <Button
            variant="rectangleFill"
            size="medum"
            onClick={() =>
              router.push("/admin/subscription/packages/create-package")
            }
          >
            <span className="text-xl pr-1 my-auto">+</span>Create New Package
          </Button>
        </div>
      </div>

      <DataTableComponent
        columns={columns}
        rows={subscriptions}
        highlightOnHover
        pointerOnHover
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        fixedHeader={true}
        fixedHeaderScrollHeight="550px"
      />

      <UpdateModal
        visible={showUpdateForm}
        formData={formData}
        onCancel={() => setShowUpdateForm(false)}
        onSubmit={handleFormSubmit}
        moduleOptions={moduleOptions}
        durationTypeOptions={durationTypeOptions}
      />

      <ConfirmationModal
        visible={showConfirmationModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </div>
  );
};

export default SubscriptionTable;
