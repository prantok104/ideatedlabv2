import { useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Array of card items
  const cards = [
    { id: 1, date: "07", day: "Fri", from: "Los Angeles, CA", to: "Chicago, IL", details: ["TL", "Van", "54ft", "29 000 lbs"] },
    { id: 2, date: "08", day: "Sat", from: "New York, NY", to: "Miami, FL", details: ["TL", "Van", "40ft", "20 000 lbs"] },
    { id: 3, date: "09", day: "Sun", from: "Houston, TX", to: "Atlanta, GA", details: ["TL", "Van", "53ft", "30 000 lbs"] },
    { id: 4, date: "10", day: "Mon", from: "Dallas, TX", to: "Denver, CO", details: ["TL", "Van", "50ft", "28 000 lbs"] },
  ];

  // Detect screen size to determine whether it's mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile is defined as <= 768px
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Add listener on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  // Handle moving to the next card
  const goToNext = () => {
    const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle moving to the previous card
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full mb-20 mt-3">
      <div className="overflow-hidden">
        {/* Cards Wrapper */}
        <div
          className="flex transition-transform ease-out duration-300"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${
                isMobile ? "w-full" : "w-1/2"
              } flex-shrink-0 me-1 bg-gray-800 rounded-lg`}
            >
              <div className="text-white px-6 pt-4 pb-3 flex gap-3">
                {/* Date Section */}
                <div className="flex flex-col items-center mr-4 pt-2">
                  <div className="text-gray-400">{card.day}</div>
                  <div className="text-2xl font-bold">{card.date}</div>
                  <div className="text-gray-400">Jun</div>
                </div>

                {/* Icon and Route Info */}
                <div className="flex flex-col justify-between">
                  <div className="flex items-center mb-4">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="100" viewBox="0 0 15 60" fill="none">
                      <path d="M8 15V48" stroke="#fff" strokeLinecap="round" strokeDasharray="2 2" />
                      <circle cx="7.5" cy="0.5" r="7" stroke="#555555" />
                      <rect x="0.5" y="48.5" width="14" height="11" stroke="#73C002" />
                    </svg>

                    {/* Locations */}
                    <div className="ml-4">
                      <div className="text-xl mb-5">{card.from}</div>
                      <div className="text-gray-400">{card.to}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 px-6 justify-center pb-2">
                {card.details.map((detail, index) => (
                  <span key={index} className="bg-gray-700 text-white rounded-full px-3 py-2 text-xs">
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Indicator */}
      {currentIndex > 0 && (
        <button
          className={`absolute top-1/2 ${
            isMobile ? "left-2" : "left-[-30px]"
          } transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50`}
          onClick={goToPrev}
        >
          <MdArrowBackIos />
        </button>
      )}

      {/* Right Indicator */}
      {currentIndex < (isMobile ? cards.length - 1 : cards.length - 2) && (
        <button
          className={`absolute top-1/2 ${
            isMobile ? "right-2" : "right-[-30px]"
          } transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50`}
          onClick={goToNext}
        >
          <MdArrowForwardIos />
        </button>
      )}
    </div>
  );
};

export default CardCarousel;
