"use client";
import { useApp } from "@/contexts/AppContext";
import { updateAppConfigData, updateQueryParams } from "@/utils/helper";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const customStyleCss = {
  table: {
    style: {
      borderRadius: "10px",
      tableLayout: "fixed",
      // overflow: "hidden",
    },
  },
  // tableWrapper: {
  //   style: {
  //     overflow: "auto",
  //     // borderRadius: "10px",
  //   },
  // },

  headRow: {
    style: {
      paddingTop: "18px",
      paddingBottom: "18px",
    },
  },
  rows: {
    style: {
      // minHeight: "54px", // override the row height
      // backgroundColor: "#F9FAFB",
      paddingTop: "18px",
      paddingBottom: "18px",
      // "&:not(:last-child)": {
      //   marginBottom: "10px",
      //   borderBottom: "none",
      // },
    },
  },

  // headCells: {
  //   style: {
  //     // paddingLeft: "16px", // override the cell padding for head cells
  //     // paddingRight: "8px",
  //   },
  // },
  // cells: {
  //   style: {
  //     // paddingLeft: "8px", // override the cell padding for data cells
  //     // paddingRight: "8px",
  //   },
  // },
  pagination: {
    style: {
      borderTop: "none",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
    },
  },
};

const ReactDataTableComponent = ({
  title,
  columns,
  rows,
  selectableRows = false,
}) => {
  const { appConfig, updateAppConfig } = useApp();
  const [pending, setPending] = useState(true);
  const onChangePage = (page) => {
    updateQueryParams(appConfig, updateAppConfig, {
      page,
    });
  };

  const onChangeRowsPerPage = (limit) => {
    updateQueryParams(appConfig, updateAppConfig, {
      limit,
    });
  };

  const onSelectedRowsChange = (selectedRows) => {
    updateAppConfigData(appConfig, updateAppConfig, {
      selectedRows,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="table-wrap">
      <DataTable
        progressPending={!rows?.data ?? pending}
        // progressComponent={<DataTableLoader />}
        title={title}
        columns={columns}
        data={rows?.data || []}
        paginationServer
        paginationPerPage={rows?.limit || 10} // Pass the current perPage value
        paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 25, 30]}
        paginationTotalRows={rows?.total} // Pass the total number of rows
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onSelectedRowsChange={onSelectedRowsChange}
        pointerOnHover
        highlightOnHover
        customStyles={customStyleCss}
        pagination={true}
        selectableRows={selectableRows || false}
        fixedHeader={false}
        fixedHeaderScrollHeight={"300px"}
        responsive
      />
    </div>
  );
};

export default ReactDataTableComponent;
