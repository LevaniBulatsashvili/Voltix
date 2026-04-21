import { useState } from "react";
import { Sliders, X } from "lucide-react";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import type { IBrand, ICategory } from "@/types/public/product";
import type { TFunction } from "i18next";
import SearchPriceFilter from "./SearchPriceFilter";
import SearchRatingFilter from "./SearchRatingFilter";
import SearchDiscountFilter from "./SearchDiscountFilter";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { useFetchMainCategories } from "../../../category/hooks/mainCategoryCRUD";
import { useFetchBrands } from "../../hooks/brandCRUD";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import SelectDropdownSkeleton from "@/components/skeleton/SelectDropdownSkeleton";
import SelectDropdownGridSkeleton from "@/components/skeleton/SelectDropdownGridSkeleton";

interface ISearchFilters {
  t: TFunction;
  selectedCategory: ICategory | null;
  onFilterCategory: (selectedCategory: ICategory | null) => void;
  selectedBrand: IBrand | null;
  onSelectedBrandChange: (selectedBrandId: IBrand | null) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
  selectedRating?: number;
  onRatingChange?: (rating?: number) => void;
  hasDiscount?: boolean;
  onHasDiscountChange?: (value: boolean) => void;
}

const SearchFilters = ({
  t,
  selectedCategory,
  onFilterCategory,
  onPriceFilterChange,
  selectedRating,
  onRatingChange,
  hasDiscount,
  onHasDiscountChange,
  selectedBrand,
  onSelectedBrandChange,
}: ISearchFilters) => {
  const [isOpen, setIsOpen] = useState(false);

  const mainCategoriesQuery = useFetchMainCategories({
    sort: [{ field: "id", ascending: true }],
    selectField: "id, name, categories(id,name)",
  });
  const brandQuery = useFetchBrands({ selectField: "id, name" });

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
            {t("search.filters")}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="hidden xl:flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold capitalize">
            {t("search.filters")}
          </h2>
          <button className="xl:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <QueryBoundary
          query={mainCategoriesQuery}
          loadingFallback={<SelectDropdownGridSkeleton />}
          defaultFallbackOptions={{ className: "h-[23dvh]" }}
        >
          {(mainCategoriesData) => (
            <div className="py-3 border-y border-gray-300">
              {mainCategoriesData.map(({ id, name, categories }) => (
                <SelectDropdown<ICategory>
                  t={t}
                  key={id}
                  name={`common.${name.toLowerCase()}`}
                  items={categories!}
                  onSelect={onFilterCategory}
                  selectedKey={
                    selectedCategory ? String(selectedCategory.id) : null
                  }
                  getKey={(category) => String(category.id)}
                  renderText={(category) =>
                    `common.${category.name.toLowerCase()}`
                  }
                />
              ))}
            </div>
          )}
        </QueryBoundary>

        <SearchPriceFilter t={t} onPriceFilterChange={onPriceFilterChange} />

        <SearchRatingFilter
          t={t}
          value={selectedRating}
          onChange={onRatingChange}
        />

        <SearchDiscountFilter
          t={t}
          hasDiscount={hasDiscount}
          onHasDiscountChange={onHasDiscountChange}
        />

        <QueryBoundary
          query={brandQuery}
          loadingFallback={
            <SelectDropdownSkeleton className="pb-6 border-b border-gray-400" />
          }
          defaultFallbackOptions={{ className: "h-[15dvh] p-0!" }}
        >
          {(brandsData) => (
            <div className="py-3 border-y border-gray-300">
              <SelectDropdown<IBrand>
                t={t}
                name="search.brands"
                items={brandsData}
                onSelect={onSelectedBrandChange}
                selectedKey={selectedBrand ? String(selectedBrand.id) : null}
                getKey={(brand) => String(brand.id)}
                renderText={(brand) => `common.${brand.name.toLowerCase()}`}
              />
            </div>
          )}
        </QueryBoundary>

        <PrimaryButton
          text={t("search.apply_filters")}
          className="mt-6 py-4 w-full! rounded-full!"
        />
      </div>
    </>
  );
};

export default SearchFilters;
