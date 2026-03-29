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

const CategoryPage = () => {
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [sortBy, setSortBy] = useState<ISortBy>("newest");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { data: mainCategories, isLoading: isMainCategoriesLoading } =
    useFetchMainCategories();

  const { data: productsData, isLoading: isProductsLoading } =
    useFetchSelectedProducts(
      selectedCategory,
      currentPage,
      4,
      sortBy,
      minPrice,
      maxPrice,
    );

  const handleSelectionChange = (category: ICategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const onPriceFilterChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(() => (max === 5000 ? undefined : max));
  };

  if (isMainCategoriesLoading) return <div>Loading...</div>;

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
          onFilterCategory={handleSelectionChange}
          onPriceFilterChange={onPriceFilterChange}
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
