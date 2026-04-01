import { useState } from "react";
import { Sliders, X } from "lucide-react";
import { SelectDropdown } from "../../../../components/ui/SelectDropdown";
import type {
  IBrand,
  ICategory,
  IMainCategory,
} from "../../../../types/product";
import type { TFunction } from "i18next";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import DiscountFilter from "./DiscountFilter";
import PrimaryButton from "../../../../components/button/PrimaryBtn";

interface IFilters {
  t: TFunction;
  mainCategories: IMainCategory[];
  selectedCategory: ICategory | null;
  onFilterCategory: (selectedCategory: ICategory | null) => void;
  availableBrands: IBrand[];
  selectedBrand: IBrand | null;
  onSelectedBrandChange: (selectedBrandId: IBrand | null) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
  selectedRating?: number;
  onRatingChange?: (rating?: number) => void;
  hasDiscount?: boolean;
  onHasDiscountChange?: (value: boolean) => void;
}

const Filters = ({
  t,
  mainCategories,
  selectedCategory,
  onFilterCategory,
  onPriceFilterChange,
  selectedRating,
  onRatingChange,
  hasDiscount,
  onHasDiscountChange,
  availableBrands,
  selectedBrand,
  onSelectedBrandChange,
}: IFilters) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="absolute right-6 md:right-11 lg:right-20 xl:hidden p-2 border rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Sliders size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/30 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-23.5 right-0 h-full w-82 p-6 rounded-l-xl bg-background z-50 xl:max-h-fit xl:border xl:border-gray-400 xl:rounded-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          xl:static xl:translate-x-0 xl:w-82 xl:block
        `}
      >
        <div className="flex justify-between items-center mb-6 xl:hidden">
          <h2 className="text-xl font-bold capitalize">
            {t("category.filters")}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="hidden xl:flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold capitalize">
            {t("category.filters")}
          </h2>
          <button className="xl:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="py-3 border-y border-gray-300">
          {mainCategories.map(({ id, name, categories }) => (
            <SelectDropdown<ICategory>
              t={t}
              key={id}
              name={`common.${name.toLowerCase()}`}
              items={categories}
              onSelect={onFilterCategory}
              selectedKey={
                selectedCategory ? String(selectedCategory.id) : null
              }
              getKey={(category) => String(category.id)}
              renderText={(category) => `common.${category.name.toLowerCase()}`}
            />
          ))}
        </div>

        <PriceFilter t={t} onPriceFilterChange={onPriceFilterChange} />

        <RatingFilter t={t} value={selectedRating} onChange={onRatingChange} />

        <DiscountFilter
          t={t}
          hasDiscount={hasDiscount}
          onHasDiscountChange={onHasDiscountChange}
        />

        <div className="py-3 border-y border-gray-300">
          <SelectDropdown<IBrand>
            t={t}
            name="category.brands"
            items={availableBrands}
            onSelect={onSelectedBrandChange}
            selectedKey={selectedBrand ? String(selectedBrand.id) : null}
            getKey={(brand) => String(brand.id)}
            renderText={(brand) => `common.${brand.name.toLowerCase()}`}
          />
        </div>

        <PrimaryButton
          text={t("category.apply_filters")}
          className="mt-6 py-4 w-full! rounded-full!"
        />
      </div>
    </>
  );
};

export default Filters;
