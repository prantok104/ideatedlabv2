import ActionMenu from "@/components/table/ActionMenu";
import dayjs from "dayjs";
import { useMemo } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const menuItems = [
  { text: "Details", type: "Details" },
  // { text: "Draft", type: "Draft" },
  { text: "Edit", type: "Edit" },
  { text: "Duplicate", type: "Duplicate" },
  // { text: "Delete", type: "Delete" },
];

const statusStyles = {
  Active: "text-[#73c002] bg-[#f1f9e6]",
  Inactive: "text-[#d9534f] bg-[#fce8e8]",
  Pending: "text-[#ffb822] bg-[#fff5e6]",
  published: "text-[#73c002] bg-[#f1f9e6]",
  draft: "text-[#ffb822] bg-[#fff5e6]",
  in_review: "text-[#ffb822] bg-[#fff5e6]",
  Completed: "text-[#17a2b8] bg-[#e6f7f9]",
  Done: "text-[#5cb85c] bg-[#e6f9e6]",
};

function humanReadableDate(date) {
  const now = dayjs();
  const target = dayjs(date);

  const isFuture = target.isAfter(now);
  const diffInSeconds = Math.abs(now.diff(target, "second"));
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const hours = diffInHours % 24;
  const minutes = diffInMinutes % 60;

  let result;

  if (diffInDays > 0) {
    result = `${diffInDays}d${diffInDays > 1 ? "s" : ""} ${hours}h${
      hours !== 1 ? "s" : ""
    }`;
  } else if (diffInHours > 0) {
    result = `${diffInHours}h${diffInHours !== 1 ? "s" : ""} ${minutes}m${
      minutes !== 1 ? "s" : ""
    }`;
  } else if (diffInMinutes > 0) {
    result = `${diffInMinutes}m${diffInMinutes !== 1 ? "s" : ""}`;
  } else {
    result = `${diffInSeconds}s`;
  }

  return isFuture ? `${result} from now` : `${result} ago`;
}

