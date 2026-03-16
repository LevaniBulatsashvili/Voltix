import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be >= 0"),
  stock: z.number().min(0, "Stock must be >= 0"),
  currency: z.enum(["USD", "GEL", "EUR"]),
  discount: z.number().min(0).max(100),
  mainCategoryId: z.number().min(1, "Select main category"),
  mainCategoryName: z.string().min(1),
  categoryId: z.number().min(1, "Select sub category"),
  categoryName: z.string().min(1),
  rating: z.number().min(0).max(5),
  totalSold: z.number().min(0),
  specs: z.array(
    z.object({ key: z.string().min(1), value: z.string().min(1) }),
  ),
  thumbnail: z
    .any()
    .refine((files) => files?.length === 1, "Thumbnail is required"),
  images: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
