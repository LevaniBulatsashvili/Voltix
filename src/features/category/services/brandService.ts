import { Query_Tables } from "../../../lib/react-query/configs";
import { createSupabaseService } from "../../../lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "../../../types/common/api";
import type { IBrand } from "../../../types/product";

export const brandService = createSupabaseService<
  IBrand,
  ICreatePayload<IBrand>,
  IUpdatePayload<IBrand>,
  number
>({
  table: Query_Tables.brands,
  keyField: "id",
  serviceName: "brands",
});
