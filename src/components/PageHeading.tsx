import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
import OrdersFilter from "./orders/OrdersFilter";

// Props
interface PageHeadingProps {
  label: string;
  refreshFunction: () => void;
  variant: "HEADER" | "SELECTION";
}

const PageHeading: React.FC<PageHeadingProps> = ({
  label,
  refreshFunction,
  variant,
}) => {
  return (
    <header className="flex justify-between items-center fixed w-[calc(100%_-_18rem)] px-10 bg-white z-30 h-16 border-b border-stone-300">
      {variant === "HEADER" ? (
        <h1 className="text-4xl font-semibold">{label}</h1>
      ) : (
        <OrdersFilter />
      )}
      <div>
        <button
          className="py-1 px-3 bg-slate-200 rounded-md"
          onClick={refreshFunction}
        >
          <ArrowPathIcon className="h-5 w-5 text-black align-middle" />
        </button>
      </div>
    </header>
  );
};

export default PageHeading;
