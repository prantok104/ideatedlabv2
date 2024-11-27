import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MdOutlineFlagCircle, MdShareLocation } from "react-icons/md";

const LoadBooking = ({ onClose }) => {
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);

  const initialValues = {
    booknow: false,
  };

  const handleCancel = () => {
    // Implement cancellation logic here
    console.log("Cancel button clicked");
    onClose();
  };

  const handleConfirm = () => {
    // Implement confirmation logic here
    console.log("Confirm button clicked");
    setAttemptsRemaining(attemptsRemaining - 1);
    onClose();
  };

  return (
    <div>
      <h2 className="text-[#1c252e] text-base font-medium font-['Public Sans'] leading-normal">
        Confirm load Booking
      </h2>
      <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] mt-2 leading-none">
        By confirming, you are agreeing to the posted rate:
      </p>
      <h3 className="text-[#454f5b] text-xs font-normal font-['Public Sans'] mt-4 uppercase leading-tight">
        POST RATE
      </h3>
      <p className="w-[78px] text-[#73c002] text-lg font-semibold font-['Public Sans'] leading-normal inline-flex items-center">
        $52,000
        <span className="text-[#454f5b] text-sm pl-1 font-normal font-['Inter'] leading-tight">
          -$6.02/ml
        </span>
      </p>
      <div className="relative mt-3">
        <div className="ml-11">
          <div className="mb-6">
            <h3 className="text-[#919eab] text-xs font-normal font-['Inter']">
              Pickup
            </h3>
            <p className="text-[#1c252e] text-sm font-normal font-['Inter'] leading-tight">
              Los Angeles, CA
            </p>
            <p className="text-[#919eab] text-xs font-normal font-['Inter']">
              Mon, Jun 24
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-0.5 h-1 bg-gray-500"></div>
          </div>
          <div>
            <h3 className="text-[#637381] text-xs font-normal font-['Public Sans']">
              Dropoff
            </h3>
            <p className="text-[#1c252e] text-sm font-normal font-['Inter'] leading-tight">
              Chicago, IL
            </p>
          </div>
        </div>
        {/* Adjust absolute positioning for the icons */}
        <div className="absolute bottom-0">
          <MdShareLocation size={24} className="text-[#919EAB]" />
          <div className="flex flex-col justify-center space-y-1">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-[3px] h-1 ml-[10px] bg-[#919EAB]"
              ></div>
            ))}
          </div>
          <MdOutlineFlagCircle size={24} className="text-[#73C002]" />
        </div>
      </div>
      <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] mt-2 leading-none">
        You will receive a confirmation if you request is accepted or rejected.
      </p>
      <Formik initialValues={initialValues} onSubmit={handleConfirm}>
        {() => (
          <Form>
            <div className="text-[#637381] text-xs font-normal font-['Public Sans'] mt-4 leading-none">
              <Checkbox
                label="I agree to book this load for the rate listed above."
                name="booknow"
              />
            </div>
            <div className="flex items-center gap-11">
              <Button
                variant="reactangleStroke"
                size="xsmall"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="rectangleFill"
                size="xsmall"
                onClick={handleConfirm}
                disabled={attemptsRemaining === 0}
              >
                Confirm Booking
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-[#919eab] text-xs font-medium font-['Public Sans'] mt-2 leading-tight">
        Attempts remaining: {attemptsRemaining}/5
      </p>
    </div>
  );
};

export default LoadBooking;
