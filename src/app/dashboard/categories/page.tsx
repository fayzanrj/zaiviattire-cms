import ManageCategories from "@/components/categories/ManageCategories";
import fetchCategories from "@/libs/FetchCategories";
import CategoryProps from "@/props/CategoryProps";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Categories",
};

const Page = async () => {
  // Fetching categories
  let categories: CategoryProps[] = await fetchCategories();

  return <ManageCategories prevCategories={categories} />;
};

export default Page;
