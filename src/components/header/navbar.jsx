"use client";
import { useApp } from "@/contexts/AppContext";
import { removeAuthToken } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronUpOutline } from "react-icons/io5";
import { MdMenuOpen, MdOutlineMail } from "react-icons/md";
import Avatar from "../../../public/asset/user-avatar.png";
import ProfileDropdown from "./profileDropdown";

function Navbar() {
  const { user } = useApp();
  const handleLogOut = () => {
    removeAuthToken();
    window.location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FFF] w-full text-[#1C252E] sticky top-0">
      <div className="mx-auto px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="flex flex-shrink-0 items-center">
              <MdMenuOpen className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-6 ">
            <div className="flex items-center gap-3">
              <MdOutlineMail className="w-6 h-6" />
              <IoMdNotificationsOutline className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative flex justify-center items-center">
                <Image
                  className="rounded-full border"
                  src={Avatar}
                  alt="avatar"
                />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-semibold text-base">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="font-medium text-xs leading-6 text-[#637381]">
                    {user?.userType}
                  </p>
                </div>
                <div
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700"
                >
                  <IoChevronUpOutline
                    size={24}
                    className={`cursor-pointer transform transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-360" : "rotate-180"
                    }`}
                  />
                </div>
              </div>
            </div>

            <ProfileDropdown
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              handleLogOut={handleLogOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
