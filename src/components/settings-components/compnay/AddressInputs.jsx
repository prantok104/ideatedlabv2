"use client";

import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useEffect, useState } from "react";

const AddressInputs = ({ isEditable, resetForm , companyDetails }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const { data: countryList } = apiClient.useAxiosSWR(apiEndpoint.address.country);
  const { data: stateList } = apiClient.useAxiosSWR(apiEndpoint.address.state);
  const { data: cityList } = apiClient.useAxiosSWR(apiEndpoint.address.city);

  const countryListData = countryList?.data.map((country) => ({
    value: country._id,
    label: country.name,
  }));

  const stateListOptions = stateList?.data
    // .filter((state) => state.country === selectedCountry)
    .map((state) => ({
      value: state.id,
      label: state.name,
    }));

  const cityOptions = cityList?.data
    // .filter((city) => city.state === selectedState)
    .map((city) => ({
      value: city._id,
      label: `${city.name} (${city.arabicName})`,
    }));

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption ? selectedOption.value : null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption ? selectedOption.value : null);
  };

  // Reset local state when `resetForm` is called
  useEffect(() => {
    if (!isEditable) {
      setSelectedCountry(null);
      setSelectedState(null);
      resetForm(); // Ensures the form values are reset
    }
  }, [isEditable, resetForm]);

  console.log("companyDetails", companyDetails);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <SearchableSelect
          label="Country"
          name="country"
          options={countryListData}
          placeholder="Select..."
          onChange={handleCountryChange}
          disabled={!isEditable}
        />
      </div>

      <div className="col-span-6">
        <SearchableSelect
          label="State"
          name="state"
          options={stateListOptions}
          placeholder="Select..."
          onChange={handleStateChange}
          disabled={!isEditable}
        />
      </div>

      <div className="col-span-3">
        <SearchableSelect
          label="City"
          name="city"
          options={cityOptions}
          placeholder="Select..."
          disabled={!isEditable}
        />
      </div>

      <div className="col-span-3">
        <TextInput
          label="Zip code"
          name="zipCode"
          placeholder="Zip code"
          type="text"
          readOnly={!isEditable}
        />
      </div>

      <div className="col-span-6">
        <TextInput
          label="Street Address"
          name="address"
          placeholder="Street Address"
          type="text"
          readOnly={!isEditable}
        />
      </div>
    </div>
  );
};

export default AddressInputs;
