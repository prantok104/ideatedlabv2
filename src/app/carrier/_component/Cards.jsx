"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Cards = ({ cardData = [], columns = 4, gap = 5 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`}>
      {cardData.length === 0 ? (
        <Skeleton count={columns} />
      ) : (
        cardData.map((item) => (
          <div
            key={item.id}
            className="companies-card p-4 rounded-lg"
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="w-10 h-10 bg-white rounded flex justify-center items-center">
              <Image
                src={item.icon}
                alt={`${item.title} Icon`}
                width={20}
                height={20}
              />
            </div>
            <div className="text-gray-500 text-sm font-normal mt-4 leading-tight mb-2">
              {item.title}
            </div>
            <div className="text-gray-900 text-2xl font-semibold leading-tight">
              {item.count}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
