"use client";
import Image from "next/image";
import React from "react";
import errorImage from "@/assets/error.png";

const ServerError: React.FC = () => {
  return (
    <div className="pl-72 relative">
      <div className="h-dvh">
        <div className="CENTER text-center">
          <Image
            src={errorImage}
            width={1000}
            height={1000}
            quality={100}
            alt="Error"
          />
          <button
            className="p-0.5 px-6 text-lg border-2 rounded-full border-black"
            onClick={() => location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
