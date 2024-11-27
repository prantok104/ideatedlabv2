'use client';

import DataTableComponent from "@/components/table/DataTableComponent";
import UserTableHeaders from "./UserTableHeaders";

const DataList = ({
  rows,
  pagination,
  handlePageChange,
  handlePerPageChange,
  handleActionMenu,
}) => {
  const columns = UserTableHeaders(handleActionMenu);

  return (
    <>
      <DataTableComponent
        columns={columns}
        rows={rows}
        paginationTotalRows={pagination.totalRows} // Pass total rows to DataTableComponent
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        selectableRows={true}
        fixedHeader={true}
        fixedHeaderScrollHeight={"550px"}
      />
    </>
  );
};

export default DataList;
