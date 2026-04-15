import { useParams } from "react-router-dom";
import { useCategoryFilterOptions } from "../hooks/useCategoryFilterOptions.ts";
import type { TMainCategory } from "../utils/categoryQueryMap";
import { useInfiniteFetchProducts } from "../../product/hooks/productCRUD.ts";
import ProductCard from "../../products/components/productsShowcase/ProductCard.tsx";
import { useTranslation } from "react-i18next";
import { useInfiniteAutoFetch } from "@/hooks/useInfiniteAutoFetch.ts";
import { useInfiniteList } from "@/hooks/useInfiniteList.ts";
import { InfiniteGrid } from "@/components/ui/InfiniteGrid.tsx";
import PageWrapper from "@/components/ui/PageWrapper.tsx";
import CategoryInfiniteGridSkeleton from "./skeleton/CategoryInfiniteGridSkeleton.tsx";
import { useWishlist } from "@/features/user/wishlist/hooks/useWishlist.ts";

const Category = () => {
  const { t } = useTranslation();
  const { categoryName } = useParams<{ categoryName: TMainCategory }>();

  const options = useCategoryFilterOptions(categoryName);
  const {
    items,
    total,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteList(useInfiniteFetchProducts({ limit: 9, ...options }));

  const { isLiked, getWishlistId, toggleWishlist } = useWishlist();

  const { observerRef } = useInfiniteAutoFetch({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <PageWrapper>
      <div className="flex justify-between py-8">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {t(`common.${categoryName}`)}
        </h1>
        <p className="flex gap-2 text-2xl sm:text-4xl font-semibold">
          {t("category.total")} <span>{total}</span>
        </p>
      </div>
      <InfiniteGrid
        items={items}
        error={error}
        isFetching={isFetching}
        renderItem={(product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleLike={() => toggleWishlist(product.id)}
            isLiked={isLiked(product.id)}
            wishlistId={getWishlistId(product.id)}
          />
        )}
        loadingFallback={<CategoryInfiniteGridSkeleton />}
        defaultFallbackOptions={{ className: "h-[70dvh]" }}
      />
      <div ref={observerRef} className="h-10" />
    </PageWrapper>
  );
};

export default Category;
