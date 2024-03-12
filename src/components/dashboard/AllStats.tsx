"use client";
import { StatsProps } from "@/props/StatsProps";
import React, { useState } from "react";
import ScreenLoader from "../ScreenLoader";
import PageHeading from "../PageHeading";
import fetchStats from "@/libs/FetchStats";
import { handleApiError } from "@/libs/handleApiError";
import ServerError from "../ServerError";

// Props
interface AllStatsProps {
  fetchedStats: StatsProps;
  accessToken: string;
}

const AllStats: React.FC<AllStatsProps> = ({ fetchedStats, accessToken }) => {
  // States
  const [stats, setStats] = useState<StatsProps>(fetchedStats);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Function to refresh stats
  const refreshStats = async () => {
    try {
      setIsLoading(true);
      const newStats = await fetchStats(accessToken);
      if (newStats) {
        setStats(newStats);
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

      {/* Page header */}
      <PageHeading
        label={"Dashboard"}
        refreshFunction={refreshStats}
        variant="HEADER"
      />

      <div className="px-10 py-16">
        {/* Orders Section */}
        <section className="my-10">
          <h3 className="text-xl font-semibold">Orders</h3>
          <div className="flex gap-4 flex-wrap my-3">
            <StatItem
              label="Total Orders"
              value={stats.orders.totalOrders}
              note="Including cancelled"
            />
            <StatItem
              label="Processing Orders"
              value={stats.orders.processingOrders}
            />

            <StatItem label="Pending Order" value={stats.orders.pendingOrder} />

            <StatItem
              label="Confirmed Orders"
              value={stats.orders.confirmedOrders}
            />

            <StatItem
              label="Dispatched Orders"
              value={stats.orders.dispatchedOrders}
            />

            <StatItem
              label="Delivered Orders"
              value={stats.orders.deliveredOrders}
            />

            <StatItem
              label="Cancelled Orders"
              value={stats.orders.cancelledOrders}
            />
          </div>
        </section>

        {/* Sales and Products section */}
        <section className="my-10">
          <h3 className="text-xl font-semibold">Sales & Products</h3>
          <div className="flex gap-4 flex-wrap my-3">
            <StatItem
              label="Total Sales"
              note="PKR"
              value={stats.sales.totalSales}
            />
            <StatItem
              label="Total Orders"
              value={stats.sales.totalOrders}
              note="excluding cancelled"
            />
            <StatItem
              label="Total Products"
              value={stats.products.totalProducts}
            />
          </div>
        </section>

        {/* Categories section */}
        <section className="my-10">
          <h3 className="text-xl font-semibold">Categories</h3>
          <div className="flex gap-4 flex-wrap my-3">
            {stats.categories.map((category) => (
              <StatItem
                key={category.id}
                label={category.displayName}
                note="Number of products"
                value={category.productCount}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllStats;

// Stat Item component props
interface StatItemProps {
  label: string;
  value: string | number;
  note?: string;
}

// Stat Item component
const StatItem: React.FC<StatItemProps> = ({ label, value, note }) => (
  <div className="w-56 h-40 py-3 px-3 shadow-md border rounded-lg relative">
    <p className="font-semibold">{label}</p>
    {note && <p className="text-xs">({note})</p>}
    <p className="text-4xl CENTER ">{value}</p>
  </div>
);
