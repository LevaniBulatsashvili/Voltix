import type { ReactNode } from "react";
import EmptyState from "./EmptyState";
import Spinner from "./Spinner";

interface INoDataOptions {
  title?: string;
  description?: string;
  className?: string;
}

interface ILoadingOptions {
  containerClassName?: string;
  spinnerClassName?: string;
}

type IAsyncBoundary<T> = {
  data?: T;
  isLoading: boolean;
  loadingFallback?: ReactNode;
  noDataFallback?: ReactNode;
  defaultLoadingOptions?: ILoadingOptions;
  defaultNoDataOptions?: INoDataOptions;
  children: (data: T) => ReactNode;
};

function AsyncBoundary<T>({
  data,
  isLoading,
  loadingFallback,
  defaultLoadingOptions,
  noDataFallback,
  defaultNoDataOptions,
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

  const isEmpty = !data || (Array.isArray(data) && data.length === 0);

  if (isEmpty)
    return (
      <>
        {noDataFallback ?? (
          <EmptyState
            title={defaultNoDataOptions?.title || "common.no_data_available"}
            description={defaultNoDataOptions?.description}
            className={defaultNoDataOptions?.className}
          />
        )}
      </>
    );

  return <>{children(data)}</>;
}

export default AsyncBoundary;
