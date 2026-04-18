import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import Spinner from "@/components/feedback/Spinner";
import { useTranslation } from "react-i18next";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";

interface ISearchResults<T> {
  query?: UseQueryResult<IDataResponse<T>>;
  limit: number;
  onViewAll: () => void;
  renderItem: (item: T) => React.ReactNode;
}

export function SearchResults<T>({
  query,
  limit,
  onViewAll,
  renderItem,
}: ISearchResults<T>) {
  const { t } = useTranslation();

  if (query === undefined || query.data === undefined) return null;

  return (
    <QueryBoundary
      query={query}
      defaultFallbackOptions={{
        className: "absolute! rounded-t-none! shadow-lg z-50 h-45 p-0!",
      }}
      noDataFallback={
        <div className="absolute w-full border text-gray-500 bg-white rounded-md shadow-lg z-50 px-4 py-3 text-center">
          {t("header.no_results_found")}
        </div>
      }
      loadingFallback={
        <div className="absolute w-full bg-white rounded-md shadow-lg z-50 px-2 py-3">
          <Spinner spinnerclass="size-6! border-6!" />
        </div>
      }
    >
      {(items) => (
        <ul className="absolute w-full border text-black bg-white rounded-md shadow-lg z-50 max-h-65">
          {items.map((item) => renderItem(item))}

          {items.length > limit - 1 && (
            <div
              onClick={onViewAll}
              className="pl-4 py-1 text-lg font-medium hover:bg-gray-100 cursor-pointer"
            >
              {t("header.all_results")}
            </div>
          )}
        </ul>
      )}
    </QueryBoundary>
  );
}
