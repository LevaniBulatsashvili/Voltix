import { memo, useMemo, useState } from "react";
import { Sliders, X } from "lucide-react";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import type { IBrand, ICategory, IMainCategory } from "@/types/public/product";
import SearchPriceFilter from "./SearchPriceFilter";
import SearchRatingFilter from "./SearchRatingFilter";
import SearchDiscountFilter from "./SearchDiscountFilter";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { useFetchMainCategories } from "../../../category/hooks/mainCategoryCRUD";
import { useFetchBrands } from "../../hooks/brandCRUD";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import SelectDropdownSkeleton from "@/components/skeleton/SelectDropdownSkeleton";
import SelectDropdownGridSkeleton from "@/components/skeleton/SelectDropdownGridSkeleton";
import { useTranslation } from "react-i18next";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import type { ISearchFilterState } from "../../utils/mapFiltersToQuery";

interface ISearchFiltersProps {
  onApply: (filters: ISearchFilterState) => void;
}

const SearchFilters = ({ onApply }: ISearchFiltersProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [tempCategory, setTempCategory] = useState<ICategory | null>(null);
  const [tempBrand, setTempBrand] = useState<IBrand | null>(null);

  const {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
  } = useSearchFilters();

  const handleLocalApply = () => {
    onApply({
      category: tempCategory,
      brand: tempBrand,
      minPrice,
      maxPrice,
      rating,
      hasDiscount,
    });
    setIsOpen(false);
  };

  const categoryQueryOptions = useMemo(
    () => ({
      limit: 1000,
      sort: [{ field: "id" as keyof IMainCategory, ascending: true }],
      selectField: "id, name, categories(id,name)",
    }),
    [],
  );

  const brandQueryOptions = useMemo(
    () => ({
      limit: 1000,
      selectField: "id, name",
    }),
    [],
  );

  const mainCategoriesQuery = useFetchMainCategories(categoryQueryOptions);
  const brandQuery = useFetchBrands(brandQueryOptions);

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
        <div className="flex justify-between items-center mb-6">
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
        >
          {(mainCategoriesData) => (
            <div className="py-3 border-y border-gray-300">
              {mainCategoriesData.map(({ id, name, categories }) => (
                <SelectDropdown<ICategory>
                  key={id}
                  name={`common.${name.toLowerCase()}`}
                  items={categories!}
                  onSelect={setTempCategory}
                  selectedKey={tempCategory ? String(tempCategory.id) : null}
                  getKey={(category) => String(category.id)}
                  renderText={(category) =>
                    `common.${category.name.toLowerCase()}`
                  }
                />
              ))}
            </div>
          )}
        </QueryBoundary>

        <SearchPriceFilter onPriceFilterChange={handlePriceChange} />
        <SearchRatingFilter value={rating} onChange={handleRatingChange} />
        <SearchDiscountFilter
          hasDiscount={hasDiscount}
          onHasDiscountChange={handleHasDiscountChange}
        />

        <QueryBoundary
          query={brandQuery}
          loadingFallback={
            <SelectDropdownSkeleton className="pb-6 border-b border-gray-400" />
          }
        >
          {(brandsData) => (
            <div className="py-3 border-y border-gray-300">
              <SelectDropdown<IBrand>
                name="search.brands"
                items={brandsData}
                onSelect={setTempBrand}
                selectedKey={tempBrand ? String(tempBrand.id) : null}
                getKey={(brand) => String(brand.id)}
                renderText={(brand) => `common.${brand.name.toLowerCase()}`}
              />
            </div>
          )}
        </QueryBoundary>

        <PrimaryButton
          text={t("search.apply_filters")}
          className="mt-6 py-4 w-full! rounded-full!"
          onClick={handleLocalApply}
        />
      </div>
    </>
  );
};

export default memo(SearchFilters);
