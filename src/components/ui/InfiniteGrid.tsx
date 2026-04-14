import { useAppSelector } from "@/hooks/redux";
import AsyncBoundary from "../feedback/AsyncBoundary";
import type { IFallbackOptions } from "../feedback/AsyncBoundary";
import type { IDataResponse } from "@/types/common/api";
import { useFlicker } from "@/hooks/useFlicker";
import Spinner from "../feedback/Spinner";
import type { ReactNode } from "react";

interface IInfiniteGrid<T> {
  items: T[];
  total?: number;
  error: Error | null;
  isFetching: boolean;
  renderItem: (item: T) => ReactNode;
  gridClassName?: string;
  defaultFallbackOptions?: IFallbackOptions;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  noDataFallback?: ReactNode;
  paginationFallback?: ReactNode;
}

export function InfiniteGrid<T>({
  items,
  total,
  error,
  isFetching,
  renderItem,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
  defaultFallbackOptions,
  loadingFallback,
  errorFallback,
  noDataFallback,
  paginationFallback,
}: IInfiniteGrid<T>) {
  const { permaLoadingState, flickerLoadingState } = useAppSelector(
    (state) => state.settings,
  );

  const flicker = useFlicker({ flickerLoading: flickerLoadingState });

  const response: IDataResponse<T> = {
    data: items,
    total: total ?? items.length,
    page: 1,
    limit: items.length,
    hasMore: false,
  };

  const showPaginationSpinner =
    isFetching || permaLoadingState || flicker === "loading";

  return (
    <AsyncBoundary
      response={response}
      isLoading={isFetching && items.length === 0}
      isFetching={isFetching}
      error={error}
      defaultFallbackOptions={defaultFallbackOptions}
      loadingFallback={loadingFallback}
      errorFallback={errorFallback}
      noDataFallback={noDataFallback}
      renderFooter={() =>
        showPaginationSpinner
          ? (paginationFallback ?? (
              <Spinner
                containerClass={
                  defaultFallbackOptions?.loadingOpt?.containerClassName ??
                  "mt-4"
                }
                spinnerclass={
                  defaultFallbackOptions?.loadingOpt?.spinnerClassName
                }
              />
            ))
          : null
      }
    >
      {(normalizedItems) => (
        <div className={gridClassName}>{normalizedItems.map(renderItem)}</div>
      )}
    </AsyncBoundary>
  );
}
