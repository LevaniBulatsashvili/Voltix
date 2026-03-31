import { useState } from "react";
import { Sliders, X } from "lucide-react";
import { SelectDropdown } from "../../../../components/ui/SelectDropdown";
import type {
  IBrand,
  ICategory,
  IMainCategory,
  ISpecs,
} from "../../../../types/product";
import type { TFunction } from "i18next";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SpecFilter from "./SpecFilter";

interface IFilters {
  t: TFunction;
  mainCategories: IMainCategory[];
  selectedCategory: ICategory | null;
  onFilterCategory: (selectedCategory: ICategory | null) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
  selectedRating?: number;
  onRatingChange?: (rating?: number) => void;
  hasDiscount?: boolean;
  onHasDiscountChange?: (value: boolean) => void;
  availableBrands?: IBrand[];
  selectedBrands?: number[];
  onSelectedBrandsChange?: (brands: number[]) => void;
  availableSpecs?: ISpecs[];
  selectedSpecs?: ISpecs[];
  onSelectedSpecsChange?: (specs: ISpecs[]) => void;
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
  selectedBrands,
  onSelectedBrandsChange,
  availableSpecs,
  onSelectedSpecsChange,
  selectedSpecs,
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
          fixed top-23.5 right-0 h-full w-74 p-6 rounded-l-xl bg-background z-50 xl:max-h-fit xl:border xl:border-gray-400 xl:rounded-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          xl:static xl:translate-x-0 xl:w-74 xl:block
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
              key={id}
              name={t(name)}
              items={categories}
              onSelect={onFilterCategory}
              selectedKey={
                selectedCategory ? String(selectedCategory.id) : null
              }
              getKey={(category) => String(category.id)}
              renderText={(category) => category.name}
            />
          ))}
        </div>

        <PriceFilter t={t} onPriceFilterChange={onPriceFilterChange} />

        <RatingFilter t={t} value={selectedRating} onChange={onRatingChange} />

        <div className="py-4 border-t border-gray-300">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!hasDiscount}
              onChange={(e) => onHasDiscountChange?.(e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
            <span className="text-sm font-medium">
              {t("category.has_discount")}
            </span>
          </label>
        </div>

        {availableBrands && availableBrands.length > 0 && (
          <div className="py-4 border-t border-gray-300">
            <h3 className="text-sm font-semibold mb-2">
              {t("category.brands")}
            </h3>
            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands?.includes(brand.id)}
                    onChange={(e) => {
                      const updatedBrands = e.target.checked
                        ? [...(selectedBrands || []), brand.id]
                        : (selectedBrands || []).filter((b) => b !== brand.id);
                      onSelectedBrandsChange?.(updatedBrands);
                    }}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-sm">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <SpecFilter
          t={t}
          availableSpecs={availableSpecs || []}
          selectedSpecs={selectedSpecs}
          onChange={onSelectedSpecsChange}
        />
      </div>
    </>
  );
};

export default Filters;
