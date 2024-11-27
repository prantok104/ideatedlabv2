"use client";

import { humanReadableDate } from "@/utils/helper";

const BidsList = ({ bids }) => {
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
                    <td class="px-6 py-4">{humanReadableDate(bid?.date)}</td>
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
                      <span
                        className={`px-3 py-1 text-sm font-semibold ${
                          bid?.status == "Accepted"
                            ? `bg-green-100  text-green-800`
                            : bid?.status == "Rejected"
                            ? `bg-red-100  text-red-800`
                            : `bg-yellow-100  text-yellow-800`
                        } rounded-full`}
                      >
                        {bid?.status}
                      </span>
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
