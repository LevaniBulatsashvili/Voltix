import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IProduct } from "@/types/public/product";

export const productService = createSupabaseService<
  IProduct,
  ICreatePayload<IProduct>,
  IUpdatePayload<IProduct>,
  number
>({
  table: Query_Tables.products,
  keyField: "id",
  serviceName: "products",
  selectFieldOptions: {
    fetchManySelectField: `
      *,
      main_category:main_category_id(id, name),
      category:category_id(name),
      brand:brand_id(id, name)
    `,
    fetchSelectField: `
      *,
      main_category:main_category_id(id, name),
      category:categories(id, name),
      brand:brands(id, name),
      product_specs(id, spec, value),
      product_images(id, image_url),
      product_faqs(id, question, answer)
    `,
    createSelectField: "*",
    updateSelectField: "*",
  },
});
