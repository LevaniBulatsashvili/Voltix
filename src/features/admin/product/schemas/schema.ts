import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "required"),
  description: z.string().min(1, "required"),
  brand_id: z.coerce.number().min(1, "required"),
  main_category_id: z.coerce.number().min(1, "required"),
  category_id: z.coerce.number().min(1, "required"),
  price: z.coerce.number().min(0, "must_be_positive"),
  discount_percentage: z.coerce.number().min(0).max(100),
  stock: z.coerce.number().min(0, "must_be_positive"),
  thumbnail: z.string().url("invalid_url").or(z.literal("")),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const defaultProductForm: ProductFormData = {
  name: "",
  description: "",
  brand_id: 0,
  main_category_id: 0,
  category_id: 0,
  price: 0,
  discount_percentage: 0,
  stock: 0,
  thumbnail: "",
};
