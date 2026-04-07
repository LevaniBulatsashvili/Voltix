import { useMemo } from "react";

type InfinitePage<T> = {
  data: T[];
  total?: number;
};

type InfiniteQueryLike<T> = {
  pages?: InfinitePage<T>[];
};

export function useInfiniteFlatten<T>(query?: InfiniteQueryLike<T>) {
  return useMemo(() => {
    const items = query?.pages?.flatMap((page) => page.data) ?? [];
    const total = query?.pages?.[0]?.total ?? 0;

    return {
      items,
      total,
      isEmpty: items.length === 0,
    };
  }, [query]);
}
