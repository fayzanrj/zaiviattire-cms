"use client";
import { handleApiError } from "@/libs/handleApiError";
import CategoryProps from "@/props/CategoryProps";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DeletionConfirmation from "../DeletionConfirmation";
import EditCategoryModal from "./EditCategoryModal";
import useAccessToken from "@/hooks/useAccessToken";

// Props
interface CategoriesListItemProps extends CategoryProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
}

const CategoriesListItem: React.FC<CategoriesListItemProps> = ({
  displayName,
  href,
  id,
  page,
  setIsLoading,
  setCategories,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const accessToken = useAccessToken();

  // Functiton to delete category
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/category/deleteCategory/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );
      setCategories((prev: CategoryProps[]) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success(res.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-64 h-40 shadow-lg bg-gray-200 rounded-md overflow-hidden text-center">
        <div className="min-h-8 text-right pt-1 px-2">
          {/* Edit button */}
          <button onClick={() => setIsEditModalOpen(true)}>
            <PencilSquareIcon className="h-6 w-6 text-black" />
          </button>
          {/* Delete buton */}
          <button className="ml-2" onClick={() => setIsDeleteModalOpen(true)}>
            <TrashIcon className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Category items */}
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">{displayName}</h3>
          <p className="text-sm">
            <a
              className="underline break-words"
              href={`${process.env.NEXT_PUBLIC_STORE_URL}/category/${href}`}
            >{`${process.env.NEXT_PUBLIC_STORE_URL}/category/${href}`}</a>
          </p>
        </div>
      </div>

      {/* Modal form to edit category */}
      {isEditModalOpen && (
        <EditCategoryModal
          category={{ displayName, id, href, page }}
          setIsLoading={setIsLoading}
          setCategories={setCategories}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}

      {/* Deletion confimation modal */}
      {isDeleteModalOpen && (
        <DeletionConfirmation
          setIsModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          note={`Deleting a category will also delete all the products that are
            associated with this category.`}
          label={displayName}
        />
      )}
    </>
  );
};

export default CategoriesListItem;
