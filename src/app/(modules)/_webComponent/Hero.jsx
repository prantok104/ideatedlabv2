"use client";

import Image from "next/image";
import TextLogo from "../../../../public/asset/website-images/hero-text-image.svg";
import { homeData } from "@/utils/home-static-data";
import Button from "@/components/button/Button";
import HeroTruck from "../../../../public/asset/website-images/hero-truck-image.png";
import CardCarousel from "./CardCarousel";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-4 max-w-[1296px] pt-[130px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex gap-4 items-stretch">
              <div>
                <Image
                  src={TextLogo}
                  alt="text-logo"
                  className="object-cover"
                />
              </div>

              <div className="self-end">
                <p className="text-[#D0D0D0] text-sm font-normal">
                  Perfect freight. Perfect timing. Anyplace
                </p>
              </div>
            </div>

            <h1 className="mt-4 text-[30px] sm:text-[56px] text-[#FFF] font-semibold sm:font-bold sm:leading-[70px]">
              {homeData.homeTitle}
            </h1>

            <div className="max-w-48 mt-4 mb-10 sm:mt-20 sm:md-0">
              <Button
                size="large"
                className="border-2 outline-2 outline outline-primary outline-offset-2 border-primary bg-primary text-white px-12 py-3 rounded font-bold hover:bg-[#588b0d] hover:border-[#588b0d] hover:outline-[#588b0d] hover:transition-all hover:ease-in-out"
                onClick={() => router.push("/auth/create-account")}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div>
            <Image src={HeroTruck} alt="hero-truck" />
          </div>
        </div>

        <div>
          <h1 className="text-[#b0b0b0b0] text-base font-semibold">
            Latest Available Loads
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <CardCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
