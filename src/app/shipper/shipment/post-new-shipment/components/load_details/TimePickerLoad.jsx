"use client";

const TimePickerLoad = ({ label }) => {
  return (
    <div className="relative w-full max-w-xs pt-2">
      <label className="text-gray-600 text-sm font-medium leading-tight">
        {label}
      </label>
      <div className="relative">
        <input
          type="time"
          className="w-full text-sm text-[#454F5B] border border-gray-300 bg-white mt-2 py-3 px-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out"
          placeholder="Select a time"
          defaultValue="00:00"
          min="00:00"
          max="23:59"
        />
      </div>
    </div>
  );
};

export default TimePickerLoad;
