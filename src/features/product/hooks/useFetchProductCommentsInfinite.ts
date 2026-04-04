import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProductComments,
  type IProductCommentsResponse,
  type TCommentSortOrder,
} from "../api/fetchProductComments";
import Query_Keys from "../../../react-query/query-keys";

interface IUseFetchProductCommentsOptions {
  productId?: number;
  sortOrder?: TCommentSortOrder;
  limit?: number;
}

export const useFetchProductCommentsInfinite = ({
  productId,
  sortOrder = "newest",
  limit = 4,
}: IUseFetchProductCommentsOptions) => {
  return useInfiniteQuery<IProductCommentsResponse, Error>({
    queryKey: [Query_Keys.getProductComments, productId, sortOrder],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductComments({
        page: pageParam as number,
        limit,
        productId,
        sortOrder,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedComments = allPages.flatMap((p) => p.productComments).length;
      return loadedComments < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    meta: { keepPreviousData: true },
  });
};
