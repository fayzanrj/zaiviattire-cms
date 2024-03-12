import { OrderProps, orderStatusProps } from "@/props/OrderProps";
import { handleApiError } from "./handleApiError";
import { StatsProps } from "@/props/StatsProps";

const fetchStats = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/stats/getStats`,
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
    return res.stats as StatsProps;
  } catch (error) {
    handleApiError(error);
    return undefined; // Returning empty array
  }
};

export default fetchStats;
