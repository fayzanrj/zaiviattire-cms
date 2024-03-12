import { z } from "zod";

export const CategoryFormSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  href: z
    .string()
    .min(1, "Password is required")
    .regex(/^[A-Za-z0-9]+$/, "Please enter only alphabets and numbers"),
});

export type CategoryFormInputType = z.infer<typeof CategoryFormSchema>;
