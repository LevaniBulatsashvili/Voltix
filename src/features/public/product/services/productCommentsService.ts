import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IProductComment } from "@/types/public/product";

export const productCommentService = createSupabaseService<
  IProductComment,
  ICreatePayload<IProductComment>,
  IUpdatePayload<IProductComment>,
  string
>({
  table: Query_Tables.product_comments,
  keyField: "id",
  serviceName: "product_comments",
  selectFieldOptions: {
    fetchManySelectField:
      "id, comment, rating, created_at, verified, profile: profiles(avatar_url, full_name)",
  },
});
