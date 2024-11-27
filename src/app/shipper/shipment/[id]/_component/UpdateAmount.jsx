// FormComponent.jsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/form/TextInput";
import Button from "@/components/button/Button";
import { notify, NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { HTTP_OK } from "@/utils/static-const";

const validationSchema = Yup.object({
  newAmount: Yup.number().nullable(),
});

const UpdateAmount = ({ currentAmount, onClose, id, mutate }) => {
  const initialValues = {
    newAmount: "",
  };

  const handleSubmit = async (values) => {
    try{
      const responseData = await apiClient.put(
        `${apiEndpoint.shipment.flatRate}/${id}`,
        { flatRate: values?.newAmount }
      );
      if(responseData?.status == HTTP_OK){
        notify("Successfully updated", NOTIFY_MESSAGE_SUCCESS);
        await mutate();
        onClose();
      }else{
        notify(responseData?.message?? responseData?.data?.message, NOTIFY_MESSAGE_ERROR);
      }
    } catch(error){
      notify(error?.message, NOTIFY_MESSAGE_ERROR)
    }
  };

  return (
    <div>
      <h1 className="mt-12 mb-4 text-[#1c252e] text-xl font-medium font-['Inter'] leading-7">
        Increase Amount
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="max-w-md mx-auto">
            <div className="space-y-4">
              <TextInput
                label="Current Amount"
                name="currentAmount"
                value={currentAmount}
                readOnly
                placeholder="Enter current amount"
                disabled={true}
              />

              <TextInput
                label="New Amount"
                name="newAmount"
                placeholder="Enter new amount"
              />
            </div>

            <div className="flex justify-center items-center space-x-4 mt-16">
              <div className="w-32">
                <Button type="submit" variant="rectangleFill" size="large">
                  Update
                </Button>
              </div>

              <div className="w-32">
                <Button
                  type="button"
                  variant="reactangleStroke"
                  size="large"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateAmount;
