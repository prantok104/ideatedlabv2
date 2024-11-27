"use client";

import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { LuUndo2 } from "react-icons/lu";
import { MdCall, MdMessage } from "react-icons/md";
import { RiDeleteBin6Line, RiDraftLine, RiHistoryFill } from "react-icons/ri";
import Map from "../../../../components/details/Map";
import { useState } from "react";
import RightDrawer from "../../../../components/rightDrawer/RightDrawer";
import Backhauls from "./_component/Backhauls";
import RelatedTrucksTable from "./_component/RelatedTrucksTable";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ButtonList from "@/components/details/ButtonList";
import TripCard from "@/components/details/TripCard";
import SpotRateCard from "@/components/details/SpotRateCard";
import EquipmentDetailsCard from "@/components/details/EquipmentDetailsCard";
import ContactDetailsCard from "@/components/details/ContactDetailsCard";
import { buttonData } from "@/utils/home-static-data";
import {
  contactDetails,
  dataSet,
  equipmentDetails,
} from "./_component/TemporaryData";
import BidDataList from "./_component/BidDataList";
import PostedDetails from "@/components/details/PostedDetails";
import BidHistory from "./_component/BidHistory";
import Image from "next/image";
import AVATAR from "../../../../../public/asset/user-avatar.png";
import BookingDetails from "./_component/BookingDetails";
import StatusTimeline from "./_component/StatusTimeline";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import dayjs from "dayjs";
import CommditiesDetailsCard from "@/components/details/Commdities";
import ShipmentDetailSkeleton from "./_component/ShipmentDetailSkeleton";
import MapComponent from "./_component/MapComponent";
import ReactMapMarker from "./_component/ReactMapMarker";
import { VIEW_SHIPMENT } from "@/utils/permission";
import WithAuthorization from "@/app/HigherOrderComponents/WithAuthorization";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import Swal from "sweetalert2";
import { HTTP_OK } from "@/utils/static-const";
import { notify, NOTIFY_MESSAGE_ERROR } from "@/utils/helper";
import BidsList from "./_component/BidsList";
import RightSideDrawer from "@/components/rightDrawer/RightSideDrawer";
import Messages from "@/components/chats/Messages";

const ShipmentDetails = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [relatedTruckOpen, setRelatedTruckOpen] = useState(false);
  const [backhaulsOpen, setBackhaulsOpen] = useState(false);
  const [bidHistoryOpen, setBidHistoryOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [isDriverAssigned, setIsDriverAssigned] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const router = useRouter();

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

  const handleNavigation = async (routeName) => {
    switch (routeName) {
      case "Draft":
        await handleDarft();
        break;
      case "Edit":
        router.push(`/shipper/shipment/${id}/edit?page=${page}`);
        break;
      case "Duplicate":
        router.push(`/shipper/shipment/${id}/duplicate?page=${page}`);
        break;
      default:
        console.log("Action not found.");
        break;
    }
  };

  // Handle Draft
  const handleDarft = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change the post status to draft?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#73C002",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          id: id,
          shipmentStatus: "draft",
        };
        try {
          const responseData = await apiClient.post(
            apiEndpoint.shipment.default,
            payload
          );
          if (responseData?.status == HTTP_OK) {
            Swal.fire(
              "Status Changed!",
              "The post is now set to draft.",
              "success"
            );
          }
        } catch (error) {
          notify(error?.message, NOTIFY_MESSAGE_ERROR);
        }
      }
    });
  };

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

  // ! Bid list
  const {
    data: bids,
    isLoading: bidLoading,
    mutate: bidMutate,
  } = apiClient.useAxiosSWR(apiEndpoint.loadSearch.allBidding, {
    params: { loadId: id, page: 1, limit: 10 },
  });

  return (
    <div className="min-h-screen">
      {/* Header Section start */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold leading-7 text-[#141A21]">
          SR logistic Service
        </h1>
        <div className="flex items-center gap-2">
          {!loader &&
            details?.data?.loadBooking &&
            Object.keys(details?.data?.loadBooking)?.length > 0 && (
              <>
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
              </>
            )}

          <ButtonList
            buttonData={[
              {
                id: 1,
                icon: <RiDraftLine size={16} />,
                routeName: "Draft",
              },
              {
                id: 2,
                icon: <BiEditAlt size={16} />,
                routeName: "Edit",
              },
              {
                id: 3,
                icon: <RiDeleteBin6Line size={16} />,
                routeName: "Delete",
              },
              {
                id: 4,
                icon: <HiOutlineDuplicate size={16} />,
                routeName: "Duplicate",
              },
            ]}
            handleNavigation={handleNavigation}
          />
        </div>
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
              id={id}
              mutate={mutate}
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
                      // !those fields new added by antu
                      { label: " Bol Number ", value: receiverBOLNumber },
                      { label: " Receiver Name ", value: receiverName },
                      { label: " Receiver Phone ", value: receiverPhone },
                      { label: " Receiver Email ", value: receiverEmail },
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
                  className="flex h-14 px-4 py-2 items-center bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                >
                  <IoEyeOutline size={24} className="text-[#637381]" />
                  <div className="ml-2 w-28">
                    <p className="text-[#454f5b] text-sm font- font-['Inter'] leading-tight">
                      Views
                    </p>
                    <p className="text-[#919eab] text-xs font-normal font-['Public Sans'] leading-tight">
                      10 Load Views
                    </p>
                  </div>
                </Link>
                {/* Load Views End */}

                {/* Backhauls(Possible Loads) Start */}
                <Link
                  href="#"
                  className="flex h-14 px-4 py-2 items-center bg-white rounded-lg"
                  style={{ boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.05)" }}
                  onClick={() => setBackhaulsOpen((prev) => !prev)}
                >
                  <LuUndo2 size={24} className="text-[#637381]" />
                  <div className="ml-2 w-28">
                    <p className="text-[#454f5b] text-sm font-medium font-['Inter'] leading-tight">
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
                          <p className="text-[#454f5b] text-sm font-medium font-['Inter'] leading-tight">
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

              {booking ? (
                <div>
                  <Link
                    href="#"
                    className="text-[#73C002] text-sm leading-6 font-semibold underline"
                    onClick={() => setRelatedTruckOpen((prev) => !prev)}
                  >
                    View 10 Related Truck{" "}
                  </Link>
                  <RightDrawer
                    isOpen={relatedTruckOpen}
                    onClose={() => setRelatedTruckOpen(false)}
                    style="w-[calc(100%_-_256px)]"
                  >
                    <RelatedTrucksTable />
                  </RightDrawer>
                </div>
              ) : (
                ""
              )}

              {isDriverAssigned && (
                <div className=" w-full ml-5 h-14 px-4 py-2 bg-white rounded-lg justify-between items-center gap-1 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <Image
                      src={AVATAR}
                      className="rounded-full border"
                      width={35}
                      height={35}
                      alt="Picture of the author"
                    />
                    <div className="justify-start items-start gap-1 inline-flex">
                      <div className="text-[#454f5b] text-xs font-medium font-['Public Sans'] leading-none">
                        Robin will deliver your shipment by truck
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#141A21] text-white p-2 rounded-full">
                      <MdCall size={16} />
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
                </div>
              )}
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
                    />
                  </div>
                </div>
              )}

            {!bidLoading && !loader && !Boolean(details?.data?.loadBooking) && (
              <BidsList bids={bids} bidMutate={bidMutate} mutate={mutate} />
            )}
          </div>
          {/* Right Section End */}
        </div>
      )}
    </div>
  );
};
export default WithAuthorization(ShipmentDetails, [VIEW_SHIPMENT]);
