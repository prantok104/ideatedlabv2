"use client";

import RadioButton from "@/components/form/RadioButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import Button from "@/components/button/Button";
import { BiPlug, BiPlus, BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/navigation";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import AddCard from "./_components/AddCard";
import { FaCcAmex, FaTrash } from "react-icons/fa6";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { SiAmericanexpress } from "react-icons/si";
import FinalInvoiceTable from "@/components/settings-components/billing-invoice/FinalInvoiceTable";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BROWSE_BILL_AND_INVOICE } from "@/utils/permission";

const cards = [
  {
    id: "visa",
    label: "VISA Electron",
    number: "**** **** **** 7894",
    expiry: "Expires 08/36",
    imageLink: <FaCcVisa size={30} />,
  },
  {
    id: "mastercard",
    label: "MasterCard",
    number: "**** **** **** 1234",
    expiry: "Expires 05/30",
    imageLink: <FaCcMastercard size={30} />,
  },
  {
    id: "amex",
    label: "American Express",
    number: "**** **** **** 5678",
    expiry: "Expires 11/29",
    imageLink: <FaCcMastercard size={30} />,
  },
];

const cardImages = [
  {
    name: "VISA",
    icon: <FaCcVisa size={30} />,
  },
  {
    name: "VISA ELECTRON",
    icon: <FaCcVisa size={30} />,
  },
  {
    name: "VISAELECTRON",
    icon: <FaCcVisa size={30} />,
  },
  {
    name: "MASTERCARD",
    icon: <FaCcMastercard size={30} />,
  },
  {
    name: "MASTER CARD",
    icon: <FaCcMastercard size={30} />,
  },
  {
    name: "AMERICAN EXPRESS",
    icon: <SiAmericanexpress size={30} />,
  },
  {
    name: "AMERICANEXPRESS",
    icon: <SiAmericanexpress size={30} />,
  },
  {
    name: "AMEX",
    icon: <FaCcAmex size={30} />,
  },
];

const BillingAndInvoices = () => {
  const [selectedCard, setSelectedCard] = useState("visa");
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const [isPaymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const {
    data: savedCards,
    isLoading,
    mutate,
  } = apiClient.useAxiosSWR(apiEndpoint.payments.savedCards, {});
  console.log(savedCards);

  useEffect(() => {
    mutate();
    if (savedCards?.data) {
      const defaultCard = savedCards.data.find(
        (card) => card.isDefault === true
      );
      if (defaultCard) {
        setSelectedCard(defaultCard.id);
      }
    }
  }, [isAddCardOpen, savedCards]);

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Billing & Invoices
      </h1>

      <section className="bg-gray-50 px-6 py-4 rounded-lg shadow-lg">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setPaymentMethodsOpen(!isPaymentMethodsOpen)}
        >
          <h4 className="text-xl font-semibold text-slate-700 mt-2">
            My Payment Methods
          </h4>
          <BiChevronDown
            size={24}
            className={`transform transition-transform duration-300 ${
              isPaymentMethodsOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`transition-[height,opacity] duration-500 ease-in-out overflow-hidden mt-2 ${
            isPaymentMethodsOpen
              ? "opacity-100 max-h-[1000px] h-auto"
              : "opacity-0 max-h-0"
          }`}
        >
          <p className="text-sm mb-6">
            Add or remove credit cards or{" "}
            <Link href="#" className="text-blue-400">
              set up ACH payments.
            </Link>
            To manage existing ACH payments, or to set up or manage Monthly
            Statement Payments,{" "}
            <Link href="#" className="text-blue-400">
              Customer Support.
            </Link>
          </p>

          <h4 className="text-lg font-semibold text-slate-700 mb-4">
            Saved Payment Card
          </h4>
          <div className="border border-gray-400 mb-4"></div>

          {/* Payment cards here */}

          <div className="flex flex-col space-y-4">
            {!isLoading &&
              savedCards?.data?.map((_card) => (
                <div
                  key={_card.id}
                  className="flex items-center justify-between cursor-pointer py-3 bg-slate-100 rounded-lg px-4"
                  onClick={() => setSelectedCard(_card.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={_card.id}
                      name="card"
                      value={_card.id}
                      checked={selectedCard === _card.id}
                      onChange={() => setSelectedCard(_card.id)}
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-start w-5 h-5 mr-8 rounded-full ${
                          selectedCard === _card.id
                            ? "bg-green-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {selectedCard === _card.id && (
                          <span
                            className="text-white text-lg leading-none"
                            style={{ fontSize: "35px", marginTop: "-6px" }}
                          >
                            •
                          </span>
                        )}
                      </div>
                      <label htmlFor={_card.id} className="cursor-pointer">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div>
                            <p>
                              {
                                cardImages?.find(
                                  (item) => item?.name == _card?.scheme
                                )?.icon
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-sm leading-6 font-semibold text-[#696663]">
                              {_card.scheme}{" "}
                              {`${_card?.accountNumberFirst.slice(
                                0,
                                2
                              )}${_card?.accountNumberFirst
                                .slice(2)
                                .replace(/\d/g, "*")}`}
                              <span>*******{_card?.accountNumberLast}</span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {_card.expiryMonth < 10
                                ? `0${_card.expiryMonth}`
                                : _card.expiryMonth}
                              /{Number(String(_card.expiryYear)?.slice(2))}{" "}
                              {_card?.isDefault ? "Default" : ""}
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Delete Button */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent click handler from triggering
                      handleDeleteCard(_card.id); // Call delete function
                    }}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <FaTrash size={18} />
                  </button> */}
                </div>
              ))}
          </div>

          {/* Add new card */}
          <div className="mt-4 flex justify-start">
            <div className="inline-flex">
              <Button
                variant="stroke"
                size="xlarge"
                iconLeft={<BiPlus size={20} />}
                onClick={() => setAddCardOpen((prev) => !prev)}
              >
                Add Your Payment Method
              </Button>
              {/* RightDrawer for adding card */}
              <RightDrawer
                isOpen={isAddCardOpen}
                onClose={() => setAddCardOpen(false)}
                style="w-1/3"
              >
                <AddCard
                  onClose={() => setAddCardOpen(false)}
                  setAddCardOpen={setAddCardOpen}
                />
              </RightDrawer>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <FinalInvoiceTable />
      </section>
    </>
  );
};

export default WithAuthorization(BillingAndInvoices, [BROWSE_BILL_AND_INVOICE]);
