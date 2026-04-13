import { ChevronDown } from "lucide-react";
import type { TFunction } from "i18next";
import type { ISortBy } from "../..";

interface ISearchHeader {
  t: TFunction;
  title: string;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onChangeSort: (sortBy: ISortBy) => void;
  sortBy: ISortBy;
}

const SearchHeader = ({
  t,
  title,
  currentPage,
  pageSize,
  totalCount,
  onChangeSort,
  sortBy,
}: ISearchHeader) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4">
      <h1 className="text-4xl font-bold capitalize max-w-125 md:max-w-full">
        {t(title)}
      </h1>

      <div className="flex flex-col xl:mr-0 sm:mr-12 lg:items-end">
        <p className="opacity-80">
          {t("search.showing_products", {
            start,
            end,
            total: totalCount,
          })}
        </p>

        <button
          onClick={() =>
            onChangeSort(sortBy === "total_sold" ? "created_at" : "total_sold")
          }
          className="flex items-center gap-1 font-semibold capitalize"
        >
          {sortBy === "total_sold"
            ? t("search.most_popular")
            : t("search.newest")}
          <ChevronDown
            size={18}
            className={`transition-transform duration-30 ${
              sortBy === "total_sold" ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
