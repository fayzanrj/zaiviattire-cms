"use client";
import { signOut } from "next-auth/react";
import React from "react";

interface SignoutButtonProps {
  username: string;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({ username }) => {
  return (
    <section className="w-full absolute bottom-5 text-center">
      <div className="my-2">
        <p>
          Logged in as <span>{username}</span>{" "}
        </p>
      </div>
      <button
        onClick={() => signOut()}
        className="  bg-white border border-stone-300  w-11/12 rounded-md font-semibold uppercase py-2 "
      >
        Sign out
      </button>
    </section>
  );
};

export default SignoutButton;
