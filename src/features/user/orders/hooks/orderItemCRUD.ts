import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { orderItemService } from "../service/orderItemService";

export const {
  useInfiniteFetchMany: useInfiniteFetcOrderItems,
  useFetchMany: useFetchOrderItems,
  useFetch: useFetchOrderItem,
  useCreate: useCreateOrderItem,
  useUpdate: useUpdateOrderItem,
  useDelete: useDeleteOrderItem,
} = createEntityHooks(
  orderItemService,
  Query_Keys.order_items,
  Query_Keys.order_items,
);
