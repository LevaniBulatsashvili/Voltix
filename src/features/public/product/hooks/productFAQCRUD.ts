import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { productFAQsService } from "../services/productFAQsService";

export const {
  useInfiniteFetchMany: useInfiniteFetchProductsFAQs,
  useFetchMany: useFetchProductsFAQs,
  useFetch: useFetchProductFAQ,
  useCreate: useCreateProductFAQ,
  useUpdate: useUpdateProductFAQ,
  useDelete: useDeleteProductFAQ,
} = createEntityHooks(
  productFAQsService,
  Query_Keys.product_faqs,
  Query_Keys.product_faqs,
);
