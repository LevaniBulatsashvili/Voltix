import { useCallback, useMemo, useState } from "react";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { buildSearchCrumbs } from "../utils/buildSearchCrumbs";
import { useTranslation } from "react-i18next";
import SearchFilters from "./searchFilters/SearchFilters";
import type { IProduct } from "@/types/public/product";
import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import { useFetchProducts } from "../../product/hooks/productCRUD";
import ProductCard from "../../products/components/productsShowcase/ProductCard";
import { PRODUCTSELECTFIELD } from "@/utils/consts";
import {
  mapFiltersToQuery,
  type ISearchFilterState,
} from "../utils/mapFiltersToQuery";

export type ISortBy = "created_at" | "total_sold";
const limit = 6;

const Search = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISortBy>("created_at");

  const [appliedData, setAppliedData] = useState<ISearchFilterState>({
    category: null,
    brand: null,
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    hasDiscount: undefined,
  });

  const sort = useMemo(() => [{ field: sortBy, ascending: false }], [sortBy]);
  const filters = useMemo(() => mapFiltersToQuery(appliedData), [appliedData]);
  const productsQuery = useFetchProducts({
    page,
    limit,
    sort,
    filters,
    selectField: PRODUCTSELECTFIELD,
  });

  const categoryName = appliedData.category?.name?.toLowerCase();
  const crumbs = useMemo(
    () => buildSearchCrumbs(t, categoryName),
    [t, categoryName],
  );

  const handleApplyFilters = useCallback((newFilters: ISearchFilterState) => {
    setAppliedData(newFilters);
    setPage((prev) => (prev === 1 ? prev : 1));
  }, []);

  const handleSortChange = useCallback((by: ISortBy) => setSortBy(by), []);
  const renderProduct = useCallback(
    (product: IProduct) => (
      <ProductCard
        key={product.id}
        product={product}
        className="max-w-73 sm:max-w-full"
      />
    ),
    [],
  );

  return (
    <PageWrapper>
      <Breadcrumbs items={crumbs} />

      <div className="grid xl:grid-cols-[1fr_4fr] gap-4">
        <SearchFilters onApply={handleApplyFilters} />

        <PaginatedGridSection
          query={productsQuery}
          title={`common.${appliedData.category?.name.toLocaleLowerCase() || "all_categories"}`}
          description="common.showing_products"
          sortOptions={{ sortBy, onChangeSort: handleSortChange }}
          onPageChange={setPage}
          renderItem={renderProduct}
        />
      </div>
    </PageWrapper>
  );
};

export default Search;
