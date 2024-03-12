"use client";
import { orderStatusProps } from "@/props/OrderProps";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  variant: "Cancelled" | "Dispatched";
};

// Props
interface OrderActionFormProps {
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
  modal: ModalProps;
  orderId: string;
  changeOrderStatus: (
    newStatus: orderStatusProps,
    optionalParameter?: { cancelReason?: string; trackingId?: string }
  ) => void;
}

const OrderActionForm: React.FC<OrderActionFormProps> = ({
  setModal,
  orderId,
  changeOrderStatus,
  modal,
}) => {
  const [textInput, setTextInput] = useState<string>("");

  // Use effetc to scrol to stop and make page unscrollable
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.scrollTop = 0;

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  // Function to close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      variant: "Cancelled",
    });
  };

  // Function to handle submission event
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    if (modal.variant === "Dispatched") {
      changeOrderStatus("Dispatched", { trackingId: textInput });
    } else if (modal.variant === "Cancelled") {
      changeOrderStatus("Cancelled", { cancelReason: textInput });
    }
  };

  return (
    <div className="absolute top-0 right-0 w-full h-full z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute top-0 right-0 w-full h-dvh z-50">
        <div className="CENTER z-50 w-96 bg-white shadow-md rounded-md p-6">
          {/* Modal close button */}
          <div className="text-right">
            <button onClick={closeModal}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {modal.variant === "Dispatched" ? (
              // Tracking ID input field
              <>
                <label className="font-semibold" htmlFor="trackingId">
                  Tracking Id{" "}
                  <span className="text-sm font-normal">
                    ({textInput.length}/50)
                  </span>
                </label>
                <input
                  className="w-full p-2 resize-none my-2 rounded-md outline-none border"
                  placeholder="Tracking ID"
                  id="trackingId"
                  maxLength={50}
                  value={textInput}
                  required
                  onChange={(e) => setTextInput(e.currentTarget.value)}
                />{" "}
              </>
            ) : (
              // Cancellation Reason input field
              <>
                <label className="font-semibold">
                  Reason for cancellation{" "}
                  <span className="text-sm font-normal">
                    ({textInput.length}/120)
                  </span>
                </label>
                <textarea
                  className="w-full h-32 p-2 resize-none my-2 rounded-md outline-none border"
                  placeholder="Start writing from here"
                  maxLength={120}
                  required
                  value={textInput}
                  onChange={(e) => setTextInput(e.currentTarget.value)}
                />
              </>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-black text-white"
            >
              {modal.variant === "Cancelled"
                ? `Cancel Order#${orderId}`
                : `Mark Order#${orderId} as Dispatched`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderActionForm;
