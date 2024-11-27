"use client";

import { useState, useEffect } from "react";
import { MdCalendarToday } from "react-icons/md"; // Calendar icon from react-icons

const DatePicker = ({ label, name }) => {
  const [todayDate, setTodayDate] = useState("");

  // Get today's date in the YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  return (
    <div className="relative w-full max-w-xs pt-2">
      <label className="text-gray-600 text-sm font-medium leading-tight">
        {label}
      </label>
      <div className="relative">
    
        <input
          type="date"
          className="w-full text-sm text-[#454F5B] border border-gray-300 bg-white py-3 px-2 mt-2 rounded-lg focus:outline-none focus:ring-slate-600 transition duration-150 ease-in-out"
          placeholder={todayDate} 
          defaultValue={todayDate}
          name={name} 
        />
        {/* Custom Calendar Icon */}
        
      </div>
    </div>
  );
};

export default DatePicker;
