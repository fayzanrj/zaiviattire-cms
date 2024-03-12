"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const OrdersFilter = () => {
  const router = useRouter();
  const path = usePathname();
  const pathNames = path.split("/");

  const [selectedStatus, setSelectedStatus] = useState(
    pathNames[pathNames.length - 1] === "orders"
      ? "/"
      : pathNames[pathNames.length - 1]
  );

  // Function to handle selection chaneg of select input
  const handleStatusChange = (event: React.FormEvent) => {
    // @ts-ignore
    const status = event.currentTarget?.value;
    setSelectedStatus(status); // Update the selected status state
    if (status === "/") {
      router.push("/");
    } else {
      router.push(`/dashboard/orders/ordersByStatus/${status}`);
    }
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleStatusChange}
      className="text-4xl font-semibold outline-none"
    >
      <option value="/" className="text-lg font-semibold">
        All Orders
      </option>
      <option value="Processing" className="text-lg font-normal">
        Processing Orders
      </option>
      <option value="Pending" className="text-lg font-normal">
        Pending Orders
      </option>
      <option value="Confirmed" className="text-lg font-normal">
        Confirmed Orders
      </option>
      <option value="Dispatched" className="text-lg font-normal">
        Dispatched Orders
      </option>
      <option value="Cancelled" className="text-lg font-normal">
        Cancelled Orders
      </option>
      <option value="Delivered" className="text-lg font-normal">
        Delivered Orders
      </option>
    </select>
  );
};

export default OrdersFilter;
