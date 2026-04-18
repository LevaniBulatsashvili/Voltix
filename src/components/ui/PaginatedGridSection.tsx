import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import SearchProductCardGridSkeleton from "@/features/public/search/components/searchSkeleton/SearchProductCardSkeleton";
import Pagination from "@/components/ui/Pagination";
import { type ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";
import PaginationhHeader, { type ISortOptions } from "./PaginationHeader";
import { useCachedQueryData } from "@/hooks/useCachedQueryData";

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
  const { data, currentPage, totalCount, totalPages } =
    useCachedQueryData(query);

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
          loadingFallback={
            <SearchProductCardGridSkeleton count={maxCols * 2} cols={maxCols} />
          }
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
