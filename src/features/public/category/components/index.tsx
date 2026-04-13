import { useState } from "react";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { buildCategoryBreadcrumbs } from "../utils/BuildCategoryCrumbs";
import { useTranslation } from "react-i18next";
import Filters from "./filters/Filters";
import CategoryItemContainer from "./categoryItemContainer/CategoryItemContainer";
import type { IBrand, ICategory } from "@/types/product";
import { useCategoryFilters } from "../hooks/useCategoryFilters";

export type ISortBy = "created_at" | "total_sold";
const limit = 6;

const CategoryPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [brand, setBrand] = useState<IBrand | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISortBy>("created_at");

  const {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
  } = useCategoryFilters();

  const handleCategoryChange = (category: ICategory | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleBrandChange = (selectedBrand: IBrand | null) => {
    setBrand(selectedBrand);
    setPage(1);
  };

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
          selectedCategory={selectedCategory}
          onFilterCategory={handleCategoryChange}
          onPriceFilterChange={handlePriceChange}
          selectedRating={rating}
          onRatingChange={handleRatingChange}
          hasDiscount={hasDiscount}
          onHasDiscountChange={handleHasDiscountChange}
          selectedBrand={brand}
          onSelectedBrandChange={handleBrandChange}
        />

        <CategoryItemContainer
          onPageChange={setPage}
          title={`common.${selectedCategory?.name.toLocaleLowerCase() || "all_categories"}`}
          sortBy={sortBy}
          limit={limit}
          onChangeSort={(by: ISortBy) => setSortBy(by)}
          fetchOptions={{
            page,
            limit,
            sort: [{ field: sortBy, ascending: false }],
            filters: {
              eq: { brand_id: brand?.id, category_id: selectedCategory?.id },
              gte: { price: minPrice, rating_avg: rating },
              lte: { price_final: maxPrice },
              gt: { discount_percentage: hasDiscount ? 0 : undefined },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
