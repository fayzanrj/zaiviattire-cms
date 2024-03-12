"use client";
import useAccessToken from "@/hooks/useAccessToken";
import { handleApiError } from "@/libs/handleApiError";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DeletionConfirmation from "../DeletionConfirmation";
import ScreenLoader from "../ScreenLoader";

// Props
interface OrderDeleteButtonProps {
  orderId: string;
}

const OrderDeleteButton: React.FC<OrderDeleteButtonProps> = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const router = useRouter();
  const accessToken = useAccessToken();

  // Function to delete an order
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/order/deleteOrder/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );
      toast.success(res.data.message);
      router.push("/dashboard/orders");
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Delete button */}
      <button
        type="button"
        className="bg-black text-white py-2 px-4 rounded-md"
        onClick={() => setIsConfirmationModalOpen(true)}
      >
        <p className="align-middle inline-block mr-1">Delete</p>
        <TrashIcon className="h-5 w-5 font-semibold inline-block align-middle" />
      </button>

      {/* Delete confimation modal */}
      {isConfirmationModalOpen && (
        <DeletionConfirmation
          handleDelete={handleDelete}
          setIsModalOpen={setIsConfirmationModalOpen}
          note={`Deleting Order#${orderId}? will delete all of it's records.`}
          label={`Order#${orderId}`}
        />
      )}
    </>
  );
};

export default OrderDeleteButton;
