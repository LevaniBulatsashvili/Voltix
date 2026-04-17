import type { ISortBy } from "@/features/public/search/components";
import SortByBtn from "@/components/button/SortByBtn";
import { useTranslation } from "react-i18next";

export interface ISortOptions {
  sortBy: ISortBy;
  onChangeSort: (sortBy: ISortBy) => void;
}

interface IPaginationhHeader {
  title: string;
  description: string;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  sortOptions?: ISortOptions;
}

const PaginationhHeader = ({
  title,
  description,
  currentPage,
  pageSize,
  totalCount,
  sortOptions,
}: IPaginationhHeader) => {
  const { t } = useTranslation();
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
      <h1 className="text-4xl font-bold capitalize max-w-125 md:max-w-full">
        {t(title)}
      </h1>

      <div className="flex flex-col xl:mr-0 sm:mr-12 lg:items-end">
        <p className="opacity-80">
          {t(description, {
            start,
            end,
            total: totalCount,
          })}
        </p>

        {sortOptions && (
          <SortByBtn
            sortBy={sortOptions.sortBy}
            onChangeSort={sortOptions.onChangeSort}
          />
        )}
      </div>
    </div>
  );
};

export default PaginationhHeader;
