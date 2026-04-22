import { z } from "zod";

export const mainCategorySchema = z.object({
  name: z.string().min(1, "validation.required"),
  thumbnail: z.string().url("validation.invalid_url").or(z.literal("")),
});

export type MainCategoryFormData = z.infer<typeof mainCategorySchema>;

export const defaultMainCategoryForm: MainCategoryFormData = {
  name: "",
  thumbnail: "",
};
