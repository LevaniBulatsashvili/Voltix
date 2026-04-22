import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IOrder } from "@/types/profile/profile";

export const orderService = createSupabaseService<
  IOrder,
  ICreatePayload<IOrder>,
  IUpdatePayload<IOrder>,
  string
>({
  table: Query_Tables.orders,
  keyField: "id",
  serviceName: "orders",
  selectFieldOptions: {
    fetchManySelectField: "*, items: order_items(*, product: products(*))",
  },
});
