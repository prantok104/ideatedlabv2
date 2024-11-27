"use client";

import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import React, { useState, useEffect } from "react";
import { timezoneList } from "@/utils/timezoneList";
import { weekdays } from "@/utils/weekdays";
import TimeField from "./local-components/TimeField";
import SearchableSelect from "@/components/form/SearchableSelect";

const SettingsInformation = ({ isEditableSettings, resetForm, companyDetails }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  

  const { data: countryList } = apiClient.useAxiosSWR(
    apiEndpoint.address.country
  );

  const timezoneLists = timezoneList.map((timezone) => {
    return {
      label: timezone?.timezone,
      value: timezone.timezone,
    };
  });

  //   weekdays
  const weekdaysList = weekdays.map((weekday) => {
    return {
      label: weekday.name,
      value: weekday.shortName,
    };
  });

  const handleCountryChange = (selectedCurrency) => {
    console.log("Selected Currency:", selectedCurrency);
  };

  useEffect(() => {
    if (countryList) {
      const options = countryList.data
        .map((country) => {
          return country.currencies.map((currency) => ({
            label: currency.currency,
            value: currency.currencyCode,
          }));
        })
        .flat();

      setCurrencyOptions(options);
    }
  }, [countryList]);

  const selectedCurrency = currencyOptions.find(
    (currency) => currency.value === companyDetails.currency
  );


  return (
    <>
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Currency Select */}
        <div className="col-span-6">
          <SearchableSelect
            label="Currency"
            name="currency"
            options={currencyOptions} // Pass the currency options here
            placeholder={"Select Currency"}
            disabled={!isEditableSettings}
            onChange={handleCountryChange}
          />
        </div>

        <div className="col-span-6">
          <SearchableSelect
            label="Timezone"
            name="timezone"
            options={timezoneLists} // Pass the currency options here
            placeholder="Select Timezone"
            disabled={!isEditableSettings}
          />
        </div>

        <div className="col-span-6">
          <SearchableSelect
            label="WeekEnd"
            name="weekEnd"
            options={weekdaysList} // Pass the currency options here
            placeholder="Select  Weekdays"
            disabled={!isEditableSettings}
          />
        </div>

        <div className="col-span-3">
          <TimeField
            label="Opening Hours"
            name="openingHours"
            bg={"transparent"}
            disabled={!isEditableSettings}
          />
        </div>

        <div className="col-span-3">
          <TimeField
            label="Closing Hour"
            name="closingHours"
            bg={"transparent"}
            disabled={!isEditableSettings}
          />
        </div>
      </div>
    </>
  );
};

export default SettingsInformation;
