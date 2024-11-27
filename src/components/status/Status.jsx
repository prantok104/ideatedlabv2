"use client";

const sizes = {
  primary: "py-1 px-2.5 text-xs",
};

const variants = {
  active: "rounded-[25px] w-full bg-[#C0E38D] text-[#333] text-xs font-semibold px-3 py-1",
  deactive: "rounded-[25px] w-full border-[#FFAC82] border text-xs text-[#FF5630] font-semibold",
  pending: "rounded-[25px] w-full bg-[#FFF4E5] text-[#FF5630] text-xs font-semibold px-3 py-1", // Fixed typo here
  subscribed: "rounded-[25px] w-full bg-gray-400 text-white text-xs font-semibold px-3 py-1",
  banned: "rounded-[25px] w-full bg-red-500 text-white text-xs font-semibold px-3 py-1",
  suspended: "rounded-[25px] w-full bg-yellow-300 text-black text-xs font-semibold px-3 py-1",
};

//   Active: "text-[#73c002] bg-[#f1f9e6]",
  // Inactive: "text-[#d9534f] bg-[#fce8e8]",
  // Pending: "text-[#ffb822] bg-[#fff5e6]",
  // Completed: "text-[#17a2b8] bg-[#e6f7f9]",
  // Done: "text-[#5cb85c] bg-[#e6f9e6]",


  
const Status = ({
  size = "primary",
  variant = "active",
  children,
  ...rest
}) => {
  const sizeClass = sizes[size] || sizes.primary;
  const variantClass = variants[variant] || variants.active;

  return (
    <div className={`w-24 flex items-center justify-center ${sizeClass} ${variantClass}`} {...rest}>
      {children}
    </div>
  );
};

export default Status;
