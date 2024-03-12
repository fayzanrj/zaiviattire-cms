import CategoryProps from "@/props/CategoryProps";
import { handleApiError } from "./handleApiError";
import toast from "react-hot-toast";
import { ProductProps } from "@/props/ProductProps";

const fetchAllProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/product/getAllProducts`,
      {
        cache: "no-store",
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );

    const res = await response.json();
    return res.products as ProductProps[];
  } catch (error) {
    handleApiError(error);
    return undefined; // Returning empty array
  }
};

export default fetchAllProducts;
