"use client";

import { humanReadableDate } from "@/utils/helper";
import dayjs from "dayjs";
import { apiEndpoint } from "@/utils/api-endpoint";
import {
  notify,
  NOTIFY_MESSAGE_ERROR,
  NOTIFY_MESSAGE_SUCCESS,
} from "@/utils/helper";
import { HTTP_OK } from "@/utils/static-const";
import apiClient from "@/lib/axios";
import Swal from "sweetalert2";

const BidsList = ({ bids, bidMutate, mutate }) => {
  const handleLoadStatusChange = async (bid, type) => {

   Swal.fire({
     title: "Are you sure?",
     text: `Do you want to ${type == "Accepted" ? "accept": "reject"} the bid?`,
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#73C002",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, change it!",
     cancelButtonText: "No, keep it",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         const responseData = await apiClient.put(
           `${apiEndpoint.loadSearch.bidAcceptReject}/${bid}`,
           {
             status: type,
           }
         );
         if (responseData?.status === HTTP_OK) {
           notify(responseData?.message, NOTIFY_MESSAGE_SUCCESS);
           await mutate();
           await bidMutate();
         } else {
           notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
         }
       } catch (error) {
         notify(error?.message, NOTIFY_MESSAGE_ERROR);
       }
     }
   });

    
  };

  return (
    <>
      {bids?.data?.length > 0 ? (
        <div class="w-full mt-8 mb-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">BID LISTS</h2>
          <div class="overflow-x-auto">
            <table class="w-full bg-white rounded-lg shadow text-center">
              <thead>
                <tr class="text-gray-500 font-semibold text-center border-b border-gray-200">
                  <th class="px-6 py-3">Time</th>
                  <th class="px-6 py-3">Company</th>
                  <th class="px-6 py-3">Amount</th>
                  <th class="px-6 py-3">Remarks</th>
                  <th class="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {bids?.data?.map((bid, index) => (
                  <tr key={index}>
                    <td class="px-6 py-4">
                      {dayjs(bid?.date).format("DD MMM, YYYY hh:mm:ss A")}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-800">
                      {bid?.company?.title}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-800">
                      SAR {bid?.amount}
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-800">
                      {bid?.remarks}
                    </td>
                    <td class="px-6 py-4">
                      {bid?.status == "Accepted" ||
                      bid?.status == "Rejected" ? (
                        <span
                          className={`px-3 py-1 text-sm font-semibold  ${
                            bid?.status == "Accepted"
                              ? `bg-green-100 text-green-800`
                              : bid?.status == "Rejected"
                              ? `bg-red-100 text-red-800`
                              : `bg-yellow-100 text-yellow-800`
                          } rounded-full`}
                        >
                          {bid?.status}
                        </span>
                      ) : (
                        <div className="flex gap-2 items-center justify-center ">
                          <button
                            onClick={() =>
                              handleLoadStatusChange(bid?.id, "Accepted")
                            }
                            className="py-2 px-4 bg-[#73c002] text-white rounded font-bold"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleLoadStatusChange(bid?.id, "Rejected")
                            }
                            className="py-2 px-4 bg-red-500 text-white rounded font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h4 className="font-bold  text-[#73c002] text-center">
            No booking request or bid have been make.
          </h4>
        </div>
      )}
    </>
  );
};

export default BidsList;
