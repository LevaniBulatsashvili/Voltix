import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import SearchProductCardGridSkeleton from "@/features/public/search/components/searchSkeleton/SearchProductCardSkeleton";
import Pagination from "@/components/ui/Pagination";
import { useState, type ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";
import PaginationhHeader, { type ISortOptions } from "./PaginationHeader";

interface IPaginatedGridSection<T> {
  query: UseQueryResult<IDataResponse<T>, Error>;
  title: string;
  description: string;
  sortOptions?: ISortOptions;
  maxCols?: number;
  onPageChange: (page: number) => void;
  renderItem: (item: T) => ReactNode;
  className?: string;
}

const PaginatedGridSection = <T,>({
  query,
  title,
  description,
  sortOptions,
  maxCols = 2,
  onPageChange,
  renderItem,
  className,
}: IPaginatedGridSection<T>) => {
  const [cachedData, setCachedData] = useState<IDataResponse<T> | null>(null);

  const data = query.data ?? cachedData;
  if (query.data && query.data !== cachedData) setCachedData(query.data);

  const currentPage = data?.page ?? 0;
  const totalCount = data?.total ?? 0;
  const totalPages =
    data?.limit && totalCount ? Math.ceil(totalCount / data.limit) : 1;

  return (
    <div>
      <div
        className={`xl:ml-4 pb-8 border-b border-gray-300 min-h-[66dvh] ${className}`}
      >
        <PaginationhHeader
          title={title}
          description={description}
          currentPage={currentPage}
          pageSize={data?.limit ?? 0}
          totalCount={totalCount}
          sortOptions={sortOptions}
        />

        <QueryBoundary
          query={query}
          defaultFallbackOptions={{ className: "h-[64dvh]" }}
          loadingFallback={<SearchProductCardGridSkeleton count={4} />}
        >
          {(products) => (
            <div
              className={`grid sm:grid-cols-2 lg:grid-cols-${maxCols} gap-4`}
            >
              {products.map((item) => renderItem(item))}
            </div>
          )}
        </QueryBoundary>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
};

export default PaginatedGridSection;
