"use client";
import fetchCategories from "@/libs/FetchCategories";
import CategoryProps from "@/props/CategoryProps";
import React, { useState } from "react";
import PageHeading from "../PageHeading";
import ScreenLoader from "../ScreenLoader";
import CategoriesListItem from "./CategoriesListItem";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import useAccessToken from "@/hooks/useAccessToken";
import toast from "react-hot-toast";
import { handleApiError } from "@/libs/handleApiError";

interface ManageCategoriesProps {
  prevCategories: CategoryProps[];
}

const ManageCategories: React.FC<ManageCategoriesProps> = ({
  prevCategories,
}) => {
  const [categories, setCategories] = useState<CategoryProps[]>(prevCategories);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useAccessToken();
  const refreshCategories = async () => {
    try {
      setIsLoading(true);
      const newCategories = await fetchCategories();
      setCategories(newCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async (displayName: string, href: string) => {
    setIsLoading(true);
    const newCategory = { displayName, href, page: true };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/category/addCategory`,
        newCategory,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );
      setCategories((prev: CategoryProps[]) => [...prev, res.data.category]);
      toast.success(res.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Page Header */}
      <PageHeading
        label="Categories"
        refreshFunction={refreshCategories}
        variant="HEADER"
      />

      <div className="px-10 py-16">
        {/* Add new category form */}
        <CategoryForm formSubmitFunction={addCategory} variant="NEW" />

        {/* Categories list  */}
        <section className="my-6 ">
          <div className="relative">
            <h1 className="text-2xl font-semibold inline">All Categories</h1>
          </div>

          <div className="flex flex-wrap gap-2 my-2">
            {categories ? (
              categories.map((category) => (
                <CategoriesListItem
                  key={category.id}
                  {...category}
                  setIsLoading={setIsLoading}
                  setCategories={setCategories}
                />
              ))
            ) : (
              <p>Error fetching categories</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ManageCategories;
