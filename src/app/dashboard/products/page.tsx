import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import ProductsList from "@/components/product/ProductsList";
import fetchAllProducts from "@/libs/FetchAllProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const Page = async () => {
  // Fetching products
  const products = await fetchAllProducts();

  // If there is an error in fetching
  if (products === undefined) {
    return <ServerError />;
  }

  return (
    <div className="min-h-dvh">
      <ProductsList products={products} label="Products" />
      <RefreshPage />
    </div>
  );
};

export default Page;
