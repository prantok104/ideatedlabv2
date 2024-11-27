"use client";
import CKEditorComponent from "@/components/form/CKEditor";
import SearchableSelect from "@/components/form/SearchableSelect";
import Switch from "@/components/form/Swtich";
import TextInput from "@/components/form/TextInput";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// Define Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Package Name is required"),
  type: Yup.string().required("Package Type is required"),
  durationType: Yup.string().required("Package Duration Type is required"),
  duration: Yup.string().required("Duration is required"),
  view: Yup.string().required("Viewable Release is required"),
  list: Yup.string().required("Listing Order is required"),
  file: Yup.number()
    .required("Maximum File Size is required")
    .positive("File Size must be a positive number")
    .integer("File Size must be an integer"),
  des: Yup.string().required("Description is required"),
});

export default function Page() {
  const router = useRouter();

  const [type, setType] = useState([
    { label: "Carrier", value: "Carrier" },
    { label: "Shipper", value: "Shipper" },
    { label: "Broker", value: "Broker" },
  ]);

  const [durationType, setDurationType] = useState([
    { label: "Year", value: "Year" },
    { label: "Month", value: "Month" },
  ]);

  const initialValues = {
    name: "",
    type: "",
    durationType: "",
    duration: "",
    view: "",
    list: "",
    file: "",
    des: "",
  };

  const [defaultModules, setDefaultModules] = useState({
    core: true,
    employee: true,
  });

  const [additionalModules, setAdditionalModules] = useState({
    shipment: true,
    searchTruck: true,
    searchLoad: false,
    postTruck: false,
    myLoad: false,
    companies: false,
    privateLoad: false,
    privateNetwork: false,
    loadPlan: false,
    dashboard: false,
  });

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allSelected = Object.values(additionalModules).every(Boolean);
    setSelectAll(allSelected);
  }, [additionalModules]);

  const handleDefaultToggle = (module) => {
    setDefaultModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const handleAdditionalToggle = (module) => {
    setAdditionalModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const handleSelectAllToggle = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setAdditionalModules((prev) => {
      const updatedModules = {};
      for (const key in prev) {
        updatedModules[key] = newValue;
      }
      return updatedModules;
    });
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Handle form submission logic here
  };

  return (
    <div>
      <h1 className="font-semibold text-xl text-[#454F5B] mb-9">
        Package Details
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, errors, values }) => (
          <Form>
            <div className="flex gap-5">
              <div className="w-2/3">
                <h2 className="text-[#454F5B] font-semibold">
                  Plan Information
                </h2>
                <div
                  className="p-4"
                  style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                      <TextInput label="Package Name" name="name"></TextInput>
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="Package Type"
                        name="type"
                        options={type}
                      />
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="Package Duration Type"
                        name="durationType"
                        options={durationType}
                      ></SearchableSelect>
                    </div>
                    <div>
                      <TextInput label="Duration" name="duration"></TextInput>
                    </div>
                    <div className="mt-2">
                      <SearchableSelect
                        label="Viewable Release"
                        name="view"
                        options={durationType}
                      ></SearchableSelect>
                    </div>
                    <div>
                      <TextInput label="Listing Order" name="list"></TextInput>
                    </div>
                  </div>
                  <TextInput label="Maximum File Size" name="file"></TextInput>
                  <div className="col-span-12">
                    <CKEditorComponent
                      label="Description"
                      name="des"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <h2 className="text-[#454F5B] font-semibold">Assign Modules</h2>
                <div
                  className="mb-4 p-4"
                  style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <h3 className="font-medium">Default Modules</h3>
                  <div className="flex space-x-6 mb-6">
                    <Switch
                      label="Core"
                      isOn={defaultModules.core}
                      handleToggle={() => handleDefaultToggle("core")}
                      onColor="bg-green-500"
                      offColor="bg-gray-300"
                    />
                    <Switch
                      label="Employee"
                      isOn={defaultModules.employee}
                      handleToggle={() => handleDefaultToggle("employee")}
                      onColor="bg-green-500"
                      offColor="bg-gray-300"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium mt-4">Additional Modules</h3>
                      <div>
                        <Switch
                          label="Select all"
                          isOn={selectAll}
                          handleToggle={handleSelectAllToggle}
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <Switch
                          label="Shipment"
                          isOn={additionalModules.shipment}
                          handleToggle={() =>
                            handleAdditionalToggle("shipment")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                        <Switch
                          label="Search Truck"
                          isOn={additionalModules.searchTruck}
                          handleToggle={() =>
                            handleAdditionalToggle("searchTruck")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Switch
                          label="Search Load"
                          isOn={additionalModules.searchLoad}
                          handleToggle={() =>
                            handleAdditionalToggle("searchLoad")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                        <Switch
                          label="Post Truck"
                          isOn={additionalModules.postTruck}
                          handleToggle={() =>
                            handleAdditionalToggle("postTruck")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Switch
                          label="My Load"
                          isOn={additionalModules.myLoad}
                          handleToggle={() => handleAdditionalToggle("myLoad")}
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                        <Switch
                          label="Companies"
                          isOn={additionalModules.companies}
                          handleToggle={() =>
                            handleAdditionalToggle("companies")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Switch
                          label="Private Load"
                          isOn={additionalModules.privateLoad}
                          handleToggle={() =>
                            handleAdditionalToggle("privateLoad")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                        <Switch
                          label="Private Network"
                          isOn={additionalModules.privateNetwork}
                          handleToggle={() =>
                            handleAdditionalToggle("privateNetwork")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Switch
                          label="Load Plan"
                          isOn={additionalModules.loadPlan}
                          handleToggle={() =>
                            handleAdditionalToggle("loadPlan")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                        <Switch
                          label="Dashboard"
                          isOn={additionalModules.dashboard}
                          handleToggle={() =>
                            handleAdditionalToggle("dashboard")
                          }
                          onColor="bg-green-500"
                          offColor="bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          onClick={() => router.push("/admin/subscription/packages")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#73C002] text-white px-4 py-2 rounded"
          // disabled={isSubmitting}
        >
          Create New Package
        </button>
      </div>
    </div>
  );
}
