import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import OrderList from "@/components/orders/OrderList";
import fetchAllOrders from "@/libs/FetchAllOrders";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Orders",
};

const Page = async () => {
  const data = await getServerSession(authOptions);
  //@ts-ignore
  const accessToken = data?.user.accessToken;
  // Fetching orders
  const orders = await fetchAllOrders(accessToken);

  // If orders are not fetched
  if (orders === undefined) {
    return <ServerError />;
  }

  return (
    <div className="min-h-dvh">
      <OrderList
        orders={orders}
        variant="ALL_ORDERS"
        accessToken={accessToken}
      />
      <RefreshPage />
    </div>
  );
};

export default Page;
