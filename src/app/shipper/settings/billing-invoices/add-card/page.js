"use client";

import AddCard from "@/components/settings-components/billing-invoice/AddCard";

const Card = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Add Payment Method
      </h1>

      <div className="container max-w-[706px] flex flex-col gap-4 mt-6 bg-slate-50 rounded-md shadow-sm px-4 py-5">
        {/* form here */}
        <AddCard />
        {/* form here end */}
      </div>
    </>
  );
};

export default Card;
