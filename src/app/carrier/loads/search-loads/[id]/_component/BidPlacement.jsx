"use client"

import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { notify, NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";
import { HTTP_OK } from "@/utils/static-const";
import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import * as Yup from 'yup';
const BidPlacement = ({ id, bidMutate, bids, mutate }) => {
  const [openBid, setOpenBid] = useState(false);
  const innerRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    bid: 0,
    remarks: "",
  });
  const validationSchema = Yup.object().shape({
    bid: Yup.number().required("Required").min(0, "Min:0").max(100, "Max:100"),
    remarks: Yup.string().nullable(),
  });
  const handleSubmit = async (values) => {
    try {
      const responseData = await apiClient.post(
        `${apiEndpoint.loadSearch.bidding}/${id}/bidding`,
        {
          amount: values?.bid,
          remarks: values?.remarks,
        }
      );
      if (responseData?.status === HTTP_OK) {
        notify(responseData?.message, NOTIFY_MESSAGE_SUCCESS);
        await mutate();
        await bidMutate();
        setOpenBid(false);
      } else {
        notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
      }
    } catch (error) {
      notify(error?.message, NOTIFY_MESSAGE_ERROR);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpenBid(!openBid)}
        className="border border-[#73c002] py-2 px-4 rounded text-[#73c002] font-bold w-24 "
      >
        {bids > 0 ? "Re Bid" : "Bid"}
      </button>

      {openBid && (
        <div className="absolute top-12 right-0 w-96 p-4 mt-2 z-10 bg-white border border-gray-300 rounded shadow">
          <h3 className="text-lg font-semibold  mb-2">Place a Bid</h3>
          {bids >= 5 ? (
            <p>You have reached maximum attempts. Thanks for your biddings.</p>
          ) : (
            <Formik
              innerRef={innerRef}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({}) => (
                <Form>
                  <div>
                    <TextInput
                      type="number"
                      name="bid"
                      placeholder="Rate/Flat*"
                      disabled={bids == 5}
                    />
                    <p className="text-sm mt-2 mb-1 text-[#0e69b3]">
                      Flat rate in riyal
                    </p>

                    <TextInput
                      name="remarks"
                      placeholder="Remarks"
                      disabled={bids == 5}
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#73c002] text-white font-bold rounded hover:bg-green-600 mt-3"
                      disabled={bids == 5}
                    >
                      Place Bid
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <p className="text-sm mb-2 mt-4">Attempts remaining : {bids}/5</p>
          <span className="text-slate-400 text-sm">
            If your bid is accepted, you will receive a confirmation from the
            broker{" "}
          </span>{" "}
          <span className="text-slate-800 text-sm">
            at <br /> devid@email.com
          </span>
        </div>
      )}
    </div>
  );
}; 

export default BidPlacement;