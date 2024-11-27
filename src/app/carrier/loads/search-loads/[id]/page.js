"use client";

import Link from "next/link";
import { LuUndo2 } from "react-icons/lu";
import { MdCall, MdMessage } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { useState } from "react";
import RightDrawer from "../../../../../components/rightDrawer/RightDrawer";
import Backhauls from "./_component/Backhauls";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import TripCard from "@/components/details/TripCard";
import SpotRateCard from "@/components/details/SpotRateCard";
import EquipmentDetailsCard from "@/components/details/EquipmentDetailsCard";
import ContactDetailsCard from "@/components/details/ContactDetailsCard";
import {
  dataSet,
} from "./_component/TemporaryData";
import BidDataList from "./_component/BidDataList";
import PostedDetails from "@/components/details/PostedDetails";
import BidHistory from "./_component/BidHistory";
import BookingDetails from "./_component/BookingDetails";
import StatusTimeline from "./_component/StatusTimeline";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import dayjs from "dayjs";
import CommditiesDetailsCard from "@/components/details/Commdities";
import ShipmentDetailSkeleton from "./_component/ShipmentDetailSkeleton";
import ReactMapMarker from "./_component/ReactMapMarker";
import { FaHome } from "react-icons/fa";
import BidPlacement from "./_component/BidPlacement";
import BidsList from "./_component/BidsList";
import { useApp } from "@/contexts/AppContext";
import { notify, NOTIFY_MESSAGE_ERROR, NOTIFY_MESSAGE_SUCCESS } from "@/utils/helper";
import { HTTP_OK } from "@/utils/static-const";
import Messages from "@/components/chats/Messages";
import RightSideDrawer from "@/components/rightDrawer/RightSideDrawer";

