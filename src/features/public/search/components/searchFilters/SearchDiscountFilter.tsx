import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ISearchDiscountFilter {
  hasDiscount?: boolean;
  onHasDiscountChange?: (value: boolean) => void;
}

const SearchDiscountFilter = ({
  hasDiscount,
  onHasDiscountChange,
}: ISearchDiscountFilter) => {
  const { t } = useTranslation();

  return (
    <div className="py-4">
      <label className="flex items-center justify-between gap-2 cursor-pointer select-none">
        <span className="text-xl font-medium capitalize">
          {t("search.discounted")}
        </span>
        <input
          type="checkbox"
          checked={!!hasDiscount}
          onChange={(e) => onHasDiscountChange?.(e.target.checked)}
          className="size-5 accent-primary"
        />
      </label>
    </div>
  );
};

export default memo(SearchDiscountFilter);
