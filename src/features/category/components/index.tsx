import { useState } from "react";
import Breadcrumbs from "../../../components/ui/BreadCrumbs";
import { buildCategoryBreadcrumbs } from "../utils/BuildCategoryCrumbs";
import { useTranslation } from "react-i18next";
import Filters from "./filters/Filters";
import useFetchMainCategories from "../hooks/useFetchMainCategories";
import useFetchSelectedProducts from "../hooks/useFetchSelectedProducts";
import CategoryItemContainer from "./categoryItemContainer/CategoryItemContainer";
import type { ICategory } from "../../../types/product";
import type { ISortBy } from "../api/fetchSelectedProducts";
import { useCategoryFilters } from "../hooks/useCategoryFilters";
import useFetchBrands from "../hooks/useFetchBrands";
import useFetchSpecs from "../hooks/useFetchSpecs";

const CategoryPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISortBy>("newest");

  const {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    brands,
    specs,
    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
    handleBrandsChange,
    handleSpecsChange,
  } = useCategoryFilters();

  const { data: mainCategories, isLoading: isMainCategoriesLoading } =
    useFetchMainCategories();
  const { data: allBrands, isLoading: isBrandsLoading } = useFetchBrands();
  const { data: allSpecs, isLoading: isSpecsLoading } = useFetchSpecs();

  const { data: productsData, isLoading: isProductsLoading } =
    useFetchSelectedProducts({
      category: selectedCategory,
      page: currentPage,
      limit: 4,
      sortBy,
      min: minPrice,
      max: maxPrice,
      rating,
      hasDiscount,
      selectedBrands: brands,
      productSpecs: specs,
    });

  const handleCategoryChange = (category: ICategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (isMainCategoriesLoading || isBrandsLoading || isSpecsLoading)
    return <div>Loading...</div>;

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
          availableBrands={allBrands}
          selectedBrands={brands}
          onSelectedBrandsChange={handleBrandsChange}
          availableSpecs={allSpecs}
          selectedSpecs={specs}
          onSelectedSpecsChange={handleSpecsChange}
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
