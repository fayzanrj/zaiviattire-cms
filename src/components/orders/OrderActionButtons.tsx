"use client";
import useAccessToken from "@/hooks/useAccessToken";
import { handleApiError } from "@/libs/handleApiError";
import { orderStatusProps } from "@/props/OrderProps";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScreenLoader from "../ScreenLoader";
import OrderActionForm from "./OrderActionForm";

// Modal Props
interface ModalProps {
  isOpen: boolean;
  variant: "Cancelled" | "Dispatched";
}

// Props
interface OrderActionButtonsProps {
  orderId: string;
  status: orderStatusProps;
}

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  orderId,
  status,
}) => {
  const [currentStatus, setCurrentStatus] = useState<orderStatusProps>(status);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Modal props and state
  const [isModalOpen, setIsModalOpen] = useState<ModalProps>({
    isOpen: false,
    variant: "Dispatched",
  });
  const router = useRouter();
  const accessToken = useAccessToken();

  // Function to open modal
  const openModal = (variant: "Cancelled" | "Dispatched") => {
    setIsModalOpen({
      isOpen: true,
      variant,
    });
  };

  // Function to change order status to some new status
  const changeOrderStatus = async (
    newStatus: orderStatusProps,
    optionalParameter?: { cancelReason?: string; trackingId?: string }
  ) => {
    try {
      setIsLoading(true);
      // Scrolling to top
      document.documentElement.scrollTop = 0;

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/api/order/updateStatus/${orderId}?newStatus=${newStatus}`,
        {
          cancelReason: optionalParameter?.cancelReason,
          trackingId: optionalParameter?.trackingId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accessToken,
          },
        }
      );

      setCurrentStatus(newStatus);
      router.refresh();
      toast.success(response.data.message);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Setting current status
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <>
      {/* Loading screen */}
      {isLoading && <ScreenLoader />}

      {/* Modal Form for Cancellation Reason and tracking ID */}
      {isModalOpen.isOpen && (
        <OrderActionForm
          orderId={orderId}
          modal={isModalOpen}
          setModal={setIsModalOpen}
          changeOrderStatus={changeOrderStatus}
        />
      )}

      {/* Button to update order status to CANCELLED */}
      <div className="text-right mt-10">
        {currentStatus !== "Cancelled" && currentStatus !== "Delivered" && (
          <button
            type="button"
            className="py-3.5 px-7 text-lg mr-2"
            onClick={() => openModal("Cancelled")}
          >
            Cancel Order
          </button>
        )}

        {/* Button to update order status to PENDING */}
        {(currentStatus === "Processing" || currentStatus === "Cancelled") && (
          <>
            <button
              type="button"
              className="py-3.5 px-7 text-lg bg-black text-white rounded-md"
              onClick={() => changeOrderStatus("Pending")}
            >
              Accept Order
            </button>
          </>
        )}

        {/* Button to update order status to CONFIRMED */}
        {currentStatus === "Pending" && (
          <>
            <button
              type="button"
              className="py-3.5 px-7 text-lg bg-black text-white rounded-md"
              onClick={() => changeOrderStatus("Confirmed")}
            >
              Confirm Order
            </button>
          </>
        )}

        {/* Button to update order status to DISPATCHED */}
        {currentStatus === "Confirmed" && (
          <>
            <button
              type="button"
              className="py-3.5 px-7 text-lg bg-black text-white rounded-md"
              onClick={() => openModal("Dispatched")}
            >
              Dispatch Order
            </button>
          </>
        )}

        {/* Button to update order status to DELIVERED */}
        {currentStatus === "Dispatched" && (
          <>
            <button
              type="button"
              className="py-3.5 px-7 text-lg bg-black text-white rounded-md"
              onClick={() => changeOrderStatus("Delivered")}
            >
              Mark as Delivered
            </button>
          </>
        )}

        {/* Button to update order status BACK to DISPATCHED */}
        {currentStatus === "Delivered" && (
          <>
            <button
              type="button"
              className="py-3.5 px-7 text-lg bg-black text-white rounded-md"
              onClick={() => changeOrderStatus("Dispatched")}
            >
              Mark as Dispatched / Not delivered yet
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default OrderActionButtons;
