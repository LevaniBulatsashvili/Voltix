import { createMutationHook } from "../../../../lib/react-query/createMutationHook";
import { createQueryHook } from "../../../../lib/react-query/createQueryHook";
import { Query_Keys } from "../../../../lib/react-query/configs";
import { addressService } from "../service/addressService";
import type { IAddress } from "../../../../types/profile";
import type {
  ICreatePayload,
  IUpdatePayload,
} from "../../../../types/common/api";

export const useFetchAddress = createQueryHook(
  (id) => [Query_Keys.address, id],
  addressService.fetch,
);

export const useCreateAddress = createMutationHook({
  mutationFn: addressService.create,
  queryKey: (_: ICreatePayload<IAddress>, data) => [
    Query_Keys.address,
    data.id,
  ],
});

export const useUpdateAddress = createMutationHook({
  mutationFn: addressService.update,
  queryKey: (_: IUpdatePayload<IAddress>, data) => [
    Query_Keys.address,
    data.id,
  ],
});

export const useDeleteAddress = createMutationHook({
  mutationFn: addressService.delete,
  queryKey: (id) => [Query_Keys.address, id],
  isDelete: true,
});
