import { SearchBar } from "@/components/ui/search/SearchBar";
import { useProductSearch } from "../../hooks/useProductSearch";
import type { IProduct } from "@/types/public/product";
import { useCallback } from "react";

interface IProductSearchBar {
  onNavigate?: () => void;
  searchClassName?: string;
}

const limit = 4;

const ProductSearchBar = ({
  onNavigate,
  searchClassName,
}: IProductSearchBar) => {
  const { searchValue, query, onSelect, onViewAll, setSearchValue } =
    useProductSearch(limit);

  const onEnter = () => {
    onViewAll();
    onNavigate?.();
  };

  const onProductClicked = useCallback(
    (product: IProduct) => {
      onSelect(product);
      onNavigate?.();
    },
    [onSelect, onNavigate],
  );

  const renderProduct = useCallback(
    (product: IProduct) => (
      <li key={product.id}>
        <button
          onClick={() => onProductClicked(product)}
          className="w-full flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
        >
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-8 h-8 rounded mr-3 object-cover shrink-0"
            />
          )}
          <span className="truncate">{product.name}</span>
        </button>
      </li>
    ),
    [onProductClicked],
  );

  return (
    <SearchBar
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onEnter={onEnter}
      hasData={!!query.data}
      isSearchDisabled={query.isFetching}
      searchResultOptions={{
        query,
        limit,
        onViewAll: onEnter,
        renderItem: renderProduct,
      }}
      className={searchClassName}
    />
  );
};

export default ProductSearchBar;
