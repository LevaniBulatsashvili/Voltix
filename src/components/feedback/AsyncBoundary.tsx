import type { ReactNode } from "react";
import EmptyState from "./EmptyState";
import Spinner from "./Spinner";
import ErrorState from "./ErrorState";

interface IFallbackOptions {
  noDataOpt?: { title?: string; description?: string; classname: string };
  errorOpt?: { className: string };
  className?: string;
}

interface ILoadingOptions {
  containerClassName?: string;
  spinnerClassName?: string;
}

type IAsyncBoundary<T> = {
  data?: T;
  isLoading: boolean;
  error: Error | null;
  noDataFallback?: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  defaultFallbackOptions?: IFallbackOptions;
  defaultLoadingOptions?: ILoadingOptions;
  children: (data: T) => ReactNode;
};

function AsyncBoundary<T>({
  data,
  isLoading,
  error,
  noDataFallback,
  loadingFallback,
  errorFallback,
  defaultFallbackOptions,
  defaultLoadingOptions,
  children,
}: IAsyncBoundary<T>) {
  if (isLoading)
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

  if (error)
    return (
      <>
        {errorFallback ?? (
          <ErrorState
            title={error.message || "common.an_error_has_occured"}
            className={
              defaultFallbackOptions?.errorOpt?.className ??
              defaultFallbackOptions?.className
            }
          />
        )}
      </>
    );

  const isEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (isEmpty)
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
