import { useTranslation } from "react-i18next";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import type { IProduct } from "@/types/product";
import { useFetchProducts } from "../../../product/hooks/productCRUD";
import ProductCard from "../../../products/components/productsShowcase/ProductCard";
import SearchHeader from "./searchHeader/SearchHeader";
import SearchPagination from "./SearchProductPagination";
import type { IFetchManyOptions } from "@/lib/supabase/createSupabaseService";
import type { ISortBy } from "..";
import SearchProductCardGridSkeleton from "../searchSkeleton/SearchProductCardSkeleton";

interface ISearchItemContainer {
  title: string;
  fetchOptions: IFetchManyOptions<IProduct>;
  sortBy: ISortBy;
  limit: number;
  onPageChange?: (page: number) => void;
  onChangeSort: (sortBy: ISortBy) => void;
}

const SearchItemContainer = ({
  title,
  fetchOptions,
  sortBy,
  limit,
  onPageChange,
  onChangeSort,
}: ISearchItemContainer) => {
  const { t } = useTranslation();
  const productsQuery = useFetchProducts(fetchOptions);

  const currentPage = productsQuery.data?.page ?? 0;
  const totalCount = productsQuery.data?.total ?? 0;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div>
      <div className="xl:ml-4 pb-8 border-b border-gray-300 min-h-[66dvh]">
        <SearchHeader
          t={t}
          title={title}
          currentPage={currentPage}
          pageSize={totalPages}
          totalCount={totalCount}
          onChangeSort={onChangeSort}
          sortBy={sortBy}
        />

        <QueryBoundary
          query={productsQuery}
          defaultFallbackOptions={{ className: "h-[64dvh]" }}
          loadingFallback={<SearchProductCardGridSkeleton count={4} />}
        >
          {(products) => (
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </QueryBoundary>
      </div>

      {onPageChange && (
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default SearchItemContainer;
