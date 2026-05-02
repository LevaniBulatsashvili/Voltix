import type { ReactNode } from "react";
import AsyncBoundary, { type IFallbackOptions } from "./AsyncBoundary";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";

interface IQueryBoundary<T> {
  query: UseQueryResult<T | IDataResponse<T>, Error>;
  children: (
    items: T[],
    meta: { total?: number; page?: number; limit?: number; hasMore?: boolean },
  ) => ReactNode;
  noDataFallback?: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  defaultFallbackOptions?: IFallbackOptions;
}

export const QueryBoundary = <T,>({
  query,
  children,
  noDataFallback,
  loadingFallback,
  errorFallback,
  defaultFallbackOptions,
}: IQueryBoundary<T>) => {
  return (
    <AsyncBoundary
      response={query.data}
      isLoading={query.isLoading}
      isRefetching={query.isRefetching}
      isFetching={query.isFetching}
      error={query.error}
      onRetry={query.refetch}
      noDataFallback={noDataFallback}
      loadingFallback={loadingFallback}
      errorFallback={errorFallback}
      defaultFallbackOptions={defaultFallbackOptions}
    >
      {children}
    </AsyncBoundary>
  );
};
