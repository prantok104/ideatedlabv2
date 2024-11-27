import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { ACTION_TYPES } from "@/utils/static-const";
import dayjs from "dayjs";
import { useMemo } from "react";
const userMenuItems = [
  { text: "View Profile", type: ACTION_TYPES?.VIEW },
  { text: "Edit User", type: ACTION_TYPES?.EDIT },
  { text: "Delete User", type: ACTION_TYPES?.DELETE },
  { text: "Status", type: ACTION_TYPES?.STATUS },
];
export default function InvoiceList({ rows, handleActionMenu }) {
  const columns = useMemo(
    () => [
      {
        name: "Plan Name",
        selector: (row) => `${row?.subscription?.type}`,
        maxWidth: "20%",
      },
      {
        name: "Amount",
        selector: (row) => row?.amount,
        maxWidth: "20%",
      },
      {
        name: "Gateway",
        selector: (row) => row?.gateway,
        maxWidth: "20%",
      },
      {
        name: "Transaction ID",
        selector: (row) => row?.invoiceNumber,
        maxWidth: "20%",
      },
      {
        name: "Date",
        selector: (row) => dayjs(row?.paidAt).format("DD MMM, YYYY"),
        maxWidth: "20%",
      },
      {
        name: "Status",
        cell: (row) =>
          row.status == "Paid" ? (
            <Status sizes="primary" variant="active">
              Paid
            </Status>
          ) : (
            <Status sizes="primary" variant="deactive">
              Due
            </Status>
          ),
        sortable: true,
        minWidth: "100px",
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="text-center">
            <Button
              variant="base"
              size="small"
              onClick={() => handleActionMenu(row)} // Pass the row data when clicking "Details"
            >
              Details
            </Button>
          </div>
        ),
        minWidth: "20%",
        button: true,
      },
    ],
    [rows, handleActionMenu]
  );

  return <ReactDataTableComponent rows={rows} columns={columns} />;
}
