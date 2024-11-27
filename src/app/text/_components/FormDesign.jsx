"use client"
import React, { useRef, useState } from 'react'
import ReactSelectField from "./ReactSelectField";
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
const FormDesign = () => {
   const [val, setVal] = useState({});
   const innerRef = useRef(null);
   const [initialValues, setInitialValues] = useState({
     type: 3,
   });
   const validationSchema = Yup.object({
      type: Yup.number().required("Required")
   });

   const handleSubmit = async (values) => {
      setVal(values)
   }
  return (
    <div>
      <Formik
        innerRef={innerRef}
        validationSchema={validationSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="w-full">
              <ReactSelectField
                name="type"
                options={[
                  {
                    label: "Hi",
                    value: 1,
                  },
                  {
                    label: "Hi2",
                    value: 2,
                  },
                  {
                    label: "Hi3",
                    value: 3,
                  },
                  {
                    label: "Hi4",
                    value: 4,
                  },
                ]}
                isObject={false}
              />

              <button type="submit">submit</button>
              <pre>{JSON.stringify(val, undefined, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormDesign