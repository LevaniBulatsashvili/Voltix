import { useParams } from "react-router-dom";
import { useCategoryFilterOptions } from "../hooks/useCategoryFilterOptions.ts";
import type { TCategoryQueries } from "../utils/categoryQueryMap";
import { useInfiniteFetchProducts } from "../../product/hooks/productCRUD.ts";
import ProductCard from "../../products/components/productsShowcase/ProductCard.tsx";
import { useInfiniteAutoFetch } from "@/hooks/useInfiniteAutoFetch.ts";
import { useInfiniteList } from "@/hooks/useInfiniteList.ts";
import { InfiniteGrid } from "@/components/ui/InfiniteGrid.tsx";
import PageWrapper from "@/components/ui/PageWrapper.tsx";
import CategoryInfiniteGridSkeleton from "./skeleton/CategoryInfiniteGridSkeleton.tsx";
import { PRODUCTSELECTFIELD } from "@/utils/consts.ts";
import { useCallback } from "react";
import CategoryHeader from "./CategoryHeader.tsx";

const PRODUCT_LIMIT = 9;

const Category = () => {
  const { categoryName } = useParams<{ categoryName: TCategoryQueries }>();

  const options = useCategoryFilterOptions(categoryName!);
  const {
    items,
    total,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteList(
    useInfiniteFetchProducts({
      limit: PRODUCT_LIMIT,
      ...options,
      selectField: PRODUCTSELECTFIELD,
    }),
  );

  const { observerRef } = useInfiniteAutoFetch({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const renderProduct = useCallback(
    (product: (typeof items)[number]) => (
      <ProductCard key={product.id} product={product} />
    ),
    [],
  );

  console.log("category");
  return (
    <PageWrapper>
      <CategoryHeader categoryName={categoryName!} total={total} />
      <InfiniteGrid
        items={items}
        error={error}
        isFetching={isFetching}
        renderItem={renderProduct}
        loadingFallback={<CategoryInfiniteGridSkeleton />}
        defaultFallbackOptions={{ className: "h-[70dvh]" }}
      />
      <div ref={observerRef} className="h-10" />
    </PageWrapper>
  );
};

export default Category;
