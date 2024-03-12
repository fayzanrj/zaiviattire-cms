import { OrderProps } from "@/props/OrderProps";
import Link from "next/link";
import React from "react";

const OrderListItem: React.FC<OrderProps> = ({
  orderId,
  shippingInfo,
  status,
  total,
  createdAt,
}) => {
  // Customer's full name
  const name = shippingInfo.firstName + " " + shippingInfo.lastName;

  return (
    <div className="w-[22.5rem] h-56 p-4 rounded-xl border border-stone-200">
      {/* Order no. and place by */}
      <div className="h-[30%]">
        <h3 className="font-semibold text-2xl">Order#{orderId}</h3>
        <p className="text-stone-500 text-[0.9rem]">Placed by {name}</p>
      </div>

      <div className="h-1/2 py-2 text-sm">
        <table className="w-full">
          <tbody>
            {/* Order status */}
            <tr>
              <th className="text-left">Status</th>
              <td className="text-right">{status}</td>
            </tr>
            {/* Total bill */}
            <tr>
              <th className="text-left">Total</th>
              <td className="text-right">PKR {total}</td>
            </tr>
            {/* Date */}
            <tr>
              <th className="text-left">Placed on</th>
              <td className="text-right">
                {new Date(createdAt).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button to redirect to order details page */}
      <div className="h-[20%]">
        <Link href={`/dashboard/orders/orderDetails/${orderId}`}>
          <button className="w-full h-full bg-black text-white rounded-md text-left px-4">
            View Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderListItem;
