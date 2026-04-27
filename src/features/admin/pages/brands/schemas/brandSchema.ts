import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "validation.required"),
  logo_url: z.string().url("validation.invalid_url").or(z.literal("")),
  website_url: z.string().url("validation.invalid_url").or(z.literal("")),
});

export type BrandFormData = z.infer<typeof brandSchema>;

export const defaultBrandForm: BrandFormData = {
  name: "",
  logo_url: "",
  website_url: "",
};
