"use client";

const Switch = ({ id, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-10 h-6 bg-gray-300 rounded-full relative">
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-4 bg-green-500" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};
