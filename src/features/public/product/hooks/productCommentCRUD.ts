import { createEntityHooks } from "@/hooks/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { productCommentService } from "../../product/services/productCommentsService";

export const {
  useInfiniteFetchMany: useInfiniteFetchProductComments,
  useFetchMany: useFetchProductComments,
  useFetch: useFetchProductComment,
  useCreate: useCreateProductComment,
  useUpdate: useUpdateProductComment,
  useDelete: useDeleteProductComment,
} = createEntityHooks(productCommentService, Query_Keys.product_comment);
