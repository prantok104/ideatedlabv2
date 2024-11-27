import Button from "@/components/button/Button";
import Status from "@/components/status/Status";
import ActionMenu from "@/components/table/ActionMenu";
import ReactDataTableComponent from "@/components/table/ReactDataTableComponent";
import { ACTION_TYPES, MEMBERS_STATUS } from "@/utils/static-const";
import { useMemo } from "react";
const userMenuItems = [
  { text: "View Profile", type: ACTION_TYPES?.VIEW },
  { text: "Edit User", type: ACTION_TYPES?.EDIT },
  { text: "Delete User", type: ACTION_TYPES?.DELETE },
  { text: "Status", type: ACTION_TYPES?.STATUS },
];
export default function MemberList({
  activeTab,
  setGetRow,
  rows,
  handleActionMenu,
  setVerifyModal,
}) {
  // console.log("actionTab", actionTab);
  const columns = useMemo(
    () => [
      {
        name: "Serial",
        cell: (row, index) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "FullName",
        selector: (row) => `${row?.firstName} ${row?.lastName}`,
        maxWidth: "20%",
      },
      // {
      //   name: "Username",
      //   selector: (row) => row?.userName,
      //   maxWidth: "20%",
      // },
      {
        name: "Package",
        selector: (row) => row?.selectedPackage,
        maxWidth: "20%",
      },
      {
        name: "Expiration Date",
        selector: (row) => row?.expirationDate || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Due Extend Date",
        selector: (row) => row?.dueExtendDate || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Email",
        selector: (row) => row?.email,
        maxWidth: "20%",
      },
      {
        name: "Phone",
        selector: (row) => row?.phone,
        maxWidth: "20%",
      },
      {
        name: "Doc Status",
        // selector: (row) => row?.docStatus,
        cell: (row) => (
          <div>
            {row?.docStatus === "Active" ? (
              <Status variant="active">Active</Status>
            ) : (
              <Status variant="penidng">Pending</Status>
            )}
          </div>
        ),
        maxWidth: "20%",
      },
      {
        name: "Is Verified",
        cell: (row) => {
          <div>
            {row.isVerified === true ? (
              <Status variant="active">True</Status>
            ) : (
              <Status variant="deactive">False</Status>
            )}
          </div>;
        },
        maxWidth: "20%",
      },
      {
        name: "Verified At",
        selector: (row) => row?.verifiedAt || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Verify By",
        selector: (row) => row?.verifiedBy || "N/A",
        maxWidth: "20%",
      },
      {
        name: "Member Status",
        cell: (row) => {
          let statusVariant;

          switch (row.memberStatus) {
            case "Active":
              statusVariant = "active";
              break;
            case "Subscribed":
              statusVariant = "subscribed";
              break;
            case "Pending":
              statusVariant = "pending";
              break;
            case "Unverified":
              statusVariant = "deactive";
              break;
            case "Banned":
              statusVariant = "banned";
              break;
            case "Suspended":
              statusVariant = "suspended";
              break;
            default:
              statusVariant = "unknown"; // Handle any other cases
          }

          return (
            <div>
              <Status variant={statusVariant}>{row.memberStatus}</Status>
            </div>
          );
        },
        minWidth: "10%",
      },
      {
        id: "action-btn",
        name: "Action",
        cell: (row) =>
          activeTab === MEMBERS_STATUS.MEMBER ? (
            <ActionMenu
              menuItems={userMenuItems}
              handleActionMenu={handleActionMenu}
              row={row}
            />
          ) : (
            <div className="w-28">
              <Button
                variant="rectangleFill"
                size="small"
                // onClick={
                //   handleStatusChange(row.id, MEMBERS_STATUS.VERIFIED)
                // }

                onClick={() => {
                  console.log(print);
                  setGetRow(row);
                  setVerifyModal();
                }}
              >
                Verify
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
