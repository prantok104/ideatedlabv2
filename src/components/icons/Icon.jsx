"use client";

import { HiPencil } from "react-icons/hi2";

const Icon = ({ size = 24, className = "" }) => {
  return (
    <>
      <HiPencil
        className={`${className}`}
        style={{ width: size, height: size }}
      />
    </>
  );
};

export default Icon;
