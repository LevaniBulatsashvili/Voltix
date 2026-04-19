import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { IUpdatePayload } from "@/types/common/api";
import type { IImage } from "@/types/public/product";

export const productImagesService = createSupabaseService<
  IImage,
  Pick<IImage, "product_id" | "image_url">,
  IUpdatePayload<IImage>,
  number
>({
  table: Query_Tables.product_images,
  keyField: "id",
  serviceName: "product_image",
  selectFieldOptions: {
    createSelectField: "id, product_id, image_url, created_at",
  },
});
