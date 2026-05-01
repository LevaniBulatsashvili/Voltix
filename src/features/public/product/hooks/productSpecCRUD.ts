import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { productSpecsService } from "../services/productSpecsService";

export const {
  useInfiniteFetchMany: useInfiniteFetchProductSpecs,
  useFetchMany: useFetchProductSpecs,
  useFetch: useFetchProductSpec,
  useCreate: useCreateProductSpec,
  useUpdate: useUpdateProductSpec,
  useDelete: useDeleteProductSpec,
} = createEntityHooks(
  productSpecsService,
  Query_Keys.product_specs,
  Query_Keys.product_specs,
);
