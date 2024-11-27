"use client"; 
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-red-600">Error 500</h1>
        <p className="text-lg text-gray-600">Something went wrong.</p>
        <p className="text-lg text-gray-600">
          Our team has been notified and we're working on it.
        </p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Try Again
        </button>
      </div>
    </div>
  );
}
