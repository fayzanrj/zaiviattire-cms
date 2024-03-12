"use effect";
import fetchCategories from "@/libs/FetchCategories";
import { handleApiError } from "@/libs/handleApiError";
import CategoryProps from "@/props/CategoryProps";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useLayoutEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface ProductSizeGenderInputProps {
  control: any;
  errors: any;
  label: "Gender" | "Size" | "Category";
  id: "gender" | "size" | "category";
}

const ProductSelctionInput: React.FC<ProductSizeGenderInputProps> = ({
  control,
  errors,
  label,
  id,
}) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  // Function to get all categories to select from
  const getCategories = async () => {
    try {
      if (id === "category") {
        const newCategories = await fetchCategories();
        setCategories(newCategories);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Use layout to fetch categories
  useLayoutEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mx-auto mb-3">
      <label className={"ml-1 font-semibold"} htmlFor={id}>
        {label}
        {id === "category" && (
          <button
            type="button"
            className="ml-0.5 h-full p-1 align-middle"
            onClick={getCategories}
          >
            <ArrowPathIcon className="h-4 w-4 text-black align-middle" />
          </button>
        )}
        {/* Error */}
        {errors[id]?.message && (
          <span className=" text-sm font-semibold text-red-400">
            ({errors[id].message})
          </span>
        )}
      </label>
      <br />
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <select
            id={id}
            {...field}
            className="my-1 py-2 px-3 w-full border rounded-md"
          >
            {/* Gender options */}
            {id === "gender" && (
              <>
                <option value="">Select a category....</option>
                <option value="men">Men</option>
                <option value="woman">Women</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="unisex">Unisex</option>
              </>
            )}
            {/* Size options */}
            {id === "size" && (
              <>
                <option value="">Select size....</option>
                <option value={"S"}>S</option>
                <option value={"M"}>M</option>
                <option value={"L"}>L</option>
                <option value={"XL"}>XL</option>
              </>
            )}
            {/* Category options */}
            {id === "category" && (
              <>
                <option value="">Select a category....</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.href}>
                    {category.displayName}
                  </option>
                ))}
              </>
            )}
          </select>
        )}
      />
    </div>
  );
};
export default ProductSelctionInput;
