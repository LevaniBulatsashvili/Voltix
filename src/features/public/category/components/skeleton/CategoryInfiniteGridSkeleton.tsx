import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";

interface IInfiniteGridSkeleton {
  count?: number;
  gridClassName?: string;
}

const CategoryInfiniteGridSkeleton = ({
  count = 9,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
}: IInfiniteGridSkeleton) => {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CategoryInfiniteGridSkeleton;
