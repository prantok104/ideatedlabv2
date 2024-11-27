"use client";

import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

export default function RightSideDrawer({ title, isOpen, onClose, children, style }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-15 z-40 transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-slate-100 text-black transition-transform duration-500 delay-50 rounded-tl-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto p-[40px] z-50 ${style}`}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-medium ">{title}</h2>
          <LiaTimesSolid
            onClick={onClose}
            style={{ cursor: "pointer", fontSize: "25px" }}
            className="hover:text-red-500"
          />
        </div>
        <div className="body-content">{children}</div>
      </div>
    </>
  );
}
