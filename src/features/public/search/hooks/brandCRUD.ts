import { createEntityHooks } from "@/hooks/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { brandService } from "../services/brandService";

export const {
  useInfiniteFetchMany: useInfiniteFetchBrandWithTotal,
  useFetchMany: useFetchbrands,
  useFetch: useFetchbrand,
  useCreate: useCreatebrand,
  useUpdate: useUpdatebrand,
  useDelete: useDeletebrand,
} = createEntityHooks(brandService, Query_Keys.brand);
