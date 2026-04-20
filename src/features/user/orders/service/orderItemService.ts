import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IOrderItem } from "@/types/profile/profile";

export const orderItemService = createSupabaseService<
  IOrderItem,
  ICreatePayload<IOrderItem>,
  IUpdatePayload<IOrderItem>,
  string
>({
  table: Query_Tables.order_items,
  keyField: "id",
  serviceName: "order_item",
});
