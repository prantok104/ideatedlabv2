import FinalInvoiceTable from "@/components/settings-components/billing-invoice/FinalInvoiceTable";
import React from "react";
import WithAuthorization from "../HigherOrderComponents/WithAuthorization";
import { BROWSE_TRANSACTION } from "@/utils/permission";

const Transactions = () => {
  return (
    <div>
      <FinalInvoiceTable />
    </div>
  );
};

// export default WithAuthorization(Transactions, [BROWSE_TRANSACTION]);
export default Transactions;
