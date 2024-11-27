"use client";

import DataTable from "react-data-table-component";

const DataTableComponent = ({
  title,
  columns,
  rows,
  paginationTotalRows,
  pagination,
  handlePerPageChange,
  handlePageChange,
  onChangePage,
  onChangeRowsPerPage,
  selectableRows,
  onSelectedRowsChange,
  toggleCleared,
  fixedHeader,
  fixedHeaderScrollHeight,
}) => {
  const customStyles = {
    headRow: {
      style: {
        border: "none",
        color: "#333",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "54px", // override the row height
        // "&:hover": {
        //   backgroundColor: "#F1F9E6", // Change background color on hover
        // },
        paddingTop: "8px",
        paddingBottom: "8px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#F1F9E6", // Change background color on hover
      },
    },
  };

  return (
    <DataTable
      title={title}
      columns={columns}
      data={rows?.data || rows}
      pagination={pagination}
      // paginationServer
      paginationPerPage={rows?.limit || pagination?.perPage || 10} // Pass the current perPage value
      paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 25, 30]}
      paginationTotalRows={rows?.total || paginationTotalRows} // Pass the total number of rows
      onChangePage={handlePageChange || onChangePage}
      onChangeRowsPerPage={handlePerPageChange || onChangeRowsPerPage}
      selectableRows={selectableRows}
      onSelectedRowsChange={onSelectedRowsChange}
      clearSelectedRows={toggleCleared}
      fixedHeader={fixedHeader}
      fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      pointerOnHover
      highlightOnHover
      customStyles={customStyles}
    />
  );
};

export default DataTableComponent;
