// // app/layout.js
// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Navbar from "./header/navbar";
// import Sidebar from "./sidebar/siderbar";
// import Breadcrumb from "./breadcumb/Breadcumb";

// function LayoutWrapper({ children }) {
//   const router = useRouter();

//   return (
//     <div className="h-screen flex flex-col">
//       <header className="bg-[#F9FAFB] h-16 flex justify-between items-center fixed top-0 w-full z-40">
//         <Navbar />
//       </header>
//       <div className="flex flex-1">
//         <Sidebar />

//         <main className="flex-1 p-4 mt-20">
//           <Breadcrumb />
//           {children}
//         </main>
//       </div>
//       <footer className="bg-gray-200 h-16 flex justify-center items-center">
//         <p>Copyright 2024</p>
//       </footer>
//     </div>
//   );
// }

// export default LayoutWrapper;

// app/layout.js
"use client";
import { useState, useCallback } from "react";
import Navbar from "./header/navbar";
import Sidebar from "./sidebar/siderbar";
import Breadcrumb from "./breadcumb/Breadcumb";

function LayoutWrapper({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = useCallback((value) => {
    if (typeof value === "boolean") {
      setCollapsed(value);
    } else {
      setCollapsed((prev) => !prev);
    }
  }, []);

  return (
    <div className="h-[100vh]  flex flex-col">
      <header className="bg-[#FFF] h-16 flex justify-between items-center fixed top-0 w-full z-40">
        <Navbar />
      </header>
      <div className="flex pb-10">
        <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <main
          className={`flex-1 p-4 mt-20 transition-all  ${
            collapsed ? "ml-[1rem]" : "ml-[2px]"
          }`}
          style={{
            width: collapsed ? "calc(100% - 4rem)" : "calc(100% - 540px)",
          }}
        >
          <Breadcrumb />
          {children}
        </main>
      </div>
      <footer className="bg-gray-200 h-6 flex justify-center items-center mt-auto">
        <p>Copyright 2024</p>
      </footer>
    </div>
  );
}

export default LayoutWrapper;
