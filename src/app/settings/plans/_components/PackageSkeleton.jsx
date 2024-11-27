import React from "react";

const PackageSkeleton = () => {
  return (
    <div className="p-4 mx-auto w-[250px] h-[300px] bg-white rounded-lg shadow-lg">
      <div className="animate-pulse flex flex-col space-y-4 h-full justify-between">
        <div className="flex flex-col space-y-4">
          <div class="h-6 bg-gray-300 rounded w-3/4"></div>

          <div className="h-4 bg-gray-300 rounded w-1/2"></div>

          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="ml-2 h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="ml-2 h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="ml-2 h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PackageSkeleton;
