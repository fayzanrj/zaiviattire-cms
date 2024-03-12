"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

// Props
interface GoBackProps {
  label: string;
  href: string;
}

const GoBack: React.FC<GoBackProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <button className="select-none">
        <ChevronLeftIcon className="h-5 w-5 text-black font-semibold inline-block align-middle" />
        <p className="align-middle inline-block font-semibold">{label}</p>
      </button>
    </Link>
  );
};

export default GoBack;
