import { Field, ErrorMessage, useField } from "formik";
import TextError from "@/components/form/TextError";

const TimeField = ({ label, name, disabled, bg, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
          meta.touched && meta.error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <Field
        {...field} // Use Formik's field props for value and onChange
        {...rest}
        id={name}
        type="time"
        disabled={disabled}
        value={field.value || ""} // Use field.value to control the value
        placeholder="Any"
        className={`w-full rounded-lg border p-3 text-[#919EAB] bg-[${bg}] text-sm shadow-sm sm:text-sm hover:border-[#A9A9A9]
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-200"}
          focus:outline-none placeholder-gray-500 text-sm`}
      />

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TimeField;
