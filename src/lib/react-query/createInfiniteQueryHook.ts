import { useInfiniteQuery } from "@tanstack/react-query";
import type { IDataResponse } from "../../types/common/api";

export const createInfiniteQueryHook = <TItem, TOptions extends object>(
  queryKeyFn: (options: TOptions) => readonly unknown[],
  queryFn: (
    options: TOptions & { page?: number },
  ) => Promise<IDataResponse<TItem>>,
) => {
  return (options: TOptions) => {
    return useInfiniteQuery({
      queryKey: queryKeyFn(options),
      queryFn: ({ pageParam }) =>
        queryFn({
          ...options,
          page: typeof pageParam === "number" ? pageParam : 1,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? (lastPage.page ?? 1) + 1 : undefined,
      initialPageParam: 1,
    });
  };
};
