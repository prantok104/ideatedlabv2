// "use client"
// import WithAuthorization from '@/app/HigherOrderComponents/WithAuthorization';
// import { BROWSE_ROLE } from '@/utils/permission';

// const Roles = () => {
//   return (
//     <div>Roles</div>
//   )
// }

// export default WithAuthorization(Roles, [BROWSE_ROLE]);

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { BiPlus } from "react-icons/bi";
import List from "@/components/settings-components/role/List";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BROWSE_ROLE } from "@/utils/permission";

const dataSet = [
  { title: "Admin", des: "", status: "active" },
  { title: "Shipper", des: "", status: "active" },
  { title: "Logistics", des: "", status: "deactive" },
  { title: "Operations", des: "", status: "active" },
  { title: "Dispatch", des: "", status: "active" },
];

const Roles = () => {
  const router = useRouter();

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

  const handleActionMenu = (row) => {
    // Handle action menu click
    console.log("Row data:", row);
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-11">
        <h1 className="text-3xl font-bold mb-6 col-span-0 md:col-span-10 text-gray-700">
          Role List
        </h1>

        <div className="col-span-0 md:col-span-2">
          <Button
            variant="base"
            iconLeft={<BiPlus size={20} />}
            size="small"
            onClick={() => router.push("/shipper/settings/role/create")}
          >
            Create Role
          </Button>
        </div>
      </div>

      {/* Render DataList with custom headers */}
      <List
        rows={paginatedData}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
      />
    </section>
  );
};

export default WithAuthorization(Roles, [BROWSE_ROLE]);
