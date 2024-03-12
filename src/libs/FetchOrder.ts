import React from "react";
import { handleApiError } from "./handleApiError";
import { OrderProps } from "@/props/OrderProps";

const fetchOrder = async (orderId: string, accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/order/getOrder/${orderId}`,
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
    if (res.order) {
      return res.order as OrderProps;
    } else {
      return null;
    }
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

export default fetchOrder;
