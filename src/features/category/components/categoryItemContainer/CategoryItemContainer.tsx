import ProductCard from "../../../products/components/productsShowcase/ProductCard";
import type {
  IProductsResponse,
  ISortBy,
} from "../../api/fetchSelectedProducts";
import CategoryHeader from "./categoryHeader/CategoryHeader";
import CategoryPagination from "./categoryHeader/CategoryPagination";
import type { TFunction } from "i18next";

interface ICategoryItemContainer {
  t: TFunction;
  productsData?: IProductsResponse;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  title?: string;
  onChangeSort: (sortBy: ISortBy) => void;
  sortBy: ISortBy;
}

const CategoryItemContainer = ({
  t,
  productsData,
  currentPage = 1,
  onPageChange,
  title = "Products",
  onChangeSort,
  sortBy,
}: ICategoryItemContainer) => {
  if (!productsData || productsData.products.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-500">
        No products found
      </div>
    );
  }

  const { products, totalCount, totalPages } = productsData;

  return (
    <div>
      <div className="xl:ml-4 pb-8 border-b border-gray-300 min-h-[66dvh]">
        <CategoryHeader
          t={t}
          title={title}
          currentPage={currentPage}
          pageSize={products.length}
          totalCount={totalCount}
          onChangeSort={onChangeSort}
          sortBy={sortBy}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {onPageChange && (
        <CategoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CategoryItemContainer;
