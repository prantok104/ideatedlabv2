"use client";
const IconButtonCard = ({ icon: Icon, title, subtitle, onClick }) => {
  return (
    <div
      className="flex px-4 py-2 rounded-lg cursor-pointer"
      style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
      onClick={onClick}
    >
      <Icon size={24} />
      <div className="ml-2 w-28">
        <p className="text-sm font-medium text-[#454F5B]">{title}</p>
        <p className="text-xs font-normal text-nowrap leading-5 text-[#919EAB]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default IconButtonCard;
