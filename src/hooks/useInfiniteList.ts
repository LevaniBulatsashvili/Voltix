import { useInfiniteFlatten } from "@/hooks/useInfiniteFlatten";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";

export function useInfiniteList<T>(
  query: UseInfiniteQueryResult<{ pages: IDataResponse<T>[] }>,
) {
  const { items, total, isEmpty } = useInfiniteFlatten(query.data);
  return {
    items,
    total,
    isEmpty,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetching: query.isFetching,
    error: query.error,
  };
}
