import { useParams } from "react-router-dom";
import { useFetchProducts } from "../../product/hooks/productCRUD";
import PageWrapper from "@/components/ui/PageWrapper";
import ProductCard from "../../products/components/productsShowcase/ProductCard";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWishlist } from "@/features/user/wishlist/hooks/useWishlist";

const SearchResults = () => {
  const { t } = useTranslation();
  const { searchVal } = useParams<string>();
  const [page, setPage] = useState(1);

  const productsQuery = useFetchProducts({
    page,
    limit: 9,
    filters: { ilike: { name: `%${searchVal}%` } },
  });
  const { isLiked, getWishlistId, toggleWishlist } = useWishlist();

  return (
    <PageWrapper className="xl:px-0">
      <PaginatedGridSection
        query={productsQuery}
        title={t("common.keyword", {
          keyword: searchVal,
        })}
        description="common.showing_products"
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
        maxCols={3}
      />
    </PageWrapper>
  );
};

export default SearchResults;
