"use client";
import CallToAction from "../../../../public/asset/website-images/call-to-action-image_1_11zon.png";
import Link from "next/link";
import Image from "next/image";

const CallToActionSection = () => {
  return (
    <section className="call-to-action pt-10">
      <div className="container mx-auto px-4 pt-4 max-w-[1296px] bg-transparent">
        <h5 className="text-[#FFFFFF] text-lg md:text-xl font-semibold text-center">
          GET STARTED
        </h5>
        <h1 className="text-[#F6F6F6] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center my-5 md:my-8">
          Try our loadboard and start increasing your loaded miles
        </h1>

        <div className="flex justify-center mb-2 md:mb-12">
          <Link href={"/auth/create-account"}>
            <div className="text-[#11101B] text-sm md:text-base font-medium bg-slate-100 w-40 md:w-48 py-2 px-4 rounded-lg mt-5 text-center transition-all hover:bg-green-400">
              Try free for 7 days
            </div>
          </Link>
        </div>

        {/* Image container */}
        <div className="flex justify-center items-center mt-5 md:mt-16">
          <Image
            src={CallToAction}
            alt="ksl360"
            className="w-64 h-auto min-w-[100%]"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
