"use client";
import Image from "next/image";
import React, { useState } from "react";
import FullScreenImagePreview from "../addProduct/FullScreenImagePreview";

// Props
interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);
  return (
    <div className="p-4">
      {/* Product full image */}
      {isFullImageOpen && (
        <FullScreenImagePreview
          image={selectedImage}
          setModal={setIsFullImageOpen}
        />
      )}

      {/* Selected Image */}
      <div className="text-center w-full overflow-hidden">
        <Image
          src={selectedImage}
          width={1000}
          height={200}
          quality={100}
          alt="Image"
          className="w-72 h-72 cursor-pointer overflow-hidden object-cover mx-auto"
          onClick={() => setIsFullImageOpen(true)}
        />
      </div>

      {/* All images */}
      <div className="flex gap-2 flex-wrap justify-center my-3">
        {images.map((image, index) => (
          <button
            key={index}
            disabled={selectedImage === image}
            className="disabled:opacity-50"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt="alt"
              width={100}
              height={100}
              className="w-16 h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
