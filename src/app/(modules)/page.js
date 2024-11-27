"use client";

import { useState } from "react";
import { homeData } from "@/utils/home-static-data";
import Hero from "./_webComponent/Hero";
import Navbar from "./_webComponent/Navbar";
import ModalOpenImage from "../../../public/asset/website-images/modal-open-image.png";
import Image from "next/image";
import Button from "@/components/button/Button";
import { FaCirclePlay } from "react-icons/fa6";
import Modal from "@/components/modal/Modal";
import WhyKsl from "../../../public/asset/website-images/why-ksl360_6_11zon.png";
import { BsPlayBtn } from "react-icons/bs";
import AppsDownload from "../../../public/asset/website-images/download-store-apps.png";
import MillinUser from "../../../public/asset/website-images/2.5M+.png";
import AppleDownload from "../../../public/asset/website-images/download-on-the-app-store-apple-logo-svgrepo-com 1.svg";
import GoogleDownload from "../../../public/asset/website-images/google-play-badge-logo-svgrepo-com 1.svg";
import Link from "next/link";
import StarRating from "@/components/table/tool/StarRating";
import Footer from "./_webComponent/Footer";
import CallToActionSection from "./_webComponent/CallToActionSection";
import { useRouter } from "next/navigation";
import PricingCards from "./_webComponent/PricingCards";


