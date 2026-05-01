import { z } from "zod";

export const productFAQSchema = z.object({
  product_id: z.coerce.number().min(1, "validation.required"),
  question: z.string().min(1, "validation.required"),
  answer: z.string().min(1, "validation.required"),
});

export type ProductFAQFormData = z.infer<typeof productFAQSchema>;

export const defaultProductFAQForm: ProductFAQFormData = {
  product_id: 0,
  question: "",
  answer: "",
};
