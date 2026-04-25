import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { addressService } from "../service/addressService";

export const {
  useFetchMany: useFetchAddresses,
  useFetch: useFetchAddress,
  useCreate: useCreateAddress,
  useUpdate: useUpdateAddress,
  useDelete: useDeleteAddress,
} = createEntityHooks(addressService, Query_Keys.address, Query_Keys.address);
