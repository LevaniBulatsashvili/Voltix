import { z } from "zod";

export const productSpecSchema = z.object({
  product_id: z.coerce.number().min(1, "validation.required"),
  spec: z.string().min(1, "validation.required"),
  value: z.string().min(1, "validation.required"),
});

export type ProductSpecFormData = z.infer<typeof productSpecSchema>;

export const defaultProductSpecForm: ProductSpecFormData = {
  product_id: 0,
  spec: "",
  value: "",
};
