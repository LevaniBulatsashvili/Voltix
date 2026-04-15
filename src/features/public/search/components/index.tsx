import { useState } from "react";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { buildSearchCrumbs } from "../utils/buildSearchCrumbs";
import { useTranslation } from "react-i18next";
import SearchFilters from "./searchFilters/SearchFilters";
import type { IBrand, ICategory } from "@/types/public/product";
import { useSearchFilters } from "../hooks/useSearchFilters";
import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import { useFetchProducts } from "../../product/hooks/productCRUD";
import ProductCard from "../../products/components/productsShowcase/ProductCard";
import { useWishlist } from "@/features/user/wishlist/hooks/useWishlist";

export type ISortBy = "created_at" | "total_sold";
const limit = 6;

const Search = () => {
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
  } = useSearchFilters();

  const productsQuery = useFetchProducts({
    page,
    limit,
    sort: [{ field: sortBy, ascending: false }],
    filters: {
      eq: { brand_id: brand?.id, category_id: selectedCategory?.id },
      gte: { price: minPrice, rating_avg: rating },
      lte: { price_final: maxPrice },
      gt: { discount_percentage: hasDiscount ? 0 : undefined },
    },
  });

  const { isLiked, getWishlistId, toggleWishlist } = useWishlist();

  const handleCategoryChange = (category: ICategory | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleBrandChange = (selectedBrand: IBrand | null) => {
    setBrand(selectedBrand);
    setPage(1);
  };

  return (
    <PageWrapper>
      <Breadcrumbs
        items={buildSearchCrumbs(t, selectedCategory?.name.toLowerCase())}
      />

      <div className="grid xl:grid-cols-[1fr_4fr] gap-4">
        <SearchFilters
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

        <PaginatedGridSection
          query={productsQuery}
          title={`common.${selectedCategory?.name.toLocaleLowerCase() || "all_categories"}`}
          description="common.showing_products"
          sortOptions={{ sortBy, onChangeSort: (by: ISortBy) => setSortBy(by) }}
          onPageChange={setPage}
          renderItem={(product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleLike={() => toggleWishlist(product.id)}
              isLiked={isLiked(product.id)}
              wishlistId={getWishlistId(product.id)}
            />
          )}
        />
      </div>
    </PageWrapper>
  );
};

export default Search;
