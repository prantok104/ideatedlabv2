"use client";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const Tab = ({
  tabs,
  loader,
  activeTab,
  onTabClick,
  dataCount,
  children,
  secondaryChildren,
}) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="mb-6">
          {tabs.map((tab,index) => (
            <button
              key={index}
              onClick={() => onTabClick(tab.id)}
              className={`flex-0 py-2 px-4 text-center ${
                activeTab === tab.id
                  ? "border-b-2 border-[#73C002] text-[#73C002] font-bold"
                  : "text-gray-500 hover:text-[#73C002] font-semibold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-2">
          {/* Additional elements like buttons or info can go here */}
        </div>
      </div>

      <div className="relative">
        <TransitionGroup>
          <CSSTransition
            key={activeTab}
            timeout={500} // Duration of fade effect
            classNames="tab-transition"
            unmountOnExit
          >
            <div className="tab-content pt-3">
              <div className="flex items-center justify-between">
                {loader ? (
                  <div className="bg-gray-300 rounded h-6 w-40 mb-[22px]"></div>
                ) : (
                  <h1 className="text-[#454f5b] text-lg font-semibold leading-normal mb-[22px]">
                    {dataCount}
                  </h1>
                )}
                <div>{secondaryChildren && secondaryChildren}</div>
              </div>

              {/* Main children */}
              <div>{children}</div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Tab;
