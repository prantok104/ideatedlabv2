import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  rating,
  totalStars = 5,
  starSize = 24,
  baseStyle = "text-gray-400",
  filledStyle = "text-yellow-500",
}) => {
  // Create an array representing the stars
  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fillPercentage = Math.min(Math.max((rating - i) * 100, 0), 100); // Calculate fill % for each star
    return fillPercentage;
  });

  return (
    <div className="flex items-center space-x-1">
      {stars.map((fill, i) => (
        <div
          key={i}
          className="relative"
          style={{ width: starSize, height: starSize }}
        >
          <FaStar size={starSize} className={baseStyle} />

          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${fill}%` }}
          >
            <FaStar size={starSize} className={filledStyle} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
