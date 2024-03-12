import RefreshPage from "@/components/RefreshPage";
import ServerError from "@/components/ServerError";
import AllStats from "@/components/dashboard/AllStats";
import fetchStats from "@/libs/FetchStats";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const Dashboard = async () => {
  const data = await getServerSession(authOptions);
  //@ts-ignore
  const accessToken = data?.user.accessToken;
  const stats = await fetchStats(accessToken);

  if (stats === undefined) {
    return <ServerError />;
  }

  return (
    <div className="min-h-dvh">
      <AllStats fetchedStats={stats} accessToken={accessToken} />
      <RefreshPage />
    </div>
  );
};

export default Dashboard;
