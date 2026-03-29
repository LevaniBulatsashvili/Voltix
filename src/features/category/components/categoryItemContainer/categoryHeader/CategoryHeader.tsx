import { ChevronDown } from "lucide-react";
import type { TFunction } from "i18next";
import type { ISortBy } from "../../../api/fetchSelectedProducts";

interface ICategoryHeader {
  t: TFunction;
  title: string;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onChangeSort: (sortBy: ISortBy) => void;
  sortBy: ISortBy;
}

const CategoryHeader = ({
  t,
  title,
  currentPage,
  pageSize,
  totalCount,
  onChangeSort,
  sortBy,
}: ICategoryHeader) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4">
      <h1 className="text-4xl font-bold capitalize max-w-125 md:max-w-full">
        {t(title)}
      </h1>

      <div className="flex flex-col xl:mr-0 sm:mr-12 lg:items-end">
        <p className="opacity-80">
          {t("category.showing_products", {
            start,
            end,
            total: totalCount,
          })}
        </p>

        <button
          onClick={() =>
            onChangeSort(sortBy === "popular" ? "newest" : "popular")
          }
          className="flex items-center gap-1 font-semibold capitalize"
        >
          {sortBy === "popular"
            ? t("category.most_popular")
            : t("category.newest")}
          <ChevronDown
            size={18}
            className={`transition-transform duration-30 ${
              sortBy === "popular" ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
