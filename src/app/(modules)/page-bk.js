"use client";
import { buildRouterUrl } from "@/utils/helper";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/utils/router";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineCheckCircle } from "react-icons/ai";
import carrier from "../../../public/asset/truck.svg";
import shipper from "../../../public/asset/shipper.svg";
import broker from "../../../public/asset/broker.svg";
import Button from "@/components/button/Button";
import Navbar from "./_webComponent/Navbar";

// Card data
const cardData = [
  { id: "carrier", imageSrc: carrier, label: "Carrier" },
  { id: "shipper", imageSrc: shipper, label: "Shipper" },
  { id: "broker", imageSrc: broker, label: "Broker" },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const handleRoleClick = (id) => {
    setSelectedRole(id);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">
          Join as a Carrier or Shipper/Broker
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {cardData.map(({ id, imageSrc, label }) => (
            <div
              key={id}
              className={`relative rounded-md shadow-md px-20 py-12 flex flex-col items-center justify-center cursor-pointer ${
                selectedRole === id
                  ? "border-green-500 border-2 bg-green-50"
                  : "bg-white"
              }`}
              onClick={() => handleRoleClick(id)}
            >
              <Image
                src={imageSrc}
                alt={label}
                width={60}
                height={60}
                className="mb-4"
              />
              <h2 className="text-[#1C252E] text-2xl font-semibold">{label}</h2>
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedRole === id
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedRole === id && (
                  <AiOutlineCheckCircle className="text-white" size={16} />
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedRole && (
          <div className="flex justify-center items-center my-5">
            <Button
              variant="base"
              onClick={() => {
                router.push(
                  buildRouterUrl(REGISTER_ROUTE, {
                    params: {
                      selectedPackage: selectedRole,
                    },
                  })
                );
              }}
            >
              Create Account
            </Button>
          </div>
        )}

        <p className="mt-2 text-gray-500">
          Already have an account?{" "}
          <a href={LOGIN_ROUTE} className="text-blue-500">
            Sign In
          </a>
        </p>
      </div>
    </>
  );
}
