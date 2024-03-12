import { z } from "zod";

export const productFormSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  designId: z.string().min(1, "Design ID is required"),
  productTitle: z.string().min(1, "Product title is required"),
  productDesc: z.string().min(1, "Product description is required"),
  category: z.string().min(1, "Category is required"),
  gender: z.string().min(1, "Category is required"),
  composition: z.string().min(1, "Composition is required"),
  gsm: z.string().min(1, "GSM is required"),
  washCare: z.string().min(1, "Wash care instructions are required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0, "Discount must be a positive number"),
});

export type ProductInputsType = z.infer<typeof productFormSchema>;
