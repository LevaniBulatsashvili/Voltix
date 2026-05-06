import { useMemo, type ReactNode } from "react";
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
import type { RootState } from "@/store";
import { shallowEqual } from "react-redux";

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

const selectAsyncBoundarySettings = (state: RootState) => ({
  permaLoadingState: state.settings.permaLoadingState,
  permaErrorState: state.settings.permaErrorState,
  permaNoDataState: state.settings.permaNoDataState,
  flickerLoadingState: state.settings.flickerLoadingState,
  flickerErrorState: state.settings.flickerErrorState,
  flickerNoDataState: state.settings.flickerNoDataState,
});

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
  const settings = useAppSelector(selectAsyncBoundarySettings, shallowEqual);

  const flicker = useFlicker({
    flickerLoading: settings.flickerLoadingState,
    flickerError: settings.flickerErrorState,
    flickerEmpty: settings.flickerNoDataState,
  });

  const { items, meta } = useMemo(
    () => normalizeResponse(response),
    [response],
  );

  const state = resolveAsyncState({
    isLoading,
    error,
    isEmpty: items.length === 0 && !isFetching,
    flicker,
    settings,
  });

  const {
    loadingOpt,
    errorOpt,
    noDataOpt,
    className: fallbackClassName,
  } = defaultFallbackOptions ?? {};

  if (state === "loading") {
    return (
      loadingFallback ?? (
        <Spinner
          containerClass={loadingOpt?.containerClassName}
          spinnerclass={loadingOpt?.spinnerClassName}
        />
      )
    );
  }

  if (state === "error") {
    return (
      errorFallback ?? (
        <ErrorState
          title={parseServiceError(
            error?.message ?? "an_error_has_occurred",
            t,
          )}
          className={errorOpt?.className ?? fallbackClassName}
          isRetrying={isRefetching ?? false}
          onRetry={onRetry}
        />
      )
    );
  }

  if (state === "empty") {
    return (
      noDataFallback ?? (
        <EmptyState
          title={t(noDataOpt?.title ?? "common.no_data_available")}
          description={
            noDataOpt?.description ? t(noDataOpt.description) : undefined
          }
          className={noDataOpt?.classname ?? fallbackClassName}
        />
      )
    );
  }

  return (
    <>
      {children(items, meta)}
      {renderFooter?.()}
    </>
  );
}

export default AsyncBoundary;
