import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IProductSpec } from "@/types/public/product";

export const productSpecsService = createSupabaseService<
  IProductSpec,
  ICreatePayload<IProductSpec>,
  IUpdatePayload<IProductSpec>,
  number
>({
  table: Query_Tables.product_specs,
  keyField: "id",
  serviceName: "product_specs",
});
