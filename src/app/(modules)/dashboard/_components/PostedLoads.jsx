"use client";
import Image from "next/image";
import PickUpSvg from "../../../../../public/asset/shipper_dashboard/pick-up.svg";
const PostedLoads = () => {
  return (
    <div className="mt-4">
      <div className="bg-slate-200 rounded-lg px-6 py-7">
        <div className="flex justify-between items-start">
          {/* Left Section (Date, Pickup, and Destination) */}
          <div className="flex flex-col">
            <div className="text-[#1c252e] text-xs">07 Jun, Friday</div>
            <div className="flex items-start gap-4 mt-2">
              <div className="flex flex-col items-center mt-2">
                {/* Circle icons */}
                <Image src={PickUpSvg} alt="PickUpSvg" />
              </div>
              <div className="flex flex-col">
                {/* Pickup Info */}
                <div className="mb-4">
                  <div className="text-[#637381] text-xs">Pickup</div>
                  <div className="text-[#1c252e] text-sm">Los Angeles, CA</div>
                </div>
                {/* Destination Info */}
                <div>
                  <div className="text-[#637381] text-xs">Destination</div>
                  <div className="text-[#1c252e] text-sm">Chicago, IL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Price and Details) */}
          <div className="flex flex-col justify-between items-stretch h-full">
            <div className="text-end">
              <div className="text-2xl font-semibold text-[#1c252e]">
                $2,200
              </div>
              <div className="text-xs text-[#454f5b]">$2.31/ml</div>
            </div>

            {/* Load details at the bottom */}
            <div className="flex gap-2 self-end mt-10">
              <div className="px-3 py-1.5 bg-[#f4f6f8] rounded-lg text-xs text-[#637381]">
                TL
              </div>
              <div className="px-3 py-1.5 bg-[#f4f6f8] rounded-lg text-xs text-[#637381]">
                Van
              </div>
              <div className="px-3 py-1.5 bg-[#f4f6f8] rounded-lg text-xs text-[#637381]">
                54ft
              </div>
              <div className="px-3 py-1.5 bg-[#f4f6f8] rounded-lg text-xs text-[#637381]">
                29 000 lbs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedLoads;
