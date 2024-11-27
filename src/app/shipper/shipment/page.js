"use client";
import Button from "@/components/button/Button";
import Tab from "@/components/tab/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import DataList from "./_components/DataList";
import FilterSearch from "./_components/FilterSearch";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import FilterForm from "./_components/FilterForm";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import {
  BROWSE_SHIPMENT,
  DELETE_SHIPMENT,
  POST_SHIPMENT,
  VIEW_SHIPMENT,
} from "@/utils/permission";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import useFilter from "@/hooks/useFilter";
import {
  SHIPMENT_STATUS_PUBLISHED,
  SHIPMENT_STATUS_RUNNING,
} from "@/utils/static-const";
import {
  SHIPMENT_STATUS_DRAFT,
  SHIPMENT_STATUS_HISTORY,
  SHIPMENT_STATUS_IN_REVIEW,
} from "../../../utils/static-const";

const Shipments = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") || SHIPMENT_STATUS_PUBLISHED; // Default to "Active" if no type is provided
  // const [filter, setFilter] = useState({
  //   page: 1,
  //   limit: 10,
  //   shipmentStatus: 'published'
  // })
  const { filter, setFilter } = useFilter({ shipmentStatus: typeParam });

  const {
    data: listData,
    isLoading: loader,
    mutate,
  } = apiClient.useAxiosSWR(apiEndpoint.shipment.default, {
    params: filter,
  });

  // const [data, setData] = useState({
  //   data: listData?.data ?? [],
  //   total: (listData?.data ?? []).length,
  // });

  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   perPage: 10,
  //   totalRows: 0,
  // });

  const [activeTab, setActiveTab] = useState(typeParam);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    router.push(`/shipper/shipment?type=${tabId}`);
  };

  // const handlePageChange = (page) => {
  //   setPagination((prevPagination) => ({ ...prevPagination, page }));
  // };

  // const handlePerPageChange = (perPage) => {
  //   setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  // };

  const handleActionMenu = (actionType, row) => {
    const { id } = row; // Extract the id from the row object

    switch (actionType) {
      case "Details":
        router.push(`/shipper/shipment/${id}?page=${activeTab}`);
        break;
      case "Edit":
        router.push(`/shipper/shipment/${id}/edit?page=${activeTab}`);
        break;
      case "Duplicate":
        router.push(`/shipper/shipment/${id}/duplicate?page=${activeTab}`);
        break;
      default:
        console.warn("Unhandled action type:", actionType);
    }
  };

  const tabs = [
    { id: SHIPMENT_STATUS_RUNNING, label: "Running" },
    { id: SHIPMENT_STATUS_PUBLISHED, label: "Active" },
    { id: SHIPMENT_STATUS_DRAFT, label: "Draft" },
    { id: SHIPMENT_STATUS_HISTORY, label: "History" },
    { id: SHIPMENT_STATUS_IN_REVIEW, label: "In Review" },
  ];

  const TabContent = {
    Running: (
      <DataList
        rows={listData}
        tableType="running"
        handleActionMenu={handleActionMenu}
      />
    ),
    Published: (
      <DataList
        rows={listData}
        tableType="published"
        handleActionMenu={handleActionMenu}
      />
    ),
    Draft: (
      <DataList
        rows={listData}
        tableType="draft"
        handleActionMenu={handleActionMenu}
      />
    ),
    History: (
      <DataList
        rows={listData}
        tableType="history"
        handleActionMenu={handleActionMenu}
      />
    ),
    In_review: (
      <DataList
        rows={listData}
        tableType="in_review"
        handleActionMenu={handleActionMenu}
      />
    ),
  };

  useEffect(() => {
    const newType = typeParam;
    setActiveTab(newType); // Capitalize the typeParam to match tab ids

    setFilter((prev) => ({
      ...prev,
      shipmentStatus:
        activeTab == "active" ? SHIPMENT_STATUS_PUBLISHED : activeTab,
    }));
  }, [typeParam]);

  // useEffect(() => {
  //   setData((prev) => ({
  //     ...prev,
  //     data: listData?.data ?? [],
  //     total: (listData?.data ?? []).length,
  //   }));
  // }, [loader, listData]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end">
        <div></div>
        <div>
          <Button
            variant="base"
            size="small"
            onClick={() => router.push("/shipper/shipment/post-new-shipment")}
          >
            Post Shipment
          </Button>
        </div>
      </div>

      <Tab
        tabs={tabs}
        loader={loader}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        dataCount={`${listData?.total} Loads ${
          activeTab === "Published"
            ? "Published"
            : activeTab === "Draft"
            ? "Draft"
            : activeTab === "In_Review"
            ? "In Review"
            : "History"
        }`}
        secondaryChildren={
          activeTab === "Active" ? (
            <FilterSearch onToggle={toggleDrawer} />
          ) : null
        }
      >
        {TabContent[activeTab]}
      </Tab>

      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        style={"w-[500px]"}
      >
        <div>
          <div className="text-[#1c252e] text-end text-xl font-medium  leading-7 mt-4">
            Extend Date
          </div>

          <div className="w-[31px] text-[#454f5b] text-sm font-medium  uppercase leading-tight mt-[17px]">
            Trip
          </div>

          <FilterForm />
        </div>
      </RightDrawer>
    </div>
  );
};
export default WithAuthorization(Shipments, [
  BROWSE_SHIPMENT,
  VIEW_SHIPMENT,
  POST_SHIPMENT,
  DELETE_SHIPMENT,
]);
