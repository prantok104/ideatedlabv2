import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import { useFormikContext } from "formik";
import industryTypeOptions from "../../../../public/industry.json";
import { useEffect } from "react";
const BasicInformation = ({ companyType }) => {
  const { values } = useFormikContext(); // Access Formik values directly

  const industryType = industryTypeOptions.map((option) => ({
    value: option?.key,
    label: option?.name,
  }));

  const selectedIndustryType = industryType.find(
    (option) => option.value === companyType
  );

  console.log(selectedIndustryType)

  return (
    <div className="w-full p-4 mb-3 bg-white rounded-xl">
      <div className="text-[#454f5b] text-xl font-semibold leading-7">
        Basic Information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        <TextInput
          label="Company Name"
          name="companyName"
          placeholder="Company Name"
          disabled = {true}
          value={values.companyName} // Bind Formik values
        />

        <SearchableSelect
          label="Company Type"
          name="industryType"
          options={industryType}
          disabled={true}
          value={selectedIndustryType} // Bind Formik values
        />

        <TextInput
          label="Business Identification Number (BIN)"
          name="binNumber"
          placeholder=""
          disabled = {true}
          value={values.binNumber} // Bind Formik values
        />

        <TextInput
          label="Email Address"
          name="emailAddress"
          placeholder=""
          disabled = {true}
          value={values.emailAddress} // Bind Formik values
        />

        <TextInput
          label="Phone Number"
          name="phoneNumber"
          placeholder=""
          disabled = {true}
          value={values.phoneNumber} // Bind Formik values
        />
      </div>
    </div>
  );
};

export default BasicInformation;
