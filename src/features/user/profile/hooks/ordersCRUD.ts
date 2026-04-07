import { createEntityHooks } from "../../../../hooks/createEntityHooks";
import { Query_Keys } from "../../../../lib/react-query/configs";
import { orderService } from "../service/orderService";

export const {
  useInfiniteFetchMany: useInfiniteFetcOrders,
  useFetchMany: useFetchOrders,
  useFetch: useFetchOrder,
  useCreate: useCreateOrder,
  useUpdate: useUpdateOrder,
  useDelete: useDeleteOrder,
} = createEntityHooks(orderService, Query_Keys.order);
