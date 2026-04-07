import ProductBreadcrumbsSKeleton from "./ProductBreadcrumbsSKeleton";
import ProductDisplaySkeleton from "./ProductDisplaySkeleton";
import ProductTabsSkeleton from "./ProductTabsSkeleton";

const ProductSkeleton = () => {
  return (
    <div className="mt-[5dvh]">
      <ProductBreadcrumbsSKeleton />
      <ProductDisplaySkeleton />
      <ProductTabsSkeleton />
    </div>
  );
};

export default ProductSkeleton;
