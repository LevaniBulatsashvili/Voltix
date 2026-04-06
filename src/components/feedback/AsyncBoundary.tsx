import { type ReactNode } from "react";
import EmptyState from "./EmptyState";
import Spinner from "./Spinner";
import ErrorState from "./ErrorState";
import { useAppSelector } from "../../hooks/redux";
import { useFlicker } from "../../hooks/useFlicker";

export interface IFallbackOptions {
  noDataOpt?: { title?: string; description?: string; classname: string };
  errorOpt?: { className: string };
  className?: string;
}

export interface ILoadingOptions {
  containerClassName?: string;
  spinnerClassName?: string;
}

type IAsyncBoundary<T> = {
  data?: T;
  isLoading: boolean;
  isRefetching?: boolean;
  error: Error | null;
  noDataFallback?: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  defaultFallbackOptions?: IFallbackOptions;
  defaultLoadingOptions?: ILoadingOptions;
  onRetry?: () => void;
  children: (data: T) => ReactNode;
};

function AsyncBoundary<T>({
  data,
  isLoading,
  isRefetching,
  error,
  noDataFallback,
  loadingFallback,
  errorFallback,
  defaultFallbackOptions,
  defaultLoadingOptions,
  onRetry,
  children,
}: IAsyncBoundary<T>) {
  const {
    permaNoDataState,
    permaLoadingState,
    permaErrorState,
    flickerNoDataState,
    flickerLoadingState,
    flickerErrorState,
  } = useAppSelector((state) => state.settings);
  const flicker = useFlicker({
    flickerLoading: flickerLoadingState,
    flickerError: flickerErrorState,
    flickerEmpty: flickerNoDataState,
  });

  if (permaLoadingState || isLoading || flicker === "loading")
    return (
      <>
        {loadingFallback ?? (
          <Spinner
            containerClass={`w-[90%]! flex flex-col items-center justify-center px-8 py-12 text-center mx-auto border rounded-2xl ${defaultLoadingOptions?.containerClassName}`}
            spinnerclass={`${defaultLoadingOptions?.spinnerClassName}`}
          />
        )}
      </>
    );

  if (permaErrorState || error || flicker === "error")
    return (
      <>
        {errorFallback ?? (
          <ErrorState
            title={error?.message || "an_error_has_occured"}
            className={
              defaultFallbackOptions?.errorOpt?.className ??
              defaultFallbackOptions?.className
            }
            isRetrying={isRefetching ?? false}
            onRetry={onRetry}
          />
        )}
      </>
    );

  const isEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (permaNoDataState || isEmpty || flicker === "empty")
    return (
      <>
        {noDataFallback ?? (
          <EmptyState
            title={
              defaultFallbackOptions?.noDataOpt?.title ||
              "common.no_data_available"
            }
            description={defaultFallbackOptions?.noDataOpt?.description}
            className={
              defaultFallbackOptions?.noDataOpt?.classname ??
              defaultFallbackOptions?.className
            }
          />
        )}
      </>
    );

  return <>{children(data)}</>;
}

export default AsyncBoundary;