const Page = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoOpen, setVideoOpen] = useState(false);

  // Function to open modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenVideo = () => {
    setVideoOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseVideo = () => {
    setVideoOpen(false);
  };

  const handleRoleClick = (id) => {
    setSelectedRole(id);
  };

  return (
    <div className="bg-[#F5F5F5]">
      <Navbar />
      <Hero />

      {/* 3rd section goes here */}
      <section className="my-20">
        <div className="container mx-auto px-4 py-4 max-w-[1296px]">
          <h2 className="text-[32px] md:text-[40px] font-extrabold w-full">
            Secure the Best Loads for Your Business –{" "}
            <span className="text-[#73C002]">
              Match the Right Truck with the Right Load at Competitive Prices
            </span>{" "}
            , No Matter Your Location.
          </h2>

          <p className="mt-3 text-[#9E9E9E] text-sm md:text-base font-normal">
            {homeData?.secondTitleSub}
          </p>

          <div className="mt-12 flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-48 md:w-72">
              <Image
                src={ModalOpenImage}
                alt="Image"
                className="border-8 rounded-full border-green-500"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="icon"
                  iconMiddle={<FaCirclePlay />}
                  onClick={handleOpenModal}
                ></Button>
              </div>
            </div>

            <div>
              <p className="text-[#9E9E9E] text-sm md:text-base font-semibold">
                Video Guide
              </p>
              <h5 className="text-[#000] text-[24px] md:text-[32px] font-bold">
                Load board
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* 3rd section goes here end */}

      {/* pricing plan adjusted */}
      <section className="bg-slate-900 pt-[71px] pb-[72px]">
        <p className="text-[20px] text-[#FFF] font-semibold text-center mb-1">
          PRICING
        </p>
        <h1 className="text-center text-[#f6f6f6] text-4xl font-bold">
          Find the right plan for your needs
        </h1>

        <div className="">
          <PricingCards />
        </div>
      </section>
      {/* pricing plan adjusted end */}

      {/* More feature section */}
      <section>
        <div className="container mx-auto px-4 py-4 max-w-[1296px] bg-transparent">
          <p className="text-[20px] text-[#77BF04] font-semibold text-center mb-1">
            MORE FEATURES
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold w-full text-center mb-6">
            All You Need for Efficient Last-Mile Delivery Management
          </h2>

          {/* card data here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homeData?.cards.map((items) => (
              <div
                key={items.id}
                className="bg-[#eeeeee] rounded-md px-3 py-3.5"
              >
                <div className="bg-[#ffffff] px-4 py-5 rounded-lg">
                  <Image
                    src={items?.image}
                    alt={items?.title}
                    layout="responsive"
                    width={16} // Aspect ratio width
                    height={9} // Aspect ratio height
                    className="mb-4"
                  />

                  <h3 className="text-black text-lg mb-3 font-semibold">
                    {items?.title}
                  </h3>
                  <p className="text-[#9E9E9E] text-sm leading-5 font-normal">
                    {items?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* More feature section end */}

      {/* counting of cards */}
      <section className="bg-[#040A0C]">
        <div className="container mx-auto px-4 py-4 max-w-[1296px] bg-transparent">
          {/* Outer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-20">
            {/* Left Column */}
            <div className="lg:col-span-8 col-span-12">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-10">
                {/* First Item */}
                <div className="col-span-2 md:col-span-4 h-56 bg-[#73C002] rounded-lg p-4 flex flex-col">
                  <h1 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl font-bold">
                    20k+
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 mt-auto">
                    Truckloads Posted Annually
                  </p>
                </div>
                {/* Second Item */}
                <div className="col-span-2 md:col-span-6 h-56 bg-[#101D21] rounded-lg p-4 flex flex-col">
                  <h1 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl font-bold">
                    11k+
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 mt-auto">
                    Carriers
                  </p>
                </div>
                {/* Third Item */}
                <div className="col-span-2 md:col-span-6 h-56 bg-[#101D21] rounded-lg p-4 flex flex-col">
                  <h1 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl font-bold">
                    10+
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 mt-auto">
                    Tools for life on the Road
                  </p>
                </div>
                {/* Fourth Item */}
                <div className="col-span-2 md:col-span-4 h-56 bg-[#73C002] rounded-lg p-4 flex flex-col">
                  <h1 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl font-bold">
                    $56M+
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 mt-auto">
                    Available Truck Load Opportunity
                  </p>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="lg:col-span-4 col-span-12 h-56 md:h-[100%] bg-[#101D21] rounded-lg p-4 flex flex-col">
              <h1 className="text-slate-50 text-4xl sm:text-5xl md:text-6xl font-bold">
                90%
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 mt-auto">
                Visibility Compliance
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* counting of cards end */}

      {/* why ksl360 */}
      <section>
        <div className="container mx-auto px-4 py-4 max-w-[1296px] bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20 justify-center ">
            <div>
              <h1>
                <p className="text-[20px] text-[#77BF04] font-semibold mb-1">
                  WHY KLS360?
                </p>
                <strong className="text-[32px] md:text-[40px] font-extrabold w-full mb-6 ">
                  A KLS360 delivery is efficient from start to finish
                </strong>
              </h1>

              <div className="mb-4">
                <p className="text-[#474747] text-base leading-6 font-semibold pb-2">
                  Dispatchers
                </p>
                <p className="text-[#9E9E9E] text-bsae font-normal leading-6">
                  Plan, optimize, and assign routes faster. Instantly adapt to
                  last-minute changes with live tracking and route management.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[#474747] text-base leading-6 font-semibold pb-2">
                  Dispatchers
                </p>
                <p className="text-[#9E9E9E] text-bsae font-normal leading-6">
                  Plan, optimize, and assign routes faster. Instantly adapt to
                  last-minute changes with live tracking and route management.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[#474747] text-base leading-6 font-semibold pb-2">
                  Dispatchers
                </p>
                <p className="text-[#9E9E9E] text-bsae font-normal leading-6">
                  Plan, optimize, and assign routes faster. Instantly adapt to
                  last-minute changes with live tracking and route management.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <Button
                    variant="base"
                    size="large"
                    onClick={() => router.push("/auth/create-account")}
                  >
                    Get Demo
                  </Button>
                </div>

                <div>
                  <Button
                    variant="stroke"
                    size="small"
                    iconLeft={<BsPlayBtn />}
                    onClick={() => setVideoOpen(true)}
                  >
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="place-content-center">
              <Image src={WhyKsl} alt="ksl360" />
            </div>
          </div>
        </div>
      </section>
      {/* why ksl360 end */}

      {/* download apps section */}
      <section className="bg-[#00181F]">
        <div className="container mx-auto px-4 pt-4 max-w-[1296px] bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 sm:gap-10 md:pb-0 mt-20 justify-center">
            <div className="mt-auto">
              <Image src={AppsDownload} className="min-w-[100%]" alt="ksl360" />
            </div>

            <div className="place-content-center">
              <h1 className="text-[#F6F6F6] text-3xl font-bold">
                load board app to find available loads anytime, anywhere!
              </h1>

              <p className="text-base font-normal text-[#86969B] leading-6 pt-3">
                Need a load and on the go? Download our free mobile app
                on Android & iPhone (iOS). Need a free trucking load board?
              </p>

              <div className="pt-6">
                <Image src={MillinUser} alt="ksl360" />
                <p className="text-slate-500 text-sm font-medium leading-5">
                  App Downloads
                </p>
              </div>

              <div className="flex gap-6 pb-10 md:pb-0 mt-10">
                <Link href={"/"}>
                  <Image src={AppleDownload} alt="ksl360" />
                </Link>
                <Link href={"/"}>
                  <Image src={GoogleDownload} alt="ksl360" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* download apps section end */}

      {/* our customer says  */}
      <section className="our-customer-says pb-10">
        <div className="container mx-auto px-4 py-4 max-w-[1296px] bg-transparent">
          <h2 className="text-[32px] md:text-[40px] pt-10 font-extrabold w-full text-center mb-6 text-[#F6F6F6]">
            Our Customer Says
          </h2>

          {/* card data here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homeData?.testmonialCards.map((items, index) => (
              <div key={`testimonial_${index}`} className="testimonial-card">
                <StarRating rating={items?.rating} starRatedColor="gold" />

                <p className="mt-5 text-[#C6C6C6]">{items?.description}</p>

                <p className="mt-8 text-[#FFF] text-base leading-6 font-semibold">
                  {items?.name}
                </p>

                <p className="text-[#999] text-sm leading-6 font-normal">
                  {items?.compnay}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* our customer says  end */}

      <CallToActionSection />

      <Footer />

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold">Modal Content</h2>
        <p>This is where you can add your modal content.</p>
      </Modal>

      <Modal
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        maxWidth="max-w-3xl"
      >
        <h2 className="text-xl font-semibold">Modal Content2</h2>
        <p>This is where you can add your modal content.</p>
      </Modal>
    </div>
  );
};

export default Page;
