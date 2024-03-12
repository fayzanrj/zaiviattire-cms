"use client";
import React, { useState } from "react";
import ProductVariantForm from "./ProductVariantForm";
import { ProductVariantProps } from "@/props/ProductProps";
import { TrashIcon } from "@heroicons/react/24/outline";

// Props
interface ProductVariantsComponentProps {
  variants: ProductVariantProps[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariantProps[]>>;
}

const ProductVariants: React.FC<ProductVariantsComponentProps> = ({
  setVariants,
  variants,
}) => {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  // Function to open variant form
  const openForm = () => {
    setIsFormOpened(true);
    document.body.style.overflowY = "hidden";
    // Scrolling to bottom
    document.body.scrollTop = document.body.scrollHeight;
    document.documentElement.scrollTop = document.body.scrollHeight;
  };

  // Function to remove a specific variant from the variant list
  const removeVariant = (variantToBeDeleted: ProductVariantProps) => {
    setVariants((prev: ProductVariantProps[]) => {
      const updated = prev.slice();

      const filtered = updated.filter(
        (variant) =>
          variant.color.name !== variantToBeDeleted.color.name ||
          variant.color.hexCode !== variantToBeDeleted.color.hexCode ||
          variant.size !== variantToBeDeleted.size
      );

      return filtered;
    });
  };

  return (
    <>
      <h3 className="ml-1 font-semibold">Variants</h3>
      {/* Variants */}
      <table className="w-full text-center">
        {/* Headings */}
        <thead>
          <tr className="">
            <th className="border-2">Color</th>
            <th className="border-2">Hex Code</th>
            <th className="border-2">Quantity</th>
            <th className="border-2">Size</th>
          </tr>
        </thead>
        {/* All variants */}
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index}>
              <td className="border-2">{variant.color.name}</td>
              <td className="border-2">{variant.color.hexCode}</td>
              <td className="border-2">{variant.quantity}</td>
              <td className="border-2">{variant.size}</td>
              {/* Button to remove variant from variant list */}
              <td>
                <button
                  className="ml-2"
                  type="button"
                  onClick={() => removeVariant(variant)}
                >
                  <TrashIcon className="h-6 w-6 text-black" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add new variant button */}
      <button
        type="button"
        className="w-36 py-2.5 bg-stone-800 text-white uppercase rounded-lg my-2"
        onClick={openForm}
      >
        Add Variant
      </button>

      {/* Product variant form */}
      {isFormOpened && (
        <ProductVariantForm
          setModal={setIsFormOpened}
          setVariants={setVariants}
          variants={variants}
        />
      )}
    </>
  );
};

export default ProductVariants;
