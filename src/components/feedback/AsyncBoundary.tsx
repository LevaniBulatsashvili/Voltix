import type { UseQueryResult } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Error from "./Error";

type IAsyncBoundary<T> = {
  query: UseQueryResult<T>;
  children: (data: T) => React.ReactNode;
};

function AsyncBoundary<T>({ query, children }: IAsyncBoundary<T>) {
  if (query.isLoading) return <Spinner />;
  if (query.error) return <Error message={query.error.message} />;
  if (!query.data) return <Error message="No data found" />;

  return <>{children(query.data)}</>;
}

export default AsyncBoundary;
