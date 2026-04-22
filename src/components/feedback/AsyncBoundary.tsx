import type { ReactNode } from "react";
import EmptyState from "./EmptyState";
import Spinner from "./Spinner";
import ErrorState from "./ErrorState";
import { useAppSelector } from "@/hooks/redux";
import { useFlicker } from "@/hooks/useFlicker";
import type { IDataResponse } from "@/types/common/api";
import {
  normalizeResponse,
  resolveAsyncState,
} from "@/components/feedback/utils/asyncBoundaryUtils";
import { useTranslation } from "react-i18next";
import { parseServiceError } from "@/lib/supabase/parseServiceError";

export interface IFallbackOptions {
  noDataOpt?: { title?: string; description?: string; classname?: string };
  loadingOpt?: { containerClassName?: string; spinnerClassName?: string };
  errorOpt?: { className?: string };
  className?: string;
}

export type IAsyncBoundaryMeta = {
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
};

type IAsyncBoundaryProps<T> = {
  response?: T | IDataResponse<T>;
  isLoading: boolean;
  isFetching?: boolean;
  isRefetching?: boolean;
  error: Error | null;
  noDataFallback?: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  defaultFallbackOptions?: IFallbackOptions;
  onRetry?: () => void;
  renderFooter?: () => ReactNode;
  children: (items: T[], meta: IAsyncBoundaryMeta) => ReactNode;
};

function AsyncBoundary<T>({
  response,
  isLoading,
  isFetching,
  isRefetching,
  error,
  noDataFallback,
  loadingFallback,
  errorFallback,
  defaultFallbackOptions,
  onRetry,
  renderFooter,
  children,
}: IAsyncBoundaryProps<T>) {
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);

  const flicker = useFlicker({
    flickerLoading: settings.flickerLoadingState,
    flickerError: settings.flickerErrorState,
    flickerEmpty: settings.flickerNoDataState,
  });

  const { items, meta } = normalizeResponse(response);
  const isEmpty = items.length === 0;

  const state = resolveAsyncState({
    isLoading,
    error,
    isEmpty: isEmpty && !isFetching,
    flicker,
    settings,
  });

  if (state === "loading")
    return (
      loadingFallback ?? (
        <Spinner
          containerClass={
            defaultFallbackOptions?.loadingOpt?.containerClassName
          }
          spinnerclass={defaultFallbackOptions?.loadingOpt?.spinnerClassName}
        />
      )
    );

  if (state === "error")
    return (
      errorFallback ?? (
        <ErrorState
          title={parseServiceError(
            error?.message || "an_error_has_occurred",
            t,
          )}
          className={
            defaultFallbackOptions?.errorOpt?.className ??
            defaultFallbackOptions?.className
          }
          isRetrying={isRefetching ?? false}
          onRetry={onRetry}
        />
      )
    );

  if (state === "empty")
    return (
      noDataFallback ?? (
        <EmptyState
          title={t(
            defaultFallbackOptions?.noDataOpt?.title ??
              "common.no_data_available",
          )}
          description={
            defaultFallbackOptions?.noDataOpt?.description &&
            t(defaultFallbackOptions?.noDataOpt?.description)
          }
          className={
            defaultFallbackOptions?.noDataOpt?.classname ??
            defaultFallbackOptions?.className
          }
        />
      )
    );

  return (
    <>
      {children(items, meta)}
      {renderFooter?.()}
    </>
  );
}

export default AsyncBoundary;
