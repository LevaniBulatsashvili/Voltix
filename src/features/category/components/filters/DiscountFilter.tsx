import type { TFunction } from "i18next";

interface IDiscountFilter {
  t: TFunction;
  hasDiscount?: boolean;
  onHasDiscountChange?: (value: boolean) => void;
}

const DiscountFilter = ({
  t,
  hasDiscount,
  onHasDiscountChange,
}: IDiscountFilter) => {
  return (
    <div className="py-4">
      <label className="flex items-center justify-between gap-2 cursor-pointer select-none">
        <span className="text-xl font-medium capitalize">
          {t("category.discounted")}
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

export default DiscountFilter;
