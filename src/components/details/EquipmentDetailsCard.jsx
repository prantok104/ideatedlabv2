"use client";
const EquipmentDetailsCard = ({ details }) => {
  return (
    <div
      className="bg-white p-4 py-3 rounded-lg"
      style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <h2 className="text-[#141a21] text-sm font-semibold font-['Inter'] uppercase leading-tight mb-2">
        EQUIPMENT DETAILS
      </h2>
      <div className="text-[#637381] text-sm">
        {details.map(({ label, value }, index) => (
          <div key={index} className="flex justify-between items-center mb-1">
            <p className="text-[#637381] text-sm font-normal font-['Inter'] leading-tight">
              {label}
            </p>
            <p className="text-[#454f5b] text-sm font-semibold font-['Public Sans'] leading-tight">
              {value || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentDetailsCard;
