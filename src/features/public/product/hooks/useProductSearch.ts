import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useNavigate } from "react-router-dom";
import { useFetchProducts } from "./productCRUD";
import { PAGE } from "@/pages/pageConfig";
import type { IProduct } from "@/types/public/product";
import { buildProductLink } from "../utils/buildProductLink";
import { useCallback } from "react";

export function useProductSearch(limit: number, delay = 700) {
  const navigate = useNavigate();

  const {
    value: searchValue,
    setValue: setSearchValue,
    searchFilters,
  } = useSearchDebounce("", delay);

  const query = useFetchProducts(
    { limit, filters: searchFilters },
    !!searchFilters,
  );

  const onViewAll = useCallback(() => {
    if (!searchValue.trim()) return;
    navigate(
      PAGE.PUBLIC.SEARCH_RESULTS.replace(
        ":searchVal",
        encodeURIComponent(searchValue.trim()),
      ),
    );
    setSearchValue("");
  }, [searchValue, navigate, setSearchValue]);

  const onSelect = useCallback(
    (product: IProduct) => {
      navigate(
        buildProductLink(
          product.main_category.name,
          product.category.name,
          product.id,
        ),
      );
      setSearchValue("");
    },
    [navigate, setSearchValue],
  );

  return {
    searchValue,
    query,
    setSearchValue,
    onViewAll,
    onSelect,
  };
}
