"use client";
import AdjustedFormTest from "@/components/settings-components/compnay/AdjustedFormTest";
import React from "react";


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
