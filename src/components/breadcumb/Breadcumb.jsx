"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Split the path into segments and remove any empty segments
  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  // Handle segments slicing to show only the last 4
  const displaySegments = pathSegments.length > 4
    ? pathSegments.slice(-4)
    : pathSegments;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex space-x-2">
        {displaySegments?.map((segment, index) => {
          // Calculate the actual index in the original pathSegments array
          const actualIndex = pathSegments.length > 4 ? pathSegments.length - 4 + index : index;
          const href = "/" + pathSegments.slice(0, actualIndex + 1).join("/");
          const isLast = index === displaySegments.length - 1;

          return (
            <li key={href} className="flex items-center text-sm">
              {!isLast ? (
                <Link href={href} className="hover:underline">
                  {capitalizeFirstLetter(segment)}
                </Link>
              ) : (
                <span className="">{capitalizeFirstLetter(segment)}</span>
              )}
              {!isLast && (
                <span className="mx-1">
                  <MdOutlineKeyboardArrowRight size={14} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
