"use client";
import fetchAllProducts from "@/libs/FetchAllProducts";
import { handleApiError } from "@/libs/handleApiError";
import { ProductProps } from "@/props/ProductProps";
import React, { useState } from "react";
import PageHeading from "../PageHeading";
import ScreenLoader from "../ScreenLoader";
import SearchBar from "../SearchBar";
import ServerError from "../ServerError";
import ProductListItem from "./ProductListItem";
import Link from "next/link";

// Props
interface ProductsListProps {
  products: ProductProps[];
  label: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, label }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<ProductProps[]>(products);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductProps[]>(products);
  const [error, setError] = useState<boolean>(false);

  // Function to filter orders based on search text input
  const searchProducts = (keyword: string) => {
    if (!keyword) {
      setFilteredProducts(allProducts);
      return;
    }

    const lowercaseKeyword = keyword.toLowerCase();
    const searchedProducts = allProducts.filter(
      (product) =>
        product.productId.toLowerCase().includes(lowercaseKeyword) ||
        product.designId.toLowerCase().includes(lowercaseKeyword) ||
        product.productTitle.toLowerCase().includes(lowercaseKeyword)
    );
    setFilteredProducts(searchedProducts);
  };

  const refreshProdcts = async () => {
    try {
      setIsLoading(true);
      const products = await fetchAllProducts();
      if (products) {
        setAllProducts(products);
        setFilteredProducts(products);
      } else {
        setError(true);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If there is an error in fetching
  if (error) {
    return <ServerError />;
  }
  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Page Header */}
      <PageHeading
        label={label}
        refreshFunction={refreshProdcts}
        variant="HEADER"
      />

      <div className="px-10 py-16">
        {/* Search input */}
        <SearchBar
          filterResults={searchProducts}
          placeholder="Search a product"
        />

        {/* Button to redirect to add new product page */}
        <div>
          <Link href={"/dashboard/products/addProduct"}>
            <button className="px-4  py-2.5 bg-stone-800 text-white uppercase rounded-lg float-right ">
              Add Product
            </button>
          </Link>
        </div>

        {/* Products list */}
        {filteredProducts?.length > 0 ? (
          <div
            className={`w-full flex flex-wrap justify-between text-center my-3.5`}
          >
            {filteredProducts?.map((product) => (
              <ProductListItem key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center my-10">
            <p className="text-2xl">No products found!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
