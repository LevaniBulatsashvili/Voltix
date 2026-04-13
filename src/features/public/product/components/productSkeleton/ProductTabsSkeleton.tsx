import { Skeleton } from "@/components/skeleton/Skeleton";

const ProductTabsSkeleton = () => {
  return (
    <div className="w-full mt-20">
      <div className="grid grid-cols-3 gap-1 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProductTabsSkeleton;
