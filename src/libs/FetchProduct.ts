import { OrderProps, orderStatusProps } from "@/props/OrderProps";
import { handleApiError } from "./handleApiError";
import { ProductProps } from "@/props/ProductProps";

const fetchProduct = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/product/getProductByProductId/${productId}`,
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
    if (res.product) {
      return res.product as ProductProps;
    } else {
      return null;
    }
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

export default fetchProduct;
