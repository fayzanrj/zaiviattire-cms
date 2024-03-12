import GoBack from "@/components/GoBack";
import NotFoundError from "@/components/NotFoundError";
import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import ProductForm from "@/components/product/addProduct/ProductForm";
import fetchProduct from "@/libs/FetchProduct";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Update Product",
};

interface UpdatePageProps {
  params: { productId: string };
}

const UpdatePage: React.FC<UpdatePageProps> = async ({ params }) => {
  // Fetching product
  const product = await fetchProduct(params.productId);

  // If no product found
  if (product === null) {
    return (
      <NotFoundError>
        <Link href={"/dashboard/products/allProducts"}>
          <button className="p-0.5 px-6 text-lg border-2 rounded-full border-black">
            Go to All Products
          </button>
        </Link>
      </NotFoundError>
    );
  }

  // If there is an error in fetching
  if (product === undefined) {
    return <ServerError />;
  }

  return (
    <div className="">
      {/* Go back button */}
      <div className="pt-10 ml-10">
        <GoBack label="All Products" href={`/dashboard/products`} />
      </div>

      {/* Form */}
      <ProductForm formVariant="UPDATE PRODUCT" {...product} />
      <RefreshPage />
    </div>
  );
};

export default UpdatePage;
