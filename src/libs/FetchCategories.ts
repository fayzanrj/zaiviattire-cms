import CategoryProps from "@/props/CategoryProps";
import { handleApiError } from "./handleApiError";
import toast from "react-hot-toast";

// Function to fetch categories from the API
const fetchCategories = async (): Promise<CategoryProps[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/category/getAllCategories`,
      {
        cache: "no-store",
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );

    const res = await response.json();

    return res.categories as CategoryProps[];
  } catch (error) {
    handleApiError(error);
    return []; // Returning empty array
  }
};

export default fetchCategories;
