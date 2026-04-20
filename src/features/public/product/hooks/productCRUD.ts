import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { productService } from "../../product/services/productService";

export const {
  useInfiniteFetchMany: useInfiniteFetchProducts,
  useFetchMany: useFetchProducts,
  useFetch: useFetchProduct,
  useCreate: useCreateProduct,
  useUpdate: useUpdateProduct,
  useDelete: useDeleteProduct,
} = createEntityHooks(productService, Query_Keys.product);
