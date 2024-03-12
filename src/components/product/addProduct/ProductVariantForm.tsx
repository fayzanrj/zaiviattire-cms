import { ProductVariantProps } from "@/props/ProductProps";
import {
  ProductVariantInputType,
  ProductVariantSchema,
} from "@/utilities/ProductVariantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProductInputField from "./ProductInputField";
import ProductSelctionInput from "./ProductSelctionInput";

const inputfield: {
  label: string;
  type: "text" | "number";
  placeHolder: string;
  id: "colorName" | "colorHexCode" | "quantity" | "size";
}[] = [
  {
    label: "Color name",
    type: "text",
    id: "colorName",
    placeHolder: "e.g. white,black",
  },
  {
    label: "Color hex code",
    type: "text",
    id: "colorHexCode",
    placeHolder: "e.g. #ffffff, #000000",
  },
  {
    label: "Quantity",
    type: "number",
    id: "quantity",
    placeHolder: "e.g. 10,20,30",
  },
];

// Props
interface ProductVariantFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  variants: ProductVariantProps[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariantProps[]>>;
}

const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  setModal,
  setVariants,
  variants,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductVariantInputType>({
    resolver: zodResolver(ProductVariantSchema),
  });

  const processForm: SubmitHandler<ProductVariantInputType> = async (data) => {
    const { colorHexCode, colorName, quantity, size } = data;
    if (colorName && quantity && size && colorHexCode) {
      // Checking if a variant with the same color name, size, and hex code already exists
      const existingVariantIndex = variants.findIndex(
        (variant) =>
          variant.color.name.toLowerCase() === colorName.toLowerCase() &&
          variant.color.hexCode === colorHexCode &&
          variant.size === size
      );

      // If the variant exists, updating its quantity
      if (existingVariantIndex !== -1) {
        setVariants((prev) => {
          const updatedVariants = [...prev];
          updatedVariants[existingVariantIndex].quantity += quantity;
          return updatedVariants;
        });
      } else {
        // If the variant doesn't exist, add it to the variants array
        const variant: ProductVariantProps = {
          color: {
            hexCode: colorHexCode,
            name: colorName,
          },
          quantity,
          size,
        };

        setVariants((prev) => [...prev, variant]);
      }
      closeModal();
    }
  };

  // Fuction to close modal
  const closeModal = () => {
    setModal(false);
    document.body.style.overflowY = "auto";
  };

  return (
    <div className="absolute left-0 bottom-0 z-50 w-full h-dvh bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      <div className="CENTER w-96 p-4 bg-white rounded-md">
        {inputfield.map((field, index) => (
          <ProductInputField
            key={field.id}
            errors={errors}
            id={field.id}
            label={field.label}
            placeHolder={field.placeHolder}
            register={register}
            watch={watch}
            type={field.type}
          />
        ))}

        {/* Size */}
        <ProductSelctionInput
          control={control}
          errors={errors}
          label="Size"
          id="size"
        />

        {/* Buttons to cancel i.e. close modal and to add variant to variant list */}
        <div className="text-right my-2">
          <button className="py-2 px-5 " type="button" onClick={closeModal}>
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-stone-800 text-white rounded-lg"
            onClick={handleSubmit(processForm)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantForm;
