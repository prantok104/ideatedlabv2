"use client";

import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const ActionMenu = ({ menuItems, handleActionMenu, row }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => {
    setOpen(!open);
  };

  const onClick = (item) => {
    if (handleActionMenu) {
      handleActionMenu(item.type, row);
    }
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className="border-none rounded-md py-2 px-4 mb-2 text-lg cursor-pointer hover"
        onClick={toggle}
      >
        <HiDotsVertical />
      </button>
      <ul
        className={`absolute top-full right-[-100%] bg-white border rounded-md min-w-[150px] text-start shadow-md z-[9999] transition-all duration-300 ease-in-out transform ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ transformOrigin: "top right", zIndex: 100000 }} // Animation origin at the top right corner
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="py-2 px-4 cursor-pointer hover:bg-[#F5F5FA]"
            onClick={() => onClick(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionMenu;
