import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IProductFAQ } from "@/types/public/product";

export const productFAQsService = createSupabaseService<
  IProductFAQ,
  ICreatePayload<IProductFAQ>,
  IUpdatePayload<IProductFAQ>,
  string
>({
  table: Query_Tables.product_faqs,
  keyField: "id",
  serviceName: "product_faqs",
});
