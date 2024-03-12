"use client";
import NotFoundError from "@/components/NotFoundError";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <NotFoundError>
      <Link href={"/"}>
        <button className="p-0.5 px-6 text-lg border-2 rounded-full border-black">
          Go Home
        </button>
      </Link>
    </NotFoundError>
  );
};

export default NotFound;
