"use client";

import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import AppleDownload from "../../../../public/asset/website-images/download-on-the-app-store-apple-logo-svgrepo-com 1.svg";
import GoogleDownload from "../../../../public/asset/website-images/google-play-badge-logo-svgrepo-com 1.svg";
import Logo from "../../../../public/web-logo.svg"; // Update this with your logo path

const Footer = () => {
  return (
    <footer className="bg-[#11101B] text-white py-10">
      <div className="container mx-auto px-4 max-w-[1296px] grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left section with logo and description */}
        <div className="col-span-4">
          <Image src={Logo} alt="KSL360" width={50} height={50} />
          <p className="text-sm text-gray-400 mt-4">
            Provides a freight matching web and mobile app marketplace for
            carriers, owner-operators, brokers, and shippers to engage
            professional truck drivers, find loads, and increase their loaded
            miles.
          </p>
        </div>

        {/* Company Links */}
        <div className="col-span-2">
          <h5 className="font-semibold mb-4">Company</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">Carriers</a>
            </li>
            <li>
              <a href="#">Brokers</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Plan</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="col-span-2">
          <h5 className="font-semibold mb-4">Useful Links</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">API Integration</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="col-span-2">
          <h5 className="font-semibold mb-4">Support</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Brokers Support</a>
            </li>
            <li>
              <a href="#">Carriers Support</a>
            </li>
            <li>
              <a href="#">Load Board Videos</a>
            </li>
          </ul>
        </div>

        <div className="col-span-2">
          <h5 className="font-semibold mb-4">Our Mobile Apps</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#">
                <Image
                  src={AppleDownload}
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src={GoogleDownload}
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8  border-t border-gray-700 pt-4 flex justify-between items-center container mx-auto px-4 max-w-[1296px]">
        <p className="text-gray-500 text-sm text-center ">
          © 2024 KSL360. All rights reserved.
        </p>

        <div className="flex space-x-4">
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaFacebookF /></a>
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaTwitter /></a>
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
