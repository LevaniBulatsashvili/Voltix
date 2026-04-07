import type { ReactNode } from "react";
import AsyncBoundary, {
  type IFallbackOptions,
  type ILoadingOptions,
} from "./AsyncBoundary";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "../../types/common/api";

interface IQueryBoundary<T> {
  query: UseQueryResult<T | IDataResponse<T>, Error>;
  children: (
    items: T[],
    meta: { total?: number; page?: number; limit?: number; hasMore?: boolean },
  ) => ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  defaultFallbackOptions?: IFallbackOptions;
  defaultLoadingOptions?: ILoadingOptions;
}

export const QueryBoundary = <T,>({
  query,
  children,
  loadingFallback,
  errorFallback,
  defaultFallbackOptions,
  defaultLoadingOptions,
}: IQueryBoundary<T>) => {
  return (
    <AsyncBoundary
      response={query.data}
      isLoading={query.isLoading}
      isRefetching={query.isRefetching}
      error={query.error}
      onRetry={query.refetch}
      loadingFallback={loadingFallback}
      errorFallback={errorFallback}
      defaultFallbackOptions={defaultFallbackOptions}
      defaultLoadingOptions={defaultLoadingOptions}
    >
      {children}
    </AsyncBoundary>
  );
};
