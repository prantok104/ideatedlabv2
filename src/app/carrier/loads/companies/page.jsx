"use client";

import { loadCompanies } from "@/utils/home-static-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathName = usePathname();

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loadCompanies.map((item) => (
          <Link key={item.id} href={`${pathName}/${item.link}`}>
            <div
              className="companies-card px-11 py-5 rounded-lg"
              style={{ backgroundColor: item.backgroundColorCard }} // Inline dynamic background color
            >
              <div className="w-[54px] h-[54px] rounded-full flex justify-center items-center bg-white">
                <Image
                  src={item.icon} // Image path now properly handled in static data
                  alt={`${item.name} Icon`}
                  width={36}
                  height={36}
                />
              </div>

              <div className="text-part flex justify-between items-center mt-[28px]">
                <p className="text-[#637381] text-base font-medium">
                  {item.name}
                </p>
                <h4 className="text-[#454f5b] text-3xl font-bold">
                  {item.itemsCounts}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;
