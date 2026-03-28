import Breadcrumbs from "../../../components/ui/BreadCrumbs";
import { buildCategoryBreadcrumbs } from "../utils/BuildCategoryCrumbs";
import { useTranslation } from "react-i18next";
import Filters from "./filters/Filters";
import useFetchMainCategories from "../hooks/useFetchMainCategories";
import useFetchSelectedProducts from "../hooks/useFetchSelectedProducts";
import CategoryItemContainer from "./categoryItemContainer/CategoryItemContainer";
import { useState } from "react";
import type { ICategory } from "../../../types/product";

const CategoryPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const handleSelectionChange = (category: ICategory | null) =>
    setSelectedCategory(category);

  const { data: mainCategories, isLoading: isMainCategoriesLoading } =
    useFetchMainCategories();
  const { data: filteredProducts, isLoading: isProductsLoading } =
    useFetchSelectedProducts(selectedCategory);

  if (isMainCategoriesLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] text-primary bg-background">
      <Breadcrumbs items={buildCategoryBreadcrumbs(t)} />

      <div className="grid grid-cols-[1fr_4fr] gap-4">
        <Filters
          t={t}
          mainCategories={mainCategories ?? []}
          selectedCategory={selectedCategory}
          onFilterCategory={handleSelectionChange}
        />

        {!isProductsLoading && (
          <CategoryItemContainer products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
