"use client";
import ScreenLoader from "@/components/ScreenLoader";
import { PRODUCT_FORM_FIELDS } from "@/constants/ProductFormFields";
import useAccessToken from "@/hooks/useAccessToken";
import { convertImagesToDataURLs } from "@/libs/BlobToURL";
import { handleApiError } from "@/libs/handleApiError";
import { ProductVariantProps } from "@/props/ProductProps";
import { ProductInputsType, productFormSchema } from "@/utilities/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImagesFields from "./ImagesFields";
import ProductInputField from "./ProductInputField";
import ProductSelctionInput from "./ProductSelctionInput";
import ProductVariants from "./ProductVariants";

// We are using same form to add and update product, so passing values in update form and also provided default empty values for add product

// Props
interface ProductFormProps {
  id?: string;
  productId?: string;
  designId?: string;
  productTitle?: string;
  productDesc?: string;
  category?: string;
  gender?: string;
  composition?: string;
  gsm?: string;
  washCare?: string;
  price?: number;
  discount?: number;
  variants?: ProductVariantProps[];
  productImages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  formVariant: "ADD PRODUCT" | "UPDATE PRODUCT";
}

const ProductForm: React.FC<ProductFormProps> = ({
  id,
  productId = "",
  designId = "",
  productTitle = "",
  productDesc = "",
  category = "",
  gender = "",
  composition = "",
  discount = 0,
  gsm = "",
  price = 0,
  productImages = [],
  washCare = "",
  variants = [],
  formVariant,
}) => {
  const [productImagesPreview, setProductImagesPreview] =
    useState<string[]>(productImages);
  const [allVariants, setAllVariants] =
    useState<ProductVariantProps[]>(variants);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAccessToken();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductInputsType>({
    resolver: zodResolver(productFormSchema),
  });

  // Function to handle submision event
  const processForm: SubmitHandler<ProductInputsType> = async (data) => {
    setIsLoading(true);
    // Scrolling to top
    document.documentElement.scrollTop = 0;
    // Parsing data and adding data to product
    const product = JSON.parse(JSON.stringify(data));
    product.variants = allVariants;
    product.productImages = productImagesPreview;

    // Converting all productImages
    if (product.productImages) {
      product.productImages = await convertImagesToDataURLs(
        product.productImages
      );
    }

    try {
      if (formVariant === "ADD PRODUCT") {
        const uploadResult = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/api/product/addProduct`,
          { product },
          {
            headers: {
              "Content-Type": "application/json",
              accessToken,
            },
          }
        );
        toast.success(uploadResult.data.message);

        reset();
        setProductImagesPreview([]);
        setAllVariants([]);
      } else {
        const uploadResult = await axios.put(
          `${process.env.NEXT_PUBLIC_HOST}/api/product/updateProduct/${id}`,
          { product },
          {
            headers: {
              "Content-Type": "application/json",
              accessToken,
            },
          }
        );
        toast.success(uploadResult.data.message);
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Setting values of input fields
  useEffect(() => {
    setValue("productId", productId);
    setValue("designId", designId);
    setValue("category", category);
    setValue("gender", gender);
    setValue("productTitle", productTitle);
    setValue("productDesc", productDesc);
    setValue("composition", composition);
    setValue("gsm", gsm);
    setValue("washCare", washCare);
    setValue("price", price);
    setValue("discount", discount);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      <div className="w-full">
        <form
          className="w-[30rem] mx-auto text-left p-4"
          onSubmit={handleSubmit(processForm)}
        >
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold mb-8">{formVariant}</h1>

          {/* Product Category select input */}
          <ProductSelctionInput
            id="category"
            label="Category"
            control={control}
            errors={errors}
          />

          {/* Gender select input */}
          <ProductSelctionInput
            label="Gender"
            id="gender"
            control={control}
            errors={errors}
          />

          {/* Input fields */}
          {PRODUCT_FORM_FIELDS.map((field) => (
            <div key={field.id}>
              {field.type !== "image" && (
                <ProductInputField
                  errors={errors}
                  id={field.id}
                  label={field.label}
                  register={register}
                  type={field.type}
                  placeHolder={field.placeHolder}
                  watch={watch}
                />
              )}
            </div>
          ))}

          {/* Images fields */}
          <ImagesFields
            productImagesPreview={productImagesPreview}
            setProductImagesPreview={setProductImagesPreview}
          />

          {/* Product Variants */}
          <ProductVariants
            variants={allVariants}
            setVariants={setAllVariants}
          />

          {/* Form submission button */}
          <button
            className="w-full py-2.5 bg-stone-800 text-white uppercase rounded-lg my-2"
            type="submit"
          >
            {formVariant}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