const TableHeaders = (type, handleActionMenu) => {
  const columns = useMemo(() => {
    switch (type) {
      case "published":
        return [
          {
            name: "Age",
            selector: (row) =>
              row?.shipmentStatus == "draft"
                ? "---"
                : humanReadableDate(row?.pickUpDate),
            sortable: true,
            minWidth: "165px",
          },
          {
            name: "Pickup Date",
            selector: (row) =>
              dayjs(row?.pickUpDate)?.format("DD MMM, YYYY hh:mm:ss A"),
            minWidth: "210px",
          },
          {
            name: "Pickup",
            selector: (row) => (
              <>
                <div className="flex items-center gap-1">
                  <FaArrowUp />
                  <p className="text-xs text-gray-500">Pick up</p>
                </div>
                <div>
                  <p className="font-bold ps-4">{row?.pickUpLocation?.name}</p>
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Dropoff",
            selector: (row) => (
              <>
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <FaArrowDown />
                    <p className="text-xs text-gray-500">Drop off</p>
                  </div>
                  {row?.dropOffLocations?.map((item, index) => (
                    <div key={index} className="ps-4">
                      <span className="text-xs text-gray-500">
                        Dropoff{" "}
                        {`${
                          row?.dropOffLocations?.length === 1
                            ? ""
                            : `point(${index + 1}) `
                        }`}
                      </span>
                      <p className="font-bold">{item?.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Reference",
            selector: (row) => (
              <>
                <p title={row?.trackingNumber}>{row?.trackingNumber}</p>
              </>
            ),
            minWidth: "210px",
          },
          {
            name: "Equipment",
            selector: (row) => (
              <>
                <p title={row?.carrierType}>{row?.carrierType}</p>
              </>
            ),
          },
          {
            name: "Rate",
            cell: (row) => (
              <div>
                <p>
                  {row?.currency}
                  {row?.flatRate}
                </p>
              </div>
            ),
          },
          {
            name: "Proposal",
            selector: (row) => (
              <>
                <p>{row?.totalBids ?? 0}</p>
              </>
            ),
          },
          {
            name: "Status",
            cell: (row) => (
              <>
                <button
                  className={`${
                    statusStyles[row?.shipmentStatus]
                  } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
                >
                  {row?.shipmentStatus}
                </button>
              </>
            ),
            minWidth: "140px",
          },
          {
            name: "",
            cell: (row) => (
              <div className=" border-l border-gray-300  right-0">
                <ActionMenu
                  menuItems={menuItems}
                  handleActionMenu={handleActionMenu}
                  row={row}
                />
              </div>
            ),
            minWidth: '118px'
          },
        ];
      case "draft":
        return [
          {
            name: "Age",
            selector: (row) =>
              row?.shipmentStatus == "draft"
                ? "---"
                : humanReadableDate(row?.pickUpDate),
            sortable: true,
            minWidth: "165px",
          },
          {
            name: "Pickup Date",
            selector: (row) =>
              dayjs(row?.pickUpDate)?.format("DD MMM, YYYY hh:mm:ss A"),
            minWidth: "210px",
          },
          {
            name: "Pickup",
            selector: (row) => (
              <>
                <div>
                  <span className="text-xs text-gray-500">Pick up</span>
                  <p className="font-bold">{row?.pickUpLocation?.name}</p>
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Dropoff",
            selector: (row) => (
              <>
                <div className="mt-2">
                  {row?.dropOffLocations?.map((item, index) => (
                    <div key={index}>
                      <span className="text-xs text-gray-500">
                        Dropoff{" "}
                        {`${
                          row?.dropOffLocations?.length == 1
                            ? ""
                            : `point(${index + 1}) `
                        }`}
                      </span>
                      <p className="font-bold">{item?.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Reference",
            selector: (row) => (
              <>
                <p title={row?.trackingNumber}>{row?.trackingNumber}</p>
              </>
            ),
            minWidth: "210px",
          },
          {
            name: "Equipment",
            selector: (row) => (
              <>
                <p title={row?.carrierType}>{row?.carrierType}</p>
              </>
            ),
          },
          {
            name: "Rate",
            cell: (row) => (
              <div>
                <p>
                  {row?.currency}
                  {row?.flatRate}
                </p>
              </div>
            ),
          },
          {
            name: "Propose",
            selector: (row) => (
              <>
                <p title={row?.comments}>{row?.comments}</p>
              </>
            ),
          },
          {
            name: "Status",
            cell: (row) => (
              <>
                <button
                  className={`${
                    statusStyles[row?.shipmentStatus]
                  } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
                >
                  {row?.shipmentStatus}
                </button>
              </>
            ),
            minWidth: "140px",
          },
          {
            name: "",
            cell: (row) => (
              <div className=" border-l border-gray-300 sticky right-0">
                <ActionMenu
                  menuItems={menuItems?.filter(
                    (item) => item?.type != "Duplicate"
                  )}
                  handleActionMenu={handleActionMenu}
                  row={row}
                />
              </div>
            ),
            maxWidth: "80px",
            className: "sticky-column",
          },
        ];
      case "history":
        return [
          {
            name: "Age",
            selector: (row) => humanReadableDate(row?.pickUpDate),
            sortable: true,
            minWidth: "120px",
          },
          {
            name: "Pickup Date",
            selector: (row) =>
              dayjs(row?.pickUpDate)?.format("DD MMM, YYYY hh:mm:ss A"),
            minWidth: "210px",
          },
          {
            name: "Pickup",
            selector: (row) => (
              <>
                <div>
                  <span className="text-xs text-gray-500">Pick up</span>
                  <p className="font-bold">{row?.pickUpLocation?.name}</p>
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Dropoff",
            selector: (row) => (
              <>
                <div className="mt-2">
                  {row?.dropOffLocations?.map((item, index) => (
                    <div key={index}>
                      <span className="text-xs text-gray-500">
                        Dropoff{" "}
                        {`${
                          row?.dropOffLocations?.length == 1
                            ? ""
                            : `point(${index + 1}) `
                        }`}
                      </span>
                      <p className="font-bold">{item?.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Reference",
            cell: (row) => (
              <>
                <p title={row?.trackingNumber}>{row?.trackingNumber}</p>
              </>
            ),
            minWidth: "210px",
          },
          {
            name: "Equipment",
            cell: (row) => (
              <>
                <p title={row?.carrierType}>{row?.carrierType}</p>
              </>
            ),
          },
          {
            name: "Rate",
            cell: (row) => (
              <div>
                <p>
                  {row?.currency}
                  {row?.flatRate}
                </p>
              </div>
            ),
          },
          {
            name: "Proposal",
            selector: (row) => (
              <>
                <p>{row?.totalBids ?? 0}</p>
              </>
            ),
          },
          {
            name: "Status",
            cell: (row) => (
              <>
                <button
                  className={`${
                    statusStyles[row?.shipmentStatus]
                  } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
                >
                  {row?.shipmentStatus}
                </button>
              </>
            ),
            minWidth: "140px",
            maxWidth: "140px",
          },
          {
            name: "",
            cell: (row) => (
              <div className=" border-l border-gray-300 sticky right-0">
                <ActionMenu
                  menuItems={menuItems}
                  handleActionMenu={handleActionMenu}
                  row={row}
                />
              </div>
            ),
            maxWidth: "80px",
          },
        ];
      case "in_review":
        return [
          {
            name: "Age",
            selector: (row) =>
              row?.shipmentStatus == "draft"
                ? "---"
                : humanReadableDate(row?.pickUpDate),
            sortable: true,
            minWidth: "165px",
          },
          {
            name: "Pickup Date",
            selector: (row) =>
              dayjs(row?.pickUpDate)?.format("DD MMM, YYYY hh:mm:ss A"),
            minWidth: "210px",
          },
          {
            name: "Pickup",
            selector: (row) => (
              <>
                <div>
                  <span className="text-xs text-gray-500">Pick up</span>
                  <p className="font-bold">{row?.pickUpLocation?.name}</p>
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Dropoff",
            selector: (row) => (
              <>
                <div className="mt-2">
                  {row?.dropOffLocations?.map((item, index) => (
                    <div key={index}>
                      <span className="text-xs text-gray-500">
                        Dropoff{" "}
                        {`${
                          row?.dropOffLocations?.length == 1
                            ? ""
                            : `point(${index + 1}) `
                        }`}
                      </span>
                      <p className="font-bold">{item?.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
            minWidth: "400px",
            maxWidth: "450px",
          },
          {
            name: "Reference",
            selector: (row) => (
              <>
                <p title={row?.trackingNumber}>{row?.trackingNumber}</p>
              </>
            ),
            minWidth: "210px",
          },
          {
            name: "Equipment",
            selector: (row) => (
              <>
                <p title={row?.carrierType}>{row?.carrierType}</p>
              </>
            ),
          },
          {
            name: "Rate",
            cell: (row) => (
              <div>
                <p>
                  {row?.currency}
                  {row?.flatRate}
                </p>
              </div>
            ),
          },
          {
            name: "Propose",
            selector: (row) => (
              <>
                <p title={row?.comments}>{row?.comments}</p>
              </>
            ),
          },
          {
            name: "Status",
            cell: (row) => (
              <>
                <button
                  className={`${
                    statusStyles[row?.shipmentStatus]
                  } text-sm font-bold font-['Inter'] leading-tight rounded-full justify-center items-center px-3 py-1 inline-flex`}
                >
                  In Review
                </button>
              </>
            ),
            minWidth: "140px",
          },
          {
            name: "",
            cell: (row) => (
              <div className=" border-l border-gray-300  right-0">
                <ActionMenu
                  menuItems={menuItems}
                  handleActionMenu={handleActionMenu}
                  row={row}
                />
              </div>
            ),
            maxWidth: "80px",
          },
        ];
      default:
        return [];
    }
  }, [type]);

  return columns;
};

export default TableHeaders;
