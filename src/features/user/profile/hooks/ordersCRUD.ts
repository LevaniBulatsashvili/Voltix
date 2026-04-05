import { createMutationHook } from "../../../../lib/react-query/createMutationHook";
import { createQueryHook } from "../../../../lib/react-query/createQueryHook";
import { Query_Keys } from "../../../../lib/react-query/configs";
import { orderService } from "../service/orderService";
import type { IOrder } from "../../../../types/profile";
import type {
  ICreatePayload,
  IUpdatePayload,
} from "../../../../types/common/api";

export const useFetchOrders = createQueryHook(
  (options) => [Query_Keys.orders, options],
  orderService.fetchMany,
);

export const useFetchOrder = createQueryHook(
  (id) => [Query_Keys.order, id],
  orderService.fetch,
);

export const useCreateOrder = createMutationHook({
  mutationFn: orderService.create,
  queryKey: (_: ICreatePayload<IOrder>, data) => [Query_Keys.order, data.id],
});

export const useUpdateOrder = createMutationHook({
  mutationFn: orderService.update,
  queryKey: (_: IUpdatePayload<IOrder>, data) => [Query_Keys.order, data.id],
});

export const useDeleteOrder = createMutationHook({
  mutationFn: orderService.delete,
  queryKey: (id) => [Query_Keys.order, id],
  isDelete: true,
});
