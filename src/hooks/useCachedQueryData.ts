import { useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";

interface IUseCachedQueryDataResult<T> {
  data: IDataResponse<T> | null;
  currentPage: number;
  totalCount: number;
  totalPages: number;
  start: number;
  end: number;
}

export function useCachedQueryData<T>(
  query: UseQueryResult<IDataResponse<T>>,
): IUseCachedQueryDataResult<T> {
  const [cachedData, setCachedData] = useState<IDataResponse<T> | null>(null);

  const data = query.data ?? cachedData;
  if (query.data && query.data !== cachedData) setCachedData(query.data);

  const currentPage = data?.page ?? 0;
  const limit = data?.limit ?? 0;
  const totalCount = data?.total ?? 0;
  const totalPages =
    data?.limit && totalCount ? Math.ceil(totalCount / data.limit) : 1;
  const start = limit === 0 ? limit : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);

  return {
    data,
    currentPage,
    totalCount,
    totalPages,
    start,
    end,
  };
}
