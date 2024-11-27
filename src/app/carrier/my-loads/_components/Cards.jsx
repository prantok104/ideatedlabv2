import Button from "@/components/button/Button";
import RightDrawer from "@/components/rightDrawer/RightDrawer";
import apiClient from "@/lib/axios";
import { apiEndpoint } from "@/utils/api-endpoint";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const Cards = ({ onClick, active = null }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    data: allCards,
    isLoading: cardLoader,
    mutate,
  } = apiClient.useAxiosSWR(apiEndpoint.carrier.loadSummary, {});

  const colors = [
    "#DDEFFF",
    "#DDFFE1",
    "#DCFAFF",
    "#EFDDFF",
    "#bef36e",
    "#FFDDDE",
    "#FFF0DC",
    "#F1FFDD",
    "#c9d9e7",
    "#c6e6ca",
    "#bcd7db",
    "#d4c5e0",
    "#F1FFDD",
    "#d4c5e0",
    "#F1FFDD",
  ];

  return (
    <>
      <div className="flex justify-between">
        <div></div>
        <div>
          <Button
            variant="base"
            size="small"
            onClick={() => setOpenDrawer(true)}
          >
            Filter Loads
          </Button>
        </div>
      </div>

      <RightDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style="w-[40%]"
      >
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 px-4 py-6 mt-5">
          {allCards?.data &&
            allCards?.data.map((card, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                style={{
                  backgroundColor: `${colors[index]}`,
                  border: active === card.type ? "2px solid #73C002" : "none",
                }}
              >
                {/* Radio Button (Circle) */}
                <input
                  type="radio"
                  checked={active === card.type}
                  onChange={() => {
                    onClick(card.type, card.type); // Trigger the onClick callback
                    setOpenDrawer(false); // Close the drawer after selecting
                  }}
                  className="w-6 h-6 border-2 rounded-full cursor-pointer"
                />
                {/* Text (Inline with count) */}
                <div className="flex flex-col items-start">
                  <div className="text-[#637381] text-xs font-medium">
                    {card?.type}
                  </div>
                  <div className="text-[#1c252e] text-lg font-semibold">
                    {card?.count}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </RightDrawer>
    </>
  );
};

export default Cards;
