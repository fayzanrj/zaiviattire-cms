"use client";
import React, { useEffect } from "react";

interface DeletionConfirmationProps {
  handleDelete: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  note: string;
}

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  setIsModalOpen,
  handleDelete,
  note,
  label,
}) => {
  const handleClick = () => {
    setIsModalOpen(false);
    handleDelete();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.scrollTop = 0;

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.4)]">
      <div className="absolute left-0 top-0 z-50 w-full h-dvh">
        <div className="CENTER w-96 p-4 bg-stone-200 shadow-xl rounded-xl drop-shadow-lg">
          {/* Heading */}
          <div className="pt-1 pb-3 border-b border-gray-400 text-left">
            <h3 className="text-xl font-semibold">Deletion Confirmation</h3>
          </div>

          {/* Note */}
          <div className="my-6 text-left">
            <p className="text-[0.94rem]">{note}</p>
            <p className="text-sm font-bold">This action is irreversible.</p>
          </div>

          {/* Buttons */}
          <div className="text-right">
            <button className="py-1 px-3" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button
              className="py-1.5 px-3 bg-red-600 text-white rounded-md"
              onClick={handleClick}
            >
              Delete {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
