import NotFoundError from "@/components/NotFoundError";
import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import OrderList from "@/components/orders/OrderList";
import fetchOrdersByStatus from "@/libs/FetchOrdersByStatus";
import { orderStatusProps } from "@/props/OrderProps";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Orders by status",
};

interface OrdersByStatusProps {
  params: { status: orderStatusProps };
}

const OrdersByStatus: React.FC<OrdersByStatusProps> = async ({ params }) => {
  const { status } = params;

  if (
    status !== "Processing" &&
    status !== "Pending" &&
    status !== "Confirmed" &&
    status !== "Dispatched" &&
    status !== "Cancelled" &&
    status !== "Delivered"
  ) {
    return (
      <NotFoundError>
        <Link href={"/orders/allOrders"}>
          <button className="p-0.5 px-6 text-lg border-2 rounded-full border-black">
            Go to All Orders
          </button>
        </Link>
      </NotFoundError>
    );
  }

  const data = await getServerSession(authOptions);
  //@ts-ignore
  const accessToken = data?.user.accessToken;
  // Fetching orders
  const orders = await fetchOrdersByStatus(status, accessToken);

  // If there is an error fetching
  if (orders === undefined) {
    return <ServerError />;
  }

  return (
    <div className="min-h-dvh">
      <OrderList
        orders={orders}
        variant="ORDERS_BY_STATUS"
        status={status}
        accessToken={accessToken}
      />
      <RefreshPage />
    </div>
  );
};

export default OrdersByStatus;
