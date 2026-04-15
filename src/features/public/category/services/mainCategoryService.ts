import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IMainCategory } from "@/types/public/product";

export const mainCategoryService = createSupabaseService<
  IMainCategory,
  ICreatePayload<IMainCategory>,
  IUpdatePayload<IMainCategory>,
  number
>({
  table: Query_Tables.main_categories,
  keyField: "id",
  serviceName: "main_category",
});
