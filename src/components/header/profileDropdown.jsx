import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineKeyboardArrowRight,
  MdHelpOutline,
  MdLogout,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { BiMessageError } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ isOpen, handleLogOut }) => {
  const routeData = [
    {
      id: 1,
      icon: <CgProfile size={24} />,
      routeName: "Profile",
      link: '/user-managment/user-profile',
    },
    {
      id: 2,
      icon: <AiOutlineSetting size={24} />,
      routeName: "Account Settings",
      link: "/account-settings",
    },
    {
      id: 3,
      icon: <MdHelpOutline size={24} />,
      routeName: "Help Center",
      link: "/help-center",
    },
    {
      id: 4,
      icon: <BiMessageError size={24} />,
      routeName: "Terms & Conditions",
      link: "/terms-conditions",
    },
    {
      id: 5,
      icon: <MdOutlinePrivacyTip size={24} />,
      routeName: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      id: 6,
      icon: <MdLogout size={24} />,
      routeName: "Logout",
      link: "/logout",
    },
  ];

  return (
    <div className="relative bg-[#F9FAFB]">
      {/* {isOpen && ( */}
      <div
        className={`absolute top-6 right-6 z-10 mt-2 w-72 pb-9 origin-top-right border-t-0 rounded-lg rounded-t-none bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className=" text-[#637381] px-4">
          {routeData.map(({ id, icon, routeName, link }) => (
            <Link
              key={id}
              href={link}
              className={`block text-sm border-b-[1px] hover:bg-[#F1F9E6] rounded hover:text-[#73C002] transition-colors duration-300 ease-in-out ${
                routeName === "Logout" && "text-[#B71D18]"
              }`}
              onClick={routeName === "Logout" && handleLogOut}
              role="menuitem"
            >
              <div className="flex items-center justify-between pt-4 pb-3">
                <div className="flex items-center ml-1 gap-3">
                  {icon}
                  <p className="font-medium text-base leading-5">{routeName}</p>
                </div>
                <MdOutlineKeyboardArrowRight size={24} />
              </div>
            </Link>
          ))}
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};

export default ProfileDropdown;
