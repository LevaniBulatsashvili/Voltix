import { useState } from "react";
import Breadcrumbs from "../../../components/ui/BreadCrumbs";
import { buildCategoryBreadcrumbs } from "../utils/BuildCategoryCrumbs";
import { useTranslation } from "react-i18next";
import Filters from "./filters/Filters";
import useFetchSelectedProducts from "../hooks/useFetchSelectedProducts";
import CategoryItemContainer from "./categoryItemContainer/CategoryItemContainer";
import type { IBrand, ICategory } from "../../../types/product";
import type { ISortBy } from "../api/fetchSelectedProducts";
import { useCategoryFilters } from "../hooks/useCategoryFilters";
import useFetchBrands from "../hooks/useFetchBrands";
import { useFetchMainCategories } from "../../../hooks/useFetchMainCategories";

const CategoryPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [brand, setBrand] = useState<IBrand | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISortBy>("newest");

  const {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
  } = useCategoryFilters();

  const { data: mainCategories, isLoading: isMainCategoriesLoading } =
    useFetchMainCategories({ includeCategories: true });
  const { data: allBrands, isLoading: isBrandsLoading } = useFetchBrands();

  const { data: productsData, isLoading: isProductsLoading } =
    useFetchSelectedProducts({
      category: selectedCategory,
      page: currentPage,
      limit: 6,
      sortBy,
      min: minPrice,
      max: maxPrice,
      rating,
      hasDiscount,
      brand,
    });

  const handleCategoryChange = (category: ICategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleBrandChange = (selectedBrand: IBrand | null) => {
    setBrand(selectedBrand);
    setCurrentPage(1);
  };

  if (isMainCategoriesLoading || isBrandsLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] text-primary bg-background">
      <Breadcrumbs
        items={buildCategoryBreadcrumbs(
          t,
          selectedCategory?.name.toLowerCase(),
        )}
      />

      <div className="grid xl:grid-cols-[1fr_4fr] gap-4">
        <Filters
          t={t}
          mainCategories={mainCategories ?? []}
          selectedCategory={selectedCategory}
          onFilterCategory={handleCategoryChange}
          onPriceFilterChange={handlePriceChange}
          selectedRating={rating}
          onRatingChange={handleRatingChange}
          hasDiscount={hasDiscount}
          onHasDiscountChange={handleHasDiscountChange}
          availableBrands={allBrands || []}
          selectedBrand={brand}
          onSelectedBrandChange={handleBrandChange}
        />

        {!isProductsLoading && productsData && (
          <CategoryItemContainer
            t={t}
            productsData={productsData}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            title={`common.${selectedCategory?.name.toLocaleLowerCase()}`}
            onChangeSort={(by: ISortBy) => setSortBy(by)}
            sortBy={sortBy}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
