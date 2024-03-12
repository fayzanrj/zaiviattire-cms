import GoBack from "@/components/GoBack";
import NotFoundError from "@/components/NotFoundError";
import ServerError from "@/components/ServerError";
import OrderActionButtons from "@/components/orders/OrderActionButtons";
import OrderDeleteButton from "@/components/orders/OrderDeleteButton";
import fetchOrder from "@/libs/FetchOrder";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Order Details",
};

// Props
interface OrderDetailsProps {
  params: { orderId: string };
}

const OrderDetails: React.FC<OrderDetailsProps> = async ({ params }) => {
  const data = await getServerSession(authOptions);
  //@ts-ignore
  const accessToken = data?.user.accessToken;
  // Fetching order
  const order = await fetchOrder(params.orderId, accessToken);

  // If no order found
  if (order === null) {
    return (
      <NotFoundError>
        <Link href={"/dashboard/orders"}>
          <button className="p-0.5 px-6 text-lg border-2 rounded-full border-black">
            Go to All Orders
          </button>
        </Link>
      </NotFoundError>
    );
  }

  // If there is a error fetcing order
  if (order === undefined) {
    return <ServerError />;
  }

  return (
    <div className="py-10">
      {/* Button to go back */}
      <div className="px-10">
        <GoBack href="/dashboard/orders" label="All Orders" />
      </div>

      {/* Order number and delete button*/}
      <div className="px-10 my-4 flex justify-between flex-wrap gap-2">
        <h1 className="text-4xl font-semibold">Order#{params.orderId}</h1>
        <OrderDeleteButton orderId={params.orderId} />
      </div>

      {/* Customer Information */}
      <section className="px-10 py-5 mt-5 border-b border-t ">
        <h3 className="text-xl font-semibold">Order Information</h3>
        <table className="w-full my-4 text-left">
          <tbody>
            <tr>
              <th className="w-1/2 font-medium">Order#</th>
              <td>{order.orderId}</td>
            </tr>
            <tr>
              <th className="w-1/2 font-medium">Order Status</th>
              <td>{order.status}</td>
            </tr>
            <tr>
              <th className="w-1/2 font-medium">Date & Time</th>
              <td>
                {new Date(order.createdAt).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <th className="w-1/2 font-medium">Last Updated on</th>
              <td>
                {new Date(order.updatedAt).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            {order.cancelReason && (
              <tr>
                <th className="w-1/2  font-medium align-top">
                  Cancellation Reason
                </th>
                <td>{order.cancelReason}</td>
              </tr>
            )}
            {order.trackingId && (
              <tr>
                <th className="w-1/2  font-medium align-top">Tracking Id</th>
                <td>{order.trackingId}</td>
              </tr>
            )}
            <tr>
              <th className="w-1/2 font-medium">Customer name</th>
              <td>
                {order.shippingInfo.firstName +
                  " " +
                  order.shippingInfo.lastName}
              </td>
            </tr>
            <tr>
              <th className="w-1/2  font-medium align-top">Contact</th>
              <td>
                <p>Email : {order.shippingInfo.email}</p>
                <p>Phone : {order.shippingInfo.phoneNumber}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Shipping Info */}
      <section className="px-10 py-5  border-b">
        <h3 className="text-xl font-semibold">Shipping Info</h3>
        <div className="my-4">
          <p>{order.shippingInfo.address}&#44;</p>
          <p>
            {order.shippingInfo.city}&#44;{order.shippingInfo.zip}
          </p>
        </div>
      </section>

      {/* Order Items */}
      <section className="px-10 py-5  border-b">
        <h3 className="text-xl font-semibold">Order Items</h3>
        <table className="w-full overflow-x-auto my-4">
          <thead>
            <th>Image</th>
            <th>Product ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Color/Size</th>
            <th>Quantity</th>
            <th>Total</th>
          </thead>
          <tbody>
            {order.orderItems.map((orderItem, index) => (
              <tr
                className="text-center"
                key={
                  orderItem.Product.productId +
                  orderItem.variant.size +
                  orderItem.variant.color.name
                }
              >
                <td className="">
                  <Image
                    src={orderItem.Product.productImages[0]}
                    alt="Product Image"
                    width={1000}
                    height={50}
                    quality={100}
                    className="w-16 h-16 overflow-hidden object-cover mx-auto"
                  />
                </td>
                <td>{orderItem.productId}</td>
                <td>{orderItem.Product.productTitle}</td>
                <td>PKR {orderItem.Product.price}/-</td>
                <td>
                  {orderItem.variant.color.name}/{orderItem.variant.size}
                </td>
                <td>{orderItem.variant.quantity}</td>
                <td>
                  PKR {orderItem.variant.quantity * orderItem.Product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="px-10 py-5">
        <h3 className="text-xl font-semibold">Order Total</h3>
        <table className="w-full my-4">
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={item.productId} className=" border-b h-24 py-2">
                <th className="text-left font-medium align-top py-1.5">
                  {item.variant.quantity}x {item.Product.productTitle}{" "}
                  <span className="text-sm">
                    ({item.variant.color.name} / {item.variant.size})
                  </span>
                </th>
                <td className="text-right">
                  <p>PKR {item.variant.quantity * item.Product.price}</p>
                  <p>- {item.discount}&#37;</p>
                  <p>
                    PKR{" "}
                    {item.discount === 0
                      ? item.variant.quantity * item.Product.price
                      : Math.ceil(
                          item.variant.quantity * item.Product.price -
                            (item.variant.quantity * item.Product.price) /
                              item.discount
                        )}
                  </p>
                </td>
              </tr>
            ))}
            <tr className="">
              <th className="text-left font-medium">Subtotal</th>
              <td className="text-right">PKR {order.total}</td>
            </tr>
            <tr>
              <th className="text-left font-medium">Delivery charges</th>
              <td className="text-right">PKR {250}</td>
            </tr>
            <tr>
              <th className="text-left font-bold text-lg">Total</th>
              <td className="text-right font-bold text-lg">
                PKR {order.total + 250}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Action Buttons */}
        <OrderActionButtons orderId={order.orderId} status={order.status} />
      </section>
    </div>
  );
};

export default OrderDetails;
