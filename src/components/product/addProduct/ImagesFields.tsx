"use client";
import React, { useRef } from "react";
import AddImageButton from "./AddImageButton";
import PreviewImageItem from "./PreviewImageItem";

// PROPS
interface ImageUploaderProps {
  productImagesPreview: string[];
  setProductImagesPreview: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagesFields: React.FC<ImageUploaderProps> = ({
  productImagesPreview,
  setProductImagesPreview,
}) => {
  const productImageRef = useRef<HTMLInputElement>(null);

  // Function to add images to images list
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && productImagesPreview.length < 3) {
      const imagePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setProductImagesPreview((prev) => [...prev, ...imagePreviews]);
      // Clearing input
      if (productImageRef.current) {
        productImageRef.current.value = "";
      }
    }
  };

  return (
    <>
      {/* Product Images */}
      <section className="my-4">
        <label className="ml-1 font-semibold">Product Images</label>
        <br />
        {/* File input field */}
        <input
          type="file"
          className="sr-only select-none"
          ref={productImageRef}
          accept="image/png, image/gif, image/jpeg"
          multiple
          onChange={handleProductImageChange}
        />

        {/* Preview Images */}
        <div className="flex flex-wrap flex-row gap-2">
          {productImagesPreview.map((image, index) => (
            <PreviewImageItem
              key={image}
              image={image}
              setImages={setProductImagesPreview}
            />
          ))}

          {/* Showing add image if images are less than 5 */}
          {productImagesPreview.length < 5 && (
            <>
              <AddImageButton inputRef={productImageRef} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ImagesFields;
