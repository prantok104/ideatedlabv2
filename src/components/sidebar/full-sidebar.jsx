"use client";
import { useAuth } from "@/contexts/AppContext";
import { menus } from "@/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function FullSidebar() {
  const { user } = useAuth(); // Get user details from the AuthContext
  const router = useRouter();
  const currentPath = usePathname();
  const [currentMenu, setCurrentmenu] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const splitedPath = currentPath.split("/");
    const appName = ["shipper", "carrier"].includes(splitedPath[1])
      ? splitedPath[1]
      : "admin";
    setCurrentmenu(menus[appName]);
  }, [currentPath]);

  return (
    <aside className="bg-[#F9FAFB]  flex flex-col  min-h-screen z-40 w-[240px]">
      {/* Logo */}
      <div className="flex items-center w-64  p-4 flex-shrink-0 fixed top-0">
        <Link href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5SQntNi68ASSiKFpRVzQOMfJCx5aYevH69w&s"
            alt="Brand Logo"
            className="h-10 w-10 mr-2 ml-2"
          />
        </Link>

        <h1 className="text-lg font-bold">Ksl360</h1>
      </div>

      <ul className="pt-5 px- top-16 fixed w-[239px]">
        {currentMenu?.map(
          ({ id, icon, routeName, link, isDropdown, dropdownItems }) => (
            <li key={id} className="mb-1 " onClick={() => router.push(link)}>
              <div
                className={`flex items-center gap-3 px-3 py-4 text-base font-normal leading-6 cursor-pointer ${
                  currentPath === link
                    ? "bg-[#73C002] rounded-lg text-white"
                    : "bg-transparent text-[#454F5B] transition-all hover:bg-[#F1F9E6] hover:text-[#73C002] rounded-md"
                }`}
                onClick={isDropdown ? toggleDropdown : undefined}
              >
                <span className="self-center">{icon}</span>
                <span className="flex-1">{routeName}</span>
                {isDropdown && (
                  <span>
                    {isDropdownOpen ? (
                      <AiOutlineUp size={16} />
                    ) : (
                      <AiOutlineDown size={16} />
                    )}
                  </span>
                )}
              </div>

              {isDropdown && (
                <ul
                  className={`ml-8 mt-1 overflow-hidden transition-all duration-500 ease ${
                    isDropdownOpen
                      ? "max-h-96 opacity-100 transition-opacity duration-500"
                      : "max-h-0 opacity-0 transition-opacity duration-500"
                  }`}
                >
                  {dropdownItems.map(({ id, icon, name, link }) => (
                    <li key={id} onClick={() => console.log(link)}>
                      <div
                        className={`flex items-center gap-3 px-6 py-3 text-sm font-normal leading-5 cursor-pointer ${
                          currentPath === link
                            ? "bg-[#73C002] rounded-lg text-white"
                            : "bg-transparent text-[#454F5B] transition-all hover:bg-[#F1F9E6] hover:text-[#73C002] rounded-md"
                        }`}
                      >
                        <span className="self-center">{icon}</span>
                        {name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>

      {/* Upgrade Plan Section */}
      <div className="upgrade-card-wrapper px-6 pt-6 pb-3 rounded-md fixed bottom-0 overflow-x-hidden w-[239px]">
        <div>
          <h5 className="text-[#454F5B] font-semibold text-base  pb-3">
            Pro plan
          </h5>
          <p className="pb-4 text-sm text-normal text-slate-400">
            Get 3 month premium subscription
          </p>

          <div className="upgrade-plan-btn rounded-md bg-sky-300 px-6 py-2 text-center font-semibold hover:bg-sky-400 hover:text-slate-600 transition-all">
            <Link href="/">Upgrade</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FullSidebar;
