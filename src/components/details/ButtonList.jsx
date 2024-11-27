"use client";
import Link from "next/link";
import { RxDotsVertical } from "react-icons/rx"; // Import icons as needed

const ButtonList = ({ buttonData, handleNavigation }) => {
  return (
    <div>
      <ul className="flex items-center">
        {buttonData?.map(({ id, icon, routeName, link }) => (
          <button
            className="flex items-center rounded-md border ml-2 py-1 w-[90px] text-[#637381] text-xs font-medium font-['Inter'] leading-tight justify-center"
            onClick={() => handleNavigation(routeName)}
          >
            <div className="flex items-center gap-1">
              {icon}
              <p>{routeName}</p>
            </div>
          </button>
        ))}
        <Link href="#">
          <RxDotsVertical size={24} />
        </Link>
      </ul>
    </div>
  );
};

export default ButtonList;
