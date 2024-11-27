"use client";
import Image from "next/image";
import errorCode from "../../public/404.png";
import pageImage from "../../public/not-found.png";
import Button from "@/components/button/Button";
export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto text-center">
        {" "}
        {/* Added text-center to center the text */}
        <div className="mb-4">
          {" "}
          {/* Add margin-bottom to space the image */}
          <Image src={errorCode} alt="404" className="mx-auto" />{" "}
          {/* Center image using mx-auto */}
        </div>

        <div className="mb-4">
          {" "}
          {/* Add margin-bottom to space the image */}
          <Image src={pageImage} alt="404" className="mx-auto" />{" "}
          {/* Center image using mx-auto */}
        </div>

        <p className="text-[#637381] text-3xl font-semibold font-public-sans leading-10 mb-4 mt-10">Page Not Found</p>
        
        <div className="w-28 mx-auto">
          <Button variant="base" size="medium">
          Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
