"use client";
import fetchAllOrders from "@/libs/FetchAllOrders";
import fetchOrdersByStatus from "@/libs/FetchOrdersByStatus";
import { handleApiError } from "@/libs/handleApiError";
import { OrderProps, orderStatusProps } from "@/props/OrderProps";
import React, { useState } from "react";
import PageHeading from "../PageHeading";
import ScreenLoader from "../ScreenLoader";
import SearchBar from "../SearchBar";
import ServerError from "../ServerError";
import OrderListItem from "./OrderListItem";

interface OrderListProps {
  orders: OrderProps[];
  variant: "ALL_ORDERS" | "ORDERS_BY_STATUS";
  status?: orderStatusProps;
  accessToken: string;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  variant,
  status,
  accessToken,
}) => {
  const [allOrders, setAllOrders] = useState<OrderProps[]>(orders);
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>(orders);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to filter orders based on search text input
  const searchOrders = (keyword: string) => {
    if (keyword) {
      const filtered = allOrders.filter((order: OrderProps) =>
        order.orderId.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(allOrders);
    }
  };

  // Function to refresh orders list
  const refreshOrders = async () => {
    try {
      setIsLoading(true);
      const orders =
        variant === "ORDERS_BY_STATUS" && status
          ? await fetchOrdersByStatus(status, accessToken)
          : await fetchAllOrders(accessToken);
      if (orders) {
        setAllOrders(orders);
        setFilteredOrders(orders);
      } else {
        setError(true);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If there is an error
  if (error) {
    return <ServerError />;
  }

  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Page Header */}
      <PageHeading
        label="Orders"
        refreshFunction={refreshOrders}
        variant="SELECTION"
      />

      <div className="px-10 py-16">
        {/* Search input */}
        <SearchBar filterResults={searchOrders} placeholder="Search an order" />

        {/* Orders list */}
        <div className="w-fit flex justify-around gap-2 flex-wrap my-10">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderListItem key={order.orderId} {...order} />
            ))
          ) : (
            <div className="text-center mx-auto">
              <h3 className="font-semibold text-3xl text-center w-fit">
                No orders found
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;
