import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { ICategory } from "@/types/product";

export const categoryService = createSupabaseService<
  ICategory,
  ICreatePayload<ICategory>,
  IUpdatePayload<ICategory>,
  number
>({
  table: Query_Tables.categories,
  keyField: "id",
  serviceName: "category",
});
