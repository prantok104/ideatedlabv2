// "use client";

// import React, { useEffect } from "react";
// import { FaArrowRight } from "react-icons/fa6";

// export default function RightDrawer({ isOpen, onClose, children, style }) {
//   useEffect(() => {
//     // Disable scrolling when the drawer is open
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }

//     // Cleanup: Ensure scrolling is re-enabled if the component is unmounted
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Smooth Overlay (Backdrop) */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-30 z-[900] transition-opacity duration-700 ease-in-out ${
//           isOpen ? "opacity-100" : "opacity-0"
//         }`}
//         aria-hidden="true"
//         onClick={onClose}
//       ></div>

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-white text-black shadow-lg transition-transform duration-[800ms] delay-[100ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } overflow-y-auto p-4 z-[1000] ${style} rounded-l-lg`}
//         onClick={(e) => e.stopPropagation()} // Prevent closing the drawer when clicking inside it
//       >
//         <button
//           onClick={onClose}
//           className="text-2xl absolute top-5 left-5 text-[#454F5B] z-[1001]"
//         >
//           <FaArrowRight size={32} />
//         </button>
//         {children}
//       </div>
//     </>
//   );
// }

"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function RightDrawer({ isOpen, onClose, children, style }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-15 z-40 transition-opacity duration-300"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white text-black transition-transform duration-500 delay-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto px-6 py-4 z-50 ${style}`}
      >
        <button
          onClick={onClose}
          className="text-2xl absolute top-5 left-5 text-[#454F5B] z-50"
        >
          <FaArrowRight size={32} />
        </button>
        {children}
      </div>
    </>
  );
}
