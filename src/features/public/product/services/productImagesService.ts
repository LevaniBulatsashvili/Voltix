import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { IUpdatePayload } from "@/types/common/api";
import type { IProductImage } from "@/types/public/product";

export const productImagesService = createSupabaseService<
  IProductImage,
  Pick<IProductImage, "product_id" | "image_url">,
  IUpdatePayload<IProductImage>,
  number
>({
  table: Query_Tables.product_images,
  keyField: "id",
  serviceName: "product_images",
  selectFieldOptions: {
    createSelectField: "id, product_id, image_url, created_at",
  },
});
