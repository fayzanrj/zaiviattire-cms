"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/logo.png";
import { LogInInputType, logInFormSchema } from "@/utilities/logInFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError } from "@/libs/handleApiError";
import ScreenLoader from "../ScreenLoader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInInputType>({
    resolver: zodResolver(logInFormSchema),
  });

  const processForm: SubmitHandler<LogInInputType> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        username: data.username.toLowerCase(),
        password: data.password,
        redirect: false,
      });
      if (res && res.ok) {
        toast.success("Logged in");
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        toast.error("Please check your credential");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-[95%] sm:w-96 px-2 py-4 rounded-lg shadow-lg"
        onSubmit={handleSubmit(processForm)}
      >
        {/* Logo */}
        <Image
          src={logo}
          width={800}
          height={1000}
          quality={100}
          alt="logo"
          className="w-24 mx-auto"
        />

        <div className="my-3">
          <label htmlFor="username" className="font-semibold">
            Username{" "}
            {errors["username"]?.message && (
              <span className="text-xs text-red-600">
                ({errors["username"]?.message})
              </span>
            )}
          </label>
          <input
            id="username"
            placeholder="e.g. admin"
            {...register("username")}
            className="w-full p-2 outline-none border-2 rounded-lg"
          />
        </div>

        <div className="my-3">
          <label htmlFor="password" className="font-semibold">
            Password{" "}
            {errors["password"]?.message && (
              <span className="text-xs text-red-600">
                ({errors["password"]?.message})
              </span>
            )}
          </label>
          <input
            id="password"
            placeholder="e.g. ******"
            type="password"
            {...register("password")}
            className="w-full p-2 outline-none border-2 rounded-lg"
          />
        </div>

        <button className="w-full h-10 bg-black text-white rounded-lg my-2 text-lg relative">
          LOG IN
        </button>
      </form>
      {isLoading && <ScreenLoader />}
    </>
  );
};

export default LogInForm;
