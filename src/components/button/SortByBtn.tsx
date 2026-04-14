import type { ISortBy } from "@/features/public/search/components";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
interface ISortByBtn {
  sortBy: ISortBy;
  onChangeSort: (sortBy: ISortBy) => void;
}

const SortByBtn = ({ sortBy, onChangeSort }: ISortByBtn) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() =>
        onChangeSort(sortBy === "total_sold" ? "created_at" : "total_sold")
      }
      className="flex items-center gap-1 font-semibold capitalize"
    >
      {sortBy === "total_sold" ? t("search.most_popular") : t("search.newest")}
      <ChevronDown
        size={18}
        className={`transition-transform duration-30 ${
          sortBy === "total_sold" ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
};

export default SortByBtn;
