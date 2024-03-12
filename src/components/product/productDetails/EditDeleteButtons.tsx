"use client";
import DeletionConfirmation from "@/components/DeletionConfirmation";
import ScreenLoader from "@/components/ScreenLoader";
import getAccessToken from "@/hooks/useAccessToken";
import { handleApiError } from "@/libs/handleApiError";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Props
interface EditDeleteButtonsProps {
  id: string;
  productId: string;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  productId,
  id,
}) => {
  const [isDeletionModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const accessToken = getAccessToken();

  // Function to delete a product
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/product/deleteProduct/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );
      toast.success(res.data.message);
      router.push("/dashboard/products");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4 text-right">
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Delete confirmation modal */}
      {isDeletionModalOpen && (
        <DeletionConfirmation
          handleDelete={handleDelete}
          setIsModalOpen={setIsDeleteModalOpen}
          note={`Deleting ProductID : ${productId} will also delete all the orders that are
            associated with this product. In order to delete this product you need to delete all the orders that has included this product.`}
          label={`ProductId#${productId}`}
        />
      )}

      {/* Button to redirect to edit product page */}
      <Link href={`/dashboard/products/updateProduct/${productId}`}>
        <button className="select-none mx-2">
          <p className="align-middle inline-block font-semibold">Edit </p>{" "}
          <PencilIcon className="h-4 w-4 text-black font-semibold inline-block align-middle" />
        </button>
      </Link>

      {/* Delete button */}
      <button
        className="select-none mx-2"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <p className="align-middle inline-block font-semibold">Delete</p>
        <TrashIcon className="h-4 w-4 text-black font-semibold inline-block align-middle" />
      </button>
    </div>
  );
};

export default EditDeleteButtons;
