import { SearchBar } from "@/components/ui/search/SearchBar";
import { useProductSearch } from "../../hooks/useProductSearch";
import type { IProduct } from "@/types/public/product";

interface IProductSearchBar {
  onNavigate?: () => void;
}

const limit = 4;

const ProductSearchBar = ({ onNavigate }: IProductSearchBar) => {
  const { searchValue, query, onSelect, onViewAll, setSearchValue } =
    useProductSearch(limit);

  const onEnter = () => {
    onViewAll();
    onNavigate?.();
  };

  const onProductClicked = (product: IProduct) => {
    onSelect(product);
    onNavigate?.();
  };

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
        renderItem: (product) => (
          <li
            key={product.id}
            onClick={() => onProductClicked(product)}
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
        ),
      }}
    />
  );
};

export default ProductSearchBar;
