import ProductCard from "../../../products/components/productsShowcase/ProductCard";
import type { IProduct } from "../../../../types/product";

interface IProductGrid {
  products?: IProduct[];
}

const CategoryItemContainer = ({ products }: IProductGrid) => {
  if (!products || products.length === 0) return <div>No products found</div>;

  return (
    <div className="ml-4 grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryItemContainer;
