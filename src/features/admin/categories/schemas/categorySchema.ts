import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "validation.required"),
  main_category_id: z.coerce.number().min(1, "validation.required"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const defaultCategoryForm: CategoryFormData = {
  name: "",
  main_category_id: 0,
};
