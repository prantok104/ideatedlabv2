"use client";
import React from "react";
import AdjustedFormTest from "@/components/settings-components/compnay/AdjustedFormTest";

const CompanyProfile = () => {
  return (
    <section>
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-semibold leading-7 py-2">Company Name</h1>
      {/* form here */}
       {/* <CompanyInfoForm /> */}
      {/* form here end */}

    <AdjustedFormTest/>
      
    </div>

  </section>
  );
};

export default CompanyProfile;
