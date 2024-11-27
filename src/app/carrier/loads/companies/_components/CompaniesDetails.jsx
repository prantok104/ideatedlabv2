"use client";

import { onboardCompanies } from "@/utils/home-static-data";

const CompaniesDetails = ({ id }) => {
  const company = onboardCompanies.find((compnay) => compnay.id === id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Company Details</h1>
      <p>
        <strong>ID:</strong> {company.usid}
      </p>
      <p>
        <strong>Company Name:</strong> {company.company}
      </p>
      <p>
        <strong>Location:</strong> {company.location}
      </p>
    </div>
  );
};

export default CompaniesDetails;
