"use client";
import Button from "@/components/button/Button";
import SearchableSelect from "@/components/form/SearchableSelect";
import TextInput from "@/components/form/TextInput";
import { trucks } from "@/utils/home-static-data";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  truckName: "",
  trailerType: "", // Added to match the Select field
  truckNumber: "",
  length: "",
  weight: "",
};

const validationSchema = Yup.object({
  truckName: Yup.string().required("Truck Name is required"),
  trailerType: Yup.string().required("Trailer Type is required"), // Updated validation
  truckNumber: Yup.string().required("Truck Number is required"),
  length: Yup.string().required("Length is required"),
  weight: Yup.string().required("Weight is required"),
});

const AddTruck = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", JSON.stringify(values, null, 2)); // Log form values for debugging
    toast.success("Form Submitted");
    setSubmitting(false); // Reset submitting state after handling
  };

  
  return (
    <div className="mt-10">
      <h1 className="text-[#454f5b] text-2xl font-semibold font-public-sans leading-loose mb-4">
        New Truck
      </h1>
      <h3 className="text-[#919eab] text-base font-normal font-public-sans uppercase leading-normal mb-6">
        Truck Specification
      </h3>

      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <TextInput
                  label="Truck Name"
                  name="truckName"
                  type="text"
                  placeholder="Truck Name"
                />

                {/* truck (replaced with trailerType to match initial values) */}
                <div className="z-20">
                  <SearchableSelect
                    label="Trailer Type"
                    name="trailerType" // Update to trailerType to match validation
                    options={trucks}
                    placeholder="Select"
                  />
                </div>

                <TextInput
                  label="Truck Number"
                  name="truckNumber"
                  type="text"
                  placeholder="Truck Number"
                />
                <TextInput
                  label="Length"
                  name="length"
                  type="text"
                  placeholder="Length"
                />
                <TextInput
                  label="Weight"
                  name="weight"
                  type="text"
                  placeholder="Weight"
                />
              </div>
              <div className="flex justify-start mt-4">
                <div>
                  <Button
                    type="submit"
                    variant="base"
                    size="small"
                    disabled={isSubmitting || !isValid} // Ensure button is enabled when valid
                  >
                    {isSubmitting ? "Adding..." : "Add Truck"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTruck;
