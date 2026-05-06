import { useAppSelector } from "@/hooks/redux";
import AsyncBoundary from "../feedback/AsyncBoundary";
import type { IFallbackOptions } from "../feedback/AsyncBoundary";
import type { IDataResponse } from "@/types/common/api";
import { useFlicker } from "@/hooks/useFlicker";
import Spinner from "../feedback/Spinner";
import { useCallback, useMemo, type ReactNode } from "react";

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

const DEFAULT_GRID_CLASS =
  "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4";

export function InfiniteGrid<T>({
  items,
  total,
  error,
  isFetching,
  renderItem,
  gridClassName,
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

  const response = useMemo<IDataResponse<T>>(
    () => ({
      data: items,
      total: total ?? items.length,
      page: 1,
      limit: items.length,
      hasMore: false,
    }),
    [items, total],
  );

  const showPaginationSpinner =
    isFetching || permaLoadingState || flicker === "loading";

  const spinnerContainerClass =
    defaultFallbackOptions?.loadingOpt?.containerClassName ?? "mt-4";
  const spinnerClass = defaultFallbackOptions?.loadingOpt?.spinnerClassName;

  const renderFooter = useCallback(
    () =>
      showPaginationSpinner
        ? (paginationFallback ?? (
            <Spinner
              containerClass={spinnerContainerClass}
              spinnerclass={spinnerClass}
            />
          ))
        : null,
    [
      showPaginationSpinner,
      paginationFallback,
      spinnerContainerClass,
      spinnerClass,
    ],
  );

  const renderChildren = useCallback(
    (normalizedItems: T[]) => (
      <div className={gridClassName ?? DEFAULT_GRID_CLASS}>
        {normalizedItems.map(renderItem)}
      </div>
    ),
    [renderItem, gridClassName],
  );

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
      renderFooter={renderFooter}
    >
      {renderChildren}
    </AsyncBoundary>
  );
}
