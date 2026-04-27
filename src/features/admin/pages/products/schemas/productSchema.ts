import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "validation.required"),
  description: z.string().min(1, "validation.required"),
  brand_id: z.coerce.number().min(1, "validation.required"),
  main_category_id: z.coerce.number().min(1, "validation.required"),
  category_id: z.coerce.number().min(1, "validation.required"),
  price: z.coerce.number().min(0, "validation.must_be_positive"),
  discount_percentage: z.coerce
    .number()
    .min(0, "validation.must_be_positive")
    .max(100, "validation.max_100"),
  stock: z.coerce.number().min(0, "validation.must_be_positive"),
  thumbnail: z.string().url("validation.invalid_url").or(z.literal("")),
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
