import { ProductProps } from "@/props/ProductProps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductListItem: React.FC<ProductProps> = ({
  productTitle,
  productImages,
  price,
  productId,
  designId,
  category,
  variants,
}) => {
  return (
    <div className="w-[30rem] min-h-56 border gap-2 p-2 mx-auto my-4 rounded-md flex items-center">
      {/* Product first image */}
      <Image
        src={productImages[0]}
        alt="alt"
        width={1000}
        height={100}
        className="min-w-48 w-48 min-h-48 h-48 object-cover rounded-md"
      />

      <div className="min-h-48 w-64 text-left">
        <h3 className="text-xl font-semibold">{productTitle}</h3>
        <table className="text-sm w-[97%] mx-auto my-2">
          <tbody>
            <tr>
              <th className="font-medium">Category</th>
              <td>{category}</td>
            </tr>
            <tr>
              <th className="font-medium">Product ID</th>
              <td>{productId}</td>
            </tr>
            <tr>
              <th className="font-medium">Design ID</th>
              <td>{designId}</td>
            </tr>
            <tr>
              <th className="font-medium">Price</th>
              <td>PKR {price}/-</td>
            </tr>
            <tr>
              <th className="font-medium">No. of variants</th>
              <td>{variants?.length}</td>
            </tr>
          </tbody>
        </table>

        {/* Button to redirect to product details page */}
        <div>
          <Link href={`/dashboard/products/details/${productId}`}>
            <button className="w-full h-full bg-black text-white rounded-md text-left px-4 py-1">
              See full Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
