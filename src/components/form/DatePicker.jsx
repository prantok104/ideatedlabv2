// "use client";
// import { useField } from "formik";

// const DatePicker = ({
//   label,
//   name,
//   placeholder = "Select a date",
//   ...props
// }) => {
//   const [field, meta] = useField(name);

//   return (
//     <div className="mb-6">
//       <label
//         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//         htmlFor={name}
//       >
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           id={name}
//           type="date"
//           className={`w-full appearance-none block text-gray-700 border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#73C002] focus:border-[#73C002]
//             ${meta.touched && meta.error ? "border-red-500" : ""}
//             placeholder-gray-500 text-sm`} // Uniform placeholder and size
//           placeholder={placeholder} // Apply placeholder prop
//           {...field}
//           {...props}
//         />
//         {meta.touched && meta.error ? (
//           <div className="text-red-500 text-xs">{meta.error}</div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default DatePicker;

"use client";
import { useField } from "formik";
import { format, parseISO } from "date-fns"; // Import date-fns for date formatting

const DatePicker = ({
  label,
  name,
  placeholder = "Select a date",
  ...props
}) => {
  const [field, meta, helpers] = useField(name); // Get helpers for setting value

  const handleChange = (event) => {
    const { value } = event.target;
    // Convert the value to a Date object if needed
    helpers.setValue(value ? new Date(value) : null); // Set the value in Formik
  };

  return (
    <div className="mb-6">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type="date"
          className={`w-full appearance-none block text-gray-700 border-2 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#73C002] focus:border-[#73C002]
            ${meta.touched && meta.error ? "border-red-500" : ""}
            placeholder-gray-500 text-sm`}
          placeholder={placeholder}
          value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''} // Format the date for the input
          onChange={handleChange} // Handle change to update Formik state
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DatePicker;
