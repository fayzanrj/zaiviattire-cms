import { OrderProps, orderStatusProps } from "@/props/OrderProps";
import { handleApiError } from "./handleApiError";

const fetchOrdersByStatus = async (
  status: orderStatusProps,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/order/getOrdersByStatus?status=${status}`,
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
    const orders = res as OrderProps[];
    return orders;
  } catch (error) {
    handleApiError(error);
    return undefined; // Returning empty array
  }
};

export default fetchOrdersByStatus;
