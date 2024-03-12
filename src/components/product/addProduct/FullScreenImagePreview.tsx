"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect } from "react";

// Props
interface FullScreenImagePreviewProps {
  image: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FullScreenImagePreview: React.FC<FullScreenImagePreviewProps> = ({
  image,
  setModal,
}) => {
  // Function to close full screen
  const closeFullScreen = () => {
    setModal(false);
    document.body.style.overflowY = "auto";
  };

  // Use effect to make page unscrollable
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.scrollTop = 0;

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.9)]">
      <div className="absolute left-0 top-0 z-50 w-full h-dvh  flex justify-center items-center">
        <div className="relative">
          {/* Close button */}
          <button
            type="button"
            className="absolute -right-10 top-0"
            onClick={closeFullScreen}
          >
            <XMarkIcon className="h-8 w-8 text-white" />
          </button>

          {/* Image */}
          <Image
            src={image}
            alt="product image"
            width={1000}
            height={200}
            quality={100}
            className="w-[30rem] h-[30rem] object-cover aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenImagePreview;
