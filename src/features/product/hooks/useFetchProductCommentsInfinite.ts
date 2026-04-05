import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProductComments,
  type IFetchProductCommentsOptions,
  type IProductCommentsResponse,
} from "../api/fetchProductComments";
import {Query_Keys} from "../../../lib/react-query/configs";

export const useFetchProductCommentsInfinite = (
  options: IFetchProductCommentsOptions,
) => {
  return useInfiniteQuery<IProductCommentsResponse, Error>({
    queryKey: [Query_Keys.getProductComments, options],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductComments({ ...options, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedComments = allPages.flatMap((p) => p.data).length;
      return loadedComments < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    meta: { keepPreviousData: true },
  });
};
