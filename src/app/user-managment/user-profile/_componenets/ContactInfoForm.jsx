"use client";

import TextInput from "@/components/form/TextInput";
import Button from "@/components/button/Button";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SearchableSelect from "@/components/form/SearchableSelect";

const ContactInfoForm = ({ cityData, stateData }) => {
  const [contactInfoEdit, setContactInfoEdit] = useState(false);

  return (
    <div className="p-6 bg-slate-50 rounded-md shadow-sm mt-4">
      <div className="grid grid-cols-2 justify-items-stretch">
        <h1 className="text-xl font-semibold leading-7 py-3">
          Contact Information
        </h1>
        <div className="justify-self-end">
          {contactInfoEdit ? (
            <div className="flex gap-4">
              <Button
                variant="removeBtn"
                size="medium"
                iconLeft={<RiDeleteBin6Line />}
                onClick={() => setContactInfoEdit(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="base" size="medium">
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="stroke"
              size="medium"
              iconLeft={<BiPencil />}
              onClick={() => setContactInfoEdit(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
      <SearchableSelect
          label="State"
          name="state"
          options={stateData}
          disabled={!contactInfoEdit}
        />
        
        <SearchableSelect
          label="City"
          name="city"
          options={cityData}
          disabled={!contactInfoEdit}
        />
        
        <TextInput
          label="Street Address"
          type="text"
          name="streetAddress"
          readOnly={!contactInfoEdit}
        />
        <TextInput
          label="Zip Code"
          type="text"
          name="zipCode"
          readOnly={!contactInfoEdit}
        />
        <TextInput
          label="Country"
          type="text"
          name="country"
          readOnly={!contactInfoEdit}
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;
