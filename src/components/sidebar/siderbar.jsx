"use client";

import { useApp } from "@/contexts/AppContext";
import { UNVERIFIED } from "@/utils/static-const";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineDown,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUp,
} from "react-icons/ai";

function Sidebar({ collapsed, toggleCollapse }) {
  const { user, filteredMenu } = useApp(); // Use the filtered menu from context
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState();
  const path = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    // Check if path exists
    const exists = filteredMenu
      ?.flatMap((item) => item.dropdownItems) // Flatten to get all dropdown items
      .some((subItem) => subItem?.link === path); // Check existence

    // Set the dropdown to be open if it contains the active route
    if (exists) {
      setCurrentPath(path);
    }
    // console.log(currentPath);
  }, [path, filteredMenu]);

  // Automatically open the dropdown that contains the active route
  useEffect(() => {
    // Check if any dropdown contains the active route
    const activeDropdown = filteredMenu.find(
      (menuItem) =>
        menuItem.isDropdown &&
        menuItem.dropdownItems.some(({ link }) => currentPath === link)
    );

    // Set the dropdown to be open if it contains the active route
    if (activeDropdown) {
      setDropdownOpen(activeDropdown.id);
    }
  }, [currentPath]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1060) {
        toggleCollapse(true);
      } else {
        toggleCollapse(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleCollapse]);

  const toggleDropdown = (id) =>
    setDropdownOpen((prevState) => (prevState === id ? null : id));

  return (
    <aside
      className={`sidebar bg-[#FFF] flex flex-col z-40 ${
        collapsed ? "w-16" : "w-[240px]"
      } transition-all duration-300`}
    >
      {/* Logo and Collapse Button */}
      <div
        className={`flex items-center p-4 z-20 fixed top-0 ${
          collapsed ? "w-16 justify-center" : "w-64 justify-between"
        } transition-all duration-300`}
      >
        <Link href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5SQntNi68ASSiKFpRVzQOMfJCx5aYevH69w&s"
            alt="Brand Logo"
            className={`h-10 w-10 mr-2 ml-2 ${collapsed ? "hidden" : "block"}`}
          />
        </Link>
        {!collapsed && <h1 className="text-lg font-bold ">KLS360</h1>}
        <button className="p-2 rounded-full" onClick={toggleCollapse}>
          {collapsed ? (
            <AiOutlineMenuUnfold size={20} />
          ) : (
            <AiOutlineMenuFold size={20} />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul
        className={`pb-20 px-2 z-10 fixed bg-[#FFF] top-16 h-screen overflow-y-auto ${
          collapsed ? "w-20" : "w-[240px]"
        } transition-all duration-400`}
        style={{ maxHeight: "100vh" }}
      >
        {filteredMenu?.map(
          ({ id, icon, routeName, link, isDropdown, dropdownItems }) => (
            <li
              key={id}
              className={`relative mb-1 ${
                isDropdownOpen === id ? "bg-[#F1F9E6]" : "bg-transparent"
              }`}
              onClick={() => !isDropdown && router.push(link)}
            >
              <div
                className={`flex items-center px-3 py-4 text-base font-normal leading-6 cursor-pointer ${
                  collapsed ? "gap-1" : "gap-3"
                } ${
                  path === link ||
                  (dropdownItems &&
                    dropdownItems.some(({ link }) => currentPath === link))
                    ? "bg-[#73C002] rounded-lg text-white"
                    : "bg-transparent text-[#454F5B] transition-all hover:bg-[#F1F9E6] hover:text-[#73C002] rounded-md"
                }`}
                onClick={() =>
                  isDropdown ? toggleDropdown(id) : router.push(link)
                }
              >
                <span className="self-center">{icon}</span>
                <span className={`flex-1 ${collapsed ? "hidden" : "block"}`}>
                  {routeName}
                </span>
                {isDropdown && (
                  <span>
                    {isDropdownOpen === id ? (
                      <AiOutlineUp size={collapsed ? 12 : 16} />
                    ) : (
                      <AiOutlineDown size={collapsed ? 12 : 16} />
                    )}
                  </span>
                )}
              </div>

              {/* Dropdown Menu */}
              {isDropdown && (
                <ul
                  className={`transition-all duration-500 ease ${
                    isDropdownOpen === id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } ${collapsed ? "ml-0" : "mt-1 ml-4"} overflow-hidden`}
                >
                  {dropdownItems.map(({ id, icon, name, link }) => (
                    <li key={id} onClick={() => router.push(link)}>
                      <div
                        className={`flex items-center gap-3 py-3 text-sm font-normal leading-5 cursor-pointer ${
                          collapsed ? "px-3" : "px-5"
                        } ${
                          currentPath === link
                            ? "bg-[#73C002] rounded-lg text-white"
                            : "bg-transparent text-[#454F5B] transition-all hover:bg-[#F1F9E6] hover:text-[#73C002] rounded-md"
                        }`}
                      >
                        <span className="self-center">{icon}</span>
                        {!collapsed && name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
