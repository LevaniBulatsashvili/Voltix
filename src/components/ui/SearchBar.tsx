import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useFetchProducts } from "@/features/public/product/hooks/productCRUD";
import { useSearchDebounce } from "@/hooks/useSeachDebounce";
import { QueryBoundary } from "../feedback/QueryBoundary";
import { useNavigate } from "react-router-dom";
import { PAGE } from "@/pages/pageConfig";
import Spinner from "../feedback/Spinner";
import { buildProductLink } from "@/features/public/product/utils/buildProductLink";
import type { IProduct } from "@/types/public/product";

export default function SearchBar({ delay = 700 }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const disabled = false;
  const limit = 4;

  const {
    value: searchVal,
    setValue: setSearchVal,
    searchFilters,
  } = useSearchDebounce("", delay);

  const searchedProductsQuery = useFetchProducts(
    { limit, filters: searchFilters },
    !!searchFilters,
  );

  const onViewAllResults = () => {
    setSearchVal("");
    navigate(
      PAGE.PUBLIC.SEARCH_RESULTS.replace(
        ":searchVal",
        encodeURIComponent(searchVal.trim()),
      ),
    );
  };

  const onNavigateToProduct = (product: IProduct) => {
    setSearchVal("");
    navigate(
      buildProductLink(
        product.main_category.name,
        product.category.name,
        product.id,
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!searchVal.trim()) return;
    e.preventDefault();
    onViewAllResults();
  };

  return (
    <div className="relative w-full max-w-100 ml-auto">
      <Search className="absolute left-3 top-3 w-5 h-5 text-text pointer-events-none" />
      <input
        className={`font-normal text-lg text-text bg-white border border-primary/50 w-full py-2 pl-10 pr-4 focus:bg-white focus:outline-none placeholder:capitalize
          ${searchedProductsQuery.data !== undefined ? "rounded-t-3xl" : "rounded-full "}
           ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
        placeholder={t("header.search")}
        value={searchVal}
        disabled={disabled}
        onChange={(e) => setSearchVal(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {searchedProductsQuery.data && (
        <QueryBoundary
          query={searchedProductsQuery}
          defaultFallbackOptions={{
            className: "absolute! rounded-t-none! shadow-lg z-50 h-45 p-0!",
          }}
          noDataFallback={
            <div className="absolute w-full border text-gray-500 bg-white rounded-md shadow-lg z-50 px-4 py-3 text-center">
              {t("header.no_results_found")}
            </div>
          }
          loadingFallback={
            <div className="absolute w-full bg-white rounded-md shadow-lg z-50 px-4 py-3">
              <Spinner />
            </div>
          }
        >
          {(products) => (
            <ul className="absolute w-full border text-black bg-white rounded-md shadow-lg z-50 max-h-65">
              {products.map((product) => (
                <li
                  key={product.id}
                  onClick={() => onNavigateToProduct(product)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-8 h-8 rounded mr-3 object-cover shrink-0"
                    />
                  )}
                  <span className="truncate">{product.name}</span>
                </li>
              ))}
              {products.length > limit - 1 && (
                <div
                  onClick={onViewAllResults}
                  className="pl-4 py-1 text-lg font-medium hover:bg-gray-100 cursor-pointer"
                >
                  {t("header.all_results")}
                </div>
              )}
            </ul>
          )}
        </QueryBoundary>
      )}
    </div>
  );
}
