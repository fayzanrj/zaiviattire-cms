"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import FullScreenImagePreview from "./FullScreenImagePreview";

interface PreviewImageItemPros {
  image: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PreviewImageItem: React.FC<PreviewImageItemPros> = ({
  image,
  setImages,
}) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Function to delete image
  const deleteImage = () => {
    setImages((prev: string[]) =>
      prev.filter((imageUrl) => imageUrl !== image)
    );
  };

  // Function to enlarge image
  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  return (
    <>
      <div className=" my-2">
        <button
          type="button"
          className="w-32 h-32 rounded-md bg-stone-400 relative"
          onClick={openFullScreen}
        >
          <Image
            src={image}
            alt="product image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="object-cover aspect-square rounded-md"
          />
        </button>
        <br />
        {/* Image delete button */}
        <div className="min-h-12 text-center pt-2">
          <button
            type="button"
            className="mx-auto w-fit align-middle"
            onClick={deleteImage}
          >
            <TrashIcon className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
      {/* Full Screen Modal */}
      {isFullScreen && (
        <FullScreenImagePreview image={image} setModal={setIsFullScreen} />
      )}
    </>
  );
};

export default PreviewImageItem;
