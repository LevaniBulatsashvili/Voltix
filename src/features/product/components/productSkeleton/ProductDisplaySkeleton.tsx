import ProductGallerySkeleton from "./ProductGallerySkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";

const ProductDisplaySkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-6 sm:gap-10 mb-14 sm:mb-20">
      <ProductGallerySkeleton />
      <ProductInfoSkeleton />
    </div>
  );
};

export default ProductDisplaySkeleton;
