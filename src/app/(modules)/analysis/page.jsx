"use client";

import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BROWSE_ANALYSIS } from "@/utils/permission";

const Analysis = () => {
  return <h1>Analysis Page ...........</h1>;
};

export default WithAuthorization(Analysis, [BROWSE_ANALYSIS]);
