"use client";
const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center  bg-[#73c002]">
      <div className="loader">
        <div className="human-body">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="human-base">
            <span></span>
            <div className="human-face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
