import { useState } from "react";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useCachedQueryData } from "@/hooks/useCachedQueryData";
import { useCategoryFilterOptions } from "@/features/public/category/hooks/useCategoryFilterOptions";
import { createCategoryQuery } from "@/utils/consts";
import type { TCategoryQueries } from "@/features/public/category/utils/categoryQueryMap";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";

interface IUseAdminQuery<T> {
  useQuery: (options: {
    page: number;
    limit: number;
    filters: object;
    sort: { field: keyof T; ascending: boolean }[];
    selectField: string;
  }) => UseQueryResult<IDataResponse<T>>;
  selectField: string;
  sort?: { field: keyof T; ascending: boolean }[];
  limit?: number;
}

export const useAdminQuery = <T>({
  useQuery,
  selectField,
  sort = [{ field: "id" as keyof T, ascending: false }],
  limit = 9,
}: IUseAdminQuery<T>) => {
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

  const query = useQuery({
    page,
    limit,
    filters: { ...categoryFilterOptions.filters, ...searchFilters },
    sort,
    selectField,
  });

  const {
    data,
    currentPage,
    totalCount: total,
    totalPages,
    start,
    end,
  } = useCachedQueryData(query);

  const onSelectCategory = (category: string) => {
    setSearchValue("");
    setCategoryFilter(category);
  };

  return {
    query,
    data,
    list: data?.data ?? [],
    currentPage,
    total,
    totalPages,
    start,
    end,
    limit,
    searchValue,
    setSearchValue,
    categoryFilter,
    onSelectCategory,
    setPage,
  };
};
