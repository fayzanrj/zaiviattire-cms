"use client";
import React, { useEffect } from "react";
import Loader from "./Loader";

const ScreenLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 w-full h-full z-50 bg-[rgba(0,0,0,0.4)]">
      <div className="absolute left-0 top-0 z-50 w-full h-dvh ">
        <Loader />
      </div>
    </div>
  );
};

export default ScreenLoader;
