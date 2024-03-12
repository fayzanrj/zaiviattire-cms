"use client";
import { ProductFormDataProps } from "@/props/ProductFormProps";
import React, { useState } from "react";

// Props
interface ProductInputFieldProps extends ProductFormDataProps {
  label: string;
  type: "number" | "text";
  placeHolder: string;
  id: string;
}

const ProductInputField: React.FC<ProductInputFieldProps> = ({
  errors,
  label,
  id,
  register,
  type,
  placeHolder,
}) => {
  return (
    <div className="mb-2">
      <div className="relative w-full mx-auto mb-1 text-left">
        {/* Label */}
        <label className={"ml-1 font-semibold"}>
          {label} {/* Input error message */}
          {errors[id]?.message && (
            <span className=" text-sm font-semibold text-red-400">
              ({errors[id].message})
            </span>
          )}
        </label>
        <br />

        {/* Input field */}
        <input
          className="my-1 py-2 px-3 w-full border rounded-md"
          type={type}
          {...register(id)}
          placeholder={placeHolder}
        />
        <br />
      </div>
    </div>
  );
};

export default ProductInputField;
