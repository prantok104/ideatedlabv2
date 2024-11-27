"use client";

const SpotRateCard = ({ rate, perMile, range }) => {

  return (
    <div
      className="bg-white px-4 py-3 rounded-lg"
      style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <h2 className="text-[#141a21] text-sm font-semibold font-['Inter'] uppercase leading-tight">
          rate
        </h2>
        
      </div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-[#141a21] text-xl font-semibold font-['Inter'] leading-normal">
          {rate}
        </p>
        <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
          {perMile}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
          Range
        </p>
        <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
          {range}
        </p>
      </div>
    </div>
  );
};

export default SpotRateCard;