const SearchLoadDetails = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [backhaulsOpen, setBackhaulsOpen] = useState(false);
  const [bidHistoryOpen, setBidHistoryOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [isDriverAssigned, setIsDriverAssigned] = useState(false);
  const {user} = useApp();
  const [directBook, setDirectBook] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [data, setData] = useState({
    data: dataSet,
    total: dataSet.length,
    perPage: 5,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 10,
  });

  //   const [loading, setLoading] = useState(false);

  const handlePageChange = (page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prevPagination) => ({ ...prevPagination, perPage }));
  };


  // ! Bids list
  const {
    data: bids,
    isLoading: bidLoading,
    mutate: bidMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.carrierBidding,{params: {loadId:id, page: 1, limit: 10}});



  // ! Details
  const {
    data: details,
    isLoading: loader,
    mutate,
  } = apiClient.useAxiosSWR(`${apiEndpoint?.shipment?.default}/${id}`, {});

  const {
    pickUpLocation,
    dropOffLocations,
    pickUpDate,
    trackingNumber,
    postingOptions,
    publishedAt,
    docStatus,
    trailer,
    commodity,
    flatRate,
    currency,
    carrierType,
    contactPersons,
    allowBids,
  } = details?.data ?? {};

  // Book Instantly
  const handleBookInstantly  = async () => {
      try {
        const responseData = await apiClient.post(
          apiEndpoint?.loadSearch?.loadBooking,
          {
            load: id,
            company: user?.company,
            selectedBid: null
          }
        );
        if (responseData?.status == HTTP_OK) {
          setDirectBook((prev) => !prev);
          await mutate();
          notify(responseData?.message, NOTIFY_MESSAGE_SUCCESS);
        } else {
          notify(responseData?.message, NOTIFY_MESSAGE_ERROR);
        }
      } catch (error) {
        notify(error?.message, NOTIFY_MESSAGE_ERROR);
      }
  }

  return (
    <div className="min-h-screen">
      {/* Header Section start */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold leading-7 text-[#141A21]">
          SR Express logistic
        </h1>

        {details?.data?.loadBooking &&
        Object.keys(details?.data?.loadBooking)?.length > 0 ? (
          <div className="flex items-center gap-2 ">
            <button className="bg-[#141A21] text-white p-3 rounded-full">
              <MdCall size={20} />
            </button>
            <button
              onClick={() => setOpenMessage(true)}
              className="bg-[#73c00260] text-[#141A21] p-3 rounded-full"
            >
              <MdMessage size={20} />
            </button>
            <RightSideDrawer
              isOpen={openMessage}
              onClose={() => setOpenMessage((prev) => !prev)}
              style="w-1/3"
            >
              <Messages />
            </RightSideDrawer>
          </div>
        ) : (
          <div className="flex items-center gap-2 ">
            {allowBids && (
              <BidPlacement
                id={id}
                bidMutate={bidMutate}
                bids={bids?.data?.length}
                mutate={mutate}
              />
            )}
            {Number(flatRate) > 0 && (
              <button
                onClick={handleBookInstantly}
                className="border border-[#73c002] py-2 px-4 rounded text-white bg-[#73c002] font-bold w-40"
              >
                Book Request
              </button>
            )}
          </div>
        )}
      </div>
      {/* Header Section End */}

      {loader ? (
        <div className="flex flex-row gap-3 justify-between">
          {/* {[...Array(6)].map((_, index) => ( */}
          <ShipmentDetailSkeleton />
          {/* ))} */}
        </div>
      ) : (
        <div className="md:flex gap-5">
          {/* Left Section Start */}
          <div className="w-full lg:w-1/4 space-y-4">
            <TripCard
              pickupLocation={
                pickUpLocation?.name ?? "No pickup location found"
              }
              pickupDate={dayjs(pickUpDate)?.format("DD MMM, YYYY")}
              dropoffLocation={
                Array.isArray(dropOffLocations) && dropOffLocations?.length > 0
                  ? dropOffLocations
                  : []
              }
            />

            <PostedDetails
              data={{
                post: postingOptions,
                ref: trackingNumber,
                postTime: publishedAt,
                book: allowBids ? "Bid Allow" : "Book Instantly",
                status: docStatus,
              }}
            />

            <SpotRateCard
              rate={`${currency} ${flatRate}`}
              perMile={`${(
                Number(flatRate) /
                (Array.isArray(dropOffLocations)
                  ? dropOffLocations?.reduce(
                      (sum, item) =>
                        sum + Number(item?.distanceFromPickup?.value),
                      0
                    ) / 1000
                  : 0)
              ).toFixed(2)}/KM`}
              range="--"
            />

            <EquipmentDetailsCard
              details={[
                {
                  label: "Load",
                  value: carrierType,
                },
                { label: "Truck", value: trailer?.title },
                {
                  label: "Length",
                  value: `${trailer?.length ?? "-"} ${
                    trailer?.lengthUnit ?? ""
                  }`,
                },
                {
                  label: "Weight",
                  value: `${trailer?.weight ?? "-"} ${
                    trailer?.weightUnit ?? ""
                  }`,
                },
                { label: "Tracking", value: trackingNumber },
              ]}
            />
            <CommditiesDetailsCard
              details={[
                {
                  label: "Name",
                  value: commodity?.name,
                },
                { label: "Description", value: commodity?.description },
                {
                  label: "Length",
                  value: `${commodity?.length ?? "-"} ${
                    trailer?.lengthUnit ?? ""
                  }`,
                },
                {
                  label: "Weight",
                  value: `${commodity?.weight ?? "-"} ${
                    trailer?.weightUnit ?? ""
                  }`,
                },
                {
                  label: "Hazardous",
                  value: commodity?.isHazardous ? "Yes" : "No",
                },
              ]}
            />
            <ContactDetailsCard
              contactDetails={
                Array.isArray(contactPersons)
                  ? contactPersons.flatMap((item) => [
                      { label: "Phone Number", value: item?.phone },
                      { label: "Email", value: item?.email },
                      { label: "Bidding", value: allowBids ? "Yes" : "-" },
                    ])
                  : []
              }
            />
          </div>
          {/* Left Section End  */}

          {/* Right Section Start */}
          <div className="w-full lg:w-3/4">
            <div className="rounded-lg mb-5">
              <div className="w-full h-[360px]">
                {dropOffLocations?.length > 0 && (
                  <ReactMapMarker
                    pickUpLocation={pickUpLocation}
                    dropOffLocations={dropOffLocations}
                  />
                )}

                {/* <Map /> */}
              </div>
            </div>

            {/* Load Views, Backhauls and Related Truck End */}
            <div className="flex justify-between items-center mb-7">
              <div className="flex items-center gap-5">
                {/* Load Views Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <FaHome size={24} className="text-[#637381]" />
                  <div className="ml-2 w-28">
                    <p className="text-[#454f5b] text-sm font- font-['Inter'] font-bold leading-tight">
                      Company
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                      SR Shipment
                    </p>
                  </div>
                </Link>
                {/* Load Views End */}

                {/* Backhauls(Possible Loads) Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                  onClick={() => setBackhaulsOpen((prev) => !prev)}
                >
                  <LuUndo2 size={24} className="text-[#637381]" />
                  <div className="ml-2 w-28">
                    <p className="text-[#454f5b] text-sm font-bold font-['Inter'] font-bold leading-tight">
                      Backhauls
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                      500 Possible Loads
                    </p>
                  </div>
                </Link>
                <RightDrawer
                  isOpen={backhaulsOpen}
                  onClose={() => setBackhaulsOpen(false)}
                  style="w-1/3"
                >
                  <Backhauls />
                </RightDrawer>
                {/* Backhauls(Possible Loads) End  */}

                {/* Profit Calculator Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <FaHome size={24} className="text-[#637381]" />
                  <div className="ml-2 w-28">
                    <p className="text-[#454f5b] text-sm font- font-['Inter'] font-bold leading-tight">
                      Profit Calculator
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                      $1452,00 (55.5/ml)
                    </p>
                  </div>
                </Link>
                {/* Profit Calculator End */}

                {/* Rate Check Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <FaHome size={24} className="text-[#637381]" />
                  <div className="ml-2 w-36">
                    <p className="text-[#454f5b] text-sm font- font-['Inter'] font-bold leading-tight">
                      Rate Check
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                      $5.51/ml average rate
                    </p>
                  </div>
                </Link>
                {/* Rate Check End */}

                {/* Mileage Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <FaHome size={24} className="text-[#637381]" />
                  <div className="ml-2 w-40">
                    <p className="text-[#454f5b] text-sm font- font-['Inter'] font-bold leading-tight">
                      Mileage, Maps and tools
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                      $0.00 toll cost
                    </p>
                  </div>
                </Link>
                {/* Mileage End */}

                {/* Bid History start  */}
                {!loader &&
                  details?.data?.loadBooking &&
                  Object.keys(details?.data?.loadBooking)?.length > 0 && (
                    <>
                      {" "}
                      <Link
                        href="#"
                        className="flex h-14 px-4 py-2 items-center bg-white rounded-lg"
                        style={{
                          boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)",
                        }}
                        onClick={() => setBidHistoryOpen((prev) => !prev)}
                      >
                        <RiHistoryFill size={24} className="text-[#637381]" />
                        <div className="ml-2 w-28">
                          <p className="text-[#454f5b] text-sm font-medium font-bold font-['Inter'] leading-tight">
                            Bid History
                          </p>
                          <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] underline leading-tight">
                            {bids?.data?.length} Bids
                          </p>
                        </div>
                      </Link>
                      <RightDrawer
                        isOpen={bidHistoryOpen}
                        onClose={() => setBidHistoryOpen(false)}
                        style="w-1/2"
                      >
                        {!bidLoading && <BidHistory bids={bids?.data ?? []} />}
                      </RightDrawer>
                    </>
                  )}
                {/* Bid History End */}
              </div>
            </div>
            {/* Load Views, Backhauls and Related Truck End  */}

            {!loader &&
              details?.data?.loadBooking &&
              Object.keys(details?.data?.loadBooking)?.length > 0 && (
                <div className="flex gap-5">
                  <div className="bg-white rounded-lg shadow w-[45%]">
                    <BookingDetails
                      details={details?.data?.loadBooking}
                      finalRate={`${currency} ${flatRate}`}
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow w-[55%]">
                    <StatusTimeline
                      bookingId={details?.data?.loadBooking?.id}
                      mutate={mutate}
                      setIsDriverAssigned={setIsDriverAssigned}
                      directBook={directBook}
                    />
                  </div>
                </div>
              )}

            {!bidLoading && !loader && !Boolean(details?.data?.loadBooking) && (
              <BidsList bids={bids} />
            )}
          </div>
          {/* Right Section End */}
        </div>
      )}
    </div>
  );
};
export default SearchLoadDetails;
