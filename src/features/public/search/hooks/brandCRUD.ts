import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { brandService } from "../services/brandService";

export const {
  useInfiniteFetchMany: useInfiniteFetchBrandWithTotal,
  useFetchMany: useFetchBrands,
  useFetch: useFetchBrand,
  useCreate: useCreateBrand,
  useUpdate: useUpdateBrand,
  useDelete: useDeleteBrand,
} = createEntityHooks(brandService, Query_Keys.brand, Query_Keys.brand);
