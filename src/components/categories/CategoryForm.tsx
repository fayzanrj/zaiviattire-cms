"use client";
import {
  CategoryFormInputType,
  CategoryFormSchema,
} from "@/utilities/CategoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import CategoryProps from "@/props/CategoryProps";
import { handleApiError } from "@/libs/handleApiError";

interface CategoryFormProps {
  displayName?: string;
  href?: string;
  formSubmitFunction: (displayName: string, href: string) => void;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "NEW" | "EDIT";
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  displayName = "",
  href = "",
  variant,
  setModal,
  formSubmitFunction,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputType>({
    resolver: zodResolver(CategoryFormSchema),
  });

  const closeModal = () => {
    if (setModal) {
      setModal(false);
    }
  };

  const processForm: SubmitHandler<CategoryFormInputType> = async (data) => {
    try {
      await formSubmitFunction(data.displayName, data.href);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("displayName", displayName);
    setValue("href", href);
  }, []);

  return (
    <form
      className="rounded-lg w-[30rem] bg-white mx-auto text-left p-4"
      onSubmit={handleSubmit(processForm)}
    >
      <h2 className="text-center text-2xl font-semibold mt-2 mb-4">
        Add a new category
      </h2>

      <InputField
        errors={errors}
        register={register}
        watch={watch}
        id="displayName"
        label="Display name"
        placeHolder="e.g. Tees, Graphic Tees"
        type="text"
      />

      <InputField
        errors={errors}
        register={register}
        watch={watch}
        id="href"
        label="Href (path)"
        placeHolder="e.g. /tees, /graphicTees"
        type="text"
      />

      {variant === "NEW" && (
        <p className="my-2 text-wrap">
          * Adding a new category will add a new page to your store
        </p>
      )}

      {/* Form submission button */}
      {variant === "NEW" ? (
        <button
          type="submit"
          className="w-full text-lg py-2 bg-stone-800 text-white uppercase rounded-lg my-2"
        >
          Add new page
        </button>
      ) : (
        <div className="text-right my-2">
          <button type="button" className="py-2 px-5 " onClick={closeModal}>
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-stone-800 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
