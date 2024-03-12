import GoBack from "@/components/GoBack";
import ProductForm from "@/components/product/addProduct/ProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a product",
};

const AddProduct = () => {
  return (
    <div className="">
      {/* Go back button */}
      <div className="pt-10 ml-10">
        <GoBack label="All Products" href={`/dashboard/products`} />
      </div>

      {/* Form */}
      <ProductForm formVariant="ADD PRODUCT" />
    </div>
  );
};

export default AddProduct;
