import { useState } from "react";
import { useFetchProducts } from "@/features/public/product/hooks/productCRUD";
import { useSearchDebounce } from "@/hooks/useSeachDebounce";
import { useCachedQueryData } from "@/hooks/useCachedQueryData";
import { useCategoryFilterOptions } from "@/features/public/category/hooks/useCategoryFilterOptions";
import { createCategoryQuery } from "@/utils/consts";
import type { TCategoryQueries } from "@/features/public/category/utils/categoryQueryMap";

const LIMIT = 9;

export const useProductQuery = () => {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");

  const {
    value: searchValue,
    setValue: setSearchValue,
    searchFilters,
  } = useSearchDebounce("");

  const categoryFilterOptions = useCategoryFilterOptions(
    createCategoryQuery(categoryFilter) as TCategoryQueries,
    false,
  );

  const productsQuery = useFetchProducts({
    page,
    limit: LIMIT,
    filters: { ...categoryFilterOptions.filters, ...searchFilters },
    sort: [{ field: "id", ascending: false }],
  });

  const {
    data: products,
    currentPage,
    totalCount: total,
    totalPages,
    start,
    end,
  } = useCachedQueryData(productsQuery);

  const onSelectCategory = (category: string) => {
    setSearchValue("");
    setCategoryFilter(category);
  };

  return {
    productsQuery,
    products,
    productList: products?.data ?? [],
    currentPage,
    total,
    totalPages,
    start,
    end,
    limit: LIMIT,
    searchValue,
    setSearchValue,
    categoryFilter,
    onSelectCategory,
    setPage,
  };
};
