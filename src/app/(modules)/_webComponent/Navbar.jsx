"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for hamburger menu and close
import Logo from "../../../../public/web-logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define an array of links
  const navLinks = [
    { name: "Carriers", href: "/" },
    { name: "Brokers", href: "/about" },
    { name: "Shippers", href: "/services" },
    { name: "About Us", href: "/about-us" },
    { name: "Subscriptions", href: "/subscriptions" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full   ${
        scrolled
          ? "bg-black/60 backdrop-blur-sm shadow-lg"
          : "bg-black/30 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-[1296px]">
        {/* Logo */}
        <div className="text-gray-700 text-2xl font-bold">
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex space-x-6 flex-grow justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-300 transition-all duration-300 ease-in-out hover:text-gray-50"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons - Aligned to the right */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auth/login"
            className="bg-transparent text-slate-300 transition-all duration-300 ease-in-out hover:text-gray-50 py-2 px-4 rounded"
          >
            Sign In
          </Link>
          <Link
            href="/auth/create-account"
            className="bg-[#73C002] text-white py-2 px-4 rounded font-bold transition-all duration-300 ease-in-out hover:text-white "
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-gray-700">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 md:hidden bg-gray-50 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-800 hover:text-gray-900"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile CTA Buttons */}
          <div className="mt-4">
            <Link
              href="/login"
              className="block bg-transparent text-gray-800 hover:bg-gray-200 py-2 px-4 mb-2 rounded"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block  mt-2 bg-[#73C002] text-[#151515] py-2 px-4 rounded font-bold transition-all duration-300 ease-in-out hover:text-white"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
