import GoBack from "@/components/GoBack";
import NotFoundError from "@/components/NotFoundError";
import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import EditDeleteButtons from "@/components/product/productDetails/EditDeleteButtons";
import ProductImages from "@/components/product/productDetails/ProductImages";
import fetchProduct from "@/libs/FetchProduct";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Product Details",
};

// Props
interface DetailsProps {
  params: { productId: string };
}

const Details: React.FC<DetailsProps> = async ({ params }) => {
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

  // Destructuring
  const {
    productTitle,
    productId,
    category,
    composition,
    designId,
    id,
    gsm,
    price,
    gender,
    productDesc,
    productImages,
    variants,
    washCare,
    createdAt,
    updatedAt,
  } = product;

  return (
    <div className="p-10">
      {/* Go back Button */}
      <GoBack label="Products" href="/dashboard/products" />

      {/* Edit and delete buttons */}
      <EditDeleteButtons id={id} productId={productId} />

      <div className="grid grid-cols-2 min-h-96">
        {/* Section 1 */}
        <section>
          {/* Product title */}
          <h1 className="text-4xl font-semibold break-words">{productTitle}</h1>

          <table className="my-6">
            <tbody>
              {/* Price */}
              <ProductDescItem label="Price" value={`PKR ${price}/-`} />
              {/* Product ID */}
              <ProductDescItem label="Product ID" value={productId} />
              {/* Design ID */}
              <ProductDescItem label="Design ID" value={designId} />
              {/* Category */}
              <ProductDescItem label="Category" value={category} />
              {/* Gender */}
              <ProductDescItem label="Gender" value={gender} />
              {/* GSM */}
              <ProductDescItem label="GSM" value={gsm} />
              {/* Composition */}
              <ProductDescItem label="Composition" value={composition} />
              {/* Description */}
              <ProductDescItem label="Description" value={productDesc} />
              {/* Wash Care */}
              <ProductDescItem label="Wash Care" value={washCare} />

              {/* created At */}
              <ProductDescItem
                label="Added on"
                value={createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
              />
              {/* updated At */}
              <ProductDescItem
                label="Updated on"
                value={updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}
              />
            </tbody>
          </table>
        </section>

        {/* Section 2 */}
        <section>
          <ProductImages images={productImages} />
        </section>
      </div>

      {/* Variants */}
      <section className="w-[30rem] my-10">
        <h3 className="text-xl ml-1 font-semibold">Variants</h3>
        {/* Variants */}
        <table className="w-full text-center">
          <thead>
            <tr className="border">
              <th className="border-2">Color</th>
              <th className="border-2">Hex Code</th>
              <th className="border-2">Quantity</th>
              <th className="border-2">Size</th>
            </tr>
          </thead>
          <tbody>
            {variants?.map((variant, index) => (
              <tr key={index}>
                <td className="border-2">{variant.color.name}</td>
                <td className="border-2">{variant.color.hexCode}</td>
                <td className="border-2">{variant.quantity}</td>
                <td className="border-2">{variant.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Page to fetch latest data always without actually refreshing the page */}
      <RefreshPage />
    </div>
  );
};

export default Details;

// Prouct Description item component's props
interface ProductDescItemProps {
  label: string;
  value: string;
}

// Prouct Description item component
const ProductDescItem: React.FC<ProductDescItemProps> = ({ label, value }) => (
  <tr>
    <th className="px-2 align-top">{label}</th>
    <td className="px-2">{value}</td>
  </tr>
);
