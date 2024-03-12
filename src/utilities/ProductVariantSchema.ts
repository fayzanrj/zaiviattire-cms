import { z } from "zod";

export const ProductVariantSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),
  colorHexCode: z.string().min(1, "Color hex code is required"),
  size: z.string().min(1, "Size is required"),
  quantity: z.coerce.number().min(0, "Size is required"),
});

export type ProductVariantInputType = z.infer<typeof ProductVariantSchema>;
