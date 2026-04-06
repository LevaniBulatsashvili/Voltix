import type { ReactNode } from "react";
import AsyncBoundary, {
  type IFallbackOptions,
  type ILoadingOptions,
} from "./AsyncBoundary";
import type { UseQueryResult } from "@tanstack/react-query";

interface IQueryBoundary<T> {
  query: UseQueryResult<T, Error>;
  children: (data: T) => ReactNode;
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
      data={query.data}
      isLoading={query.isLoading}
      error={query.error}
      isRefetching={query.isRefetching}
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
