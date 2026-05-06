import { cn } from "@/utils/cn";
import type { ISortBy } from "@/features/public/search/components";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ISortByBtn {
  sortBy: ISortBy;
  onChangeSort: (sortBy: ISortBy) => void;
}

const SortByBtn = ({ sortBy, onChangeSort }: ISortByBtn) => {
  const { t } = useTranslation();
  const isPopular = sortBy === "total_sold";

  return (
    <button
      onClick={() => onChangeSort(isPopular ? "created_at" : "total_sold")}
      className="flex items-center gap-1 font-semibold capitalize"
    >
      {isPopular ? t("search.most_popular") : t("search.newest")}
      <ChevronDown
        size={18}
        className={cn(
          "transition-transform duration-300",
          isPopular && "rotate-180",
        )}
      />
    </button>
  );
};

export default SortByBtn;
