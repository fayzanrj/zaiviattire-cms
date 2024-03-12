"use client";
import getAccessToken from "@/hooks/useAccessToken";
import { handleApiError } from "@/libs/handleApiError";
import CategoryProps from "@/props/CategoryProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "./CategoryForm";

// Props
interface EditCategoryModalProps {
  category: CategoryProps;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  setIsEditModalOpen,
  setCategories,
  setIsLoading,
}) => {
  const accessToken = getAccessToken();

  // Function to update category
  const updateCategory = async (displayName: string, href: string) => {
    try {
      setIsEditModalOpen(false);
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/api/category/updateCategory/${category.id}`,
        {
          displayName,
          href,
          page: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );

      toast.success(res.data.message);
      setCategories((prev: CategoryProps[]) => {
        const updatedList = [...prev];
        const index = prev.findIndex(
          (categoryItem) => categoryItem.id === category.id
        );

        updatedList[index].displayName = displayName;
        updatedList[index].href = href;
        return updatedList;
      });
      setIsEditModalOpen(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.scrollTop = 0;

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.4)] ">
      <div className="absolute left-0 top-0 z-50 w-full h-dvh flex justify-center items-center">
        <CategoryForm
          variant="EDIT"
          formSubmitFunction={updateCategory}
          displayName={category.displayName}
          href={category.href}
          setModal={setIsEditModalOpen}
        />
      </div>
    </div>
  );
};

export default EditCategoryModal;

/*<form
        className="CENTER min-w-96 w-5/12 p-4 bg-white shadow-xl rounded-lg drop-shadow-lg"
        onSubmit={updateCategory}
      >
        <h2 className="text-center py-2 text-2xl font-bold">Update Category</h2>
        <InputField
          label="Display Name"
          placeholder="e.g. Tees, Graphic Tees"
          value={displayName}
          onChange={setDisplayName}
          required
        />
        <InputField
          label="Href (path)"
          placeholder="e.g. /tees, /graphic tees"
          value={href}
          onChange={setHref}
          required
        />

        <div className="text-right my-2">
          <button
            type="button"
            className="py-2 px-5 "
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-stone-800 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </form>*/
