import { OrderProps } from "@/props/OrderProps";
import { handleApiError } from "./handleApiError";

const fetchAllOrders = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/order/getAllOrders`,
      {
        cache: "no-store",
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
      }
    );

    const res = await response.json();
    const orders = res.orders as OrderProps[];
    return orders;
  } catch (error) {
    handleApiError(error);
    return undefined; // Returning empty array
  }
};

export default fetchAllOrders;
